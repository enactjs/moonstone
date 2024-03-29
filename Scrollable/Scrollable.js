/**
 * Provides Moonstone-themed scrollable components and behaviors.
 *
 * @module moonstone/Scrollable
 * @exports Scrollable
 * @private
 */

import classNames from 'classnames';
import handle, {forward} from '@enact/core/handle';
import platform from '@enact/core/platform';
import {onWindowReady} from '@enact/core/snapshot';
import {clamp, Job} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight, {getDirection} from '@enact/spotlight';
import {spottableClass} from '@enact/spotlight/Spottable';
import {getTargetByDirectionFromElement, getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import {getRect, intersects} from '@enact/spotlight/src/utils';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import PropTypes from 'prop-types';
import {createRef, Component} from 'react';

import $L from '../internal/$L';
import {SharedState} from '../internal/SharedStateDecorator';
import {constants, ScrollableBase as UiScrollableBase} from '../UiScrollable';

import Scrollbar from './Scrollbar';
import Skinnable from '../Skinnable';

import overscrollCss from './OverscrollEffect.module.less';
import scrollbarCss from './Scrollbar.module.less';

const
	{
		animationDuration,
		isPageDown,
		isPageUp,
		overscrollTypeDone,
		overscrollTypeNone,
		overscrollTypeOnce,
		paginationPageMultiplier
	} = constants,
	nop = () => {},
	overscrollRatioPrefix = '--scrollable-overscroll-ratio-',
	overscrollTimeout = 300,
	reverseDirections = {
		down: 'up',
		up: 'down'
	};

/**
 * The name of a custom attribute which indicates the index of an item in
 * {@link moonstone/VirtualList.VirtualList|VirtualList} or
 * {@link moonstone/VirtualList.VirtualGridList|VirtualGridList}.
 *
 * @constant dataIndexAttribute
 * @memberof moonstone/Scrollable
 * @type {String}
 * @private
 */
const dataIndexAttribute = 'data-index';

const navigableFilter = (elem) => {
	if (
		!Spotlight.getPointerMode() &&
		// ignore containers passed as their id
		typeof elem !== 'string' &&
		elem.classList.contains(scrollbarCss.scrollButton)
	) {
		return false;
	}
};

const configureSpotlightContainer = ({'data-spotlight-id': spotlightId, focusableScrollbar}) => {
	Spotlight.set(spotlightId, {
		navigableFilter: focusableScrollbar ? null : navigableFilter
	});
};

/*
 * Track the last position of the pointer to check if a list should scroll by
 * page up/down keys when the pointer is on a list without any focused node.
 * `keydown` event does not occur if there is no focus on the node and
 * its descendants, we add `keydown` handler to `document` also.
 */
const
	lastPointer = {x: 0, y: 0},
	pointerTracker = (ev) => {
		lastPointer.x = ev.clientX;
		lastPointer.y = ev.clientY;
	};

const
	// An app could have lists and/or scrollers more than one,
	// so we should test all of them when page up/down key is pressed.
	scrollables = new Map(),
	pageKeyHandler = (ev) => {
		const {keyCode} = ev;
		if (Spotlight.getPointerMode() && !Spotlight.getCurrent() && (isPageUp(keyCode) || isPageDown(keyCode))) {
			const
				{x, y} = lastPointer,
				elem = document.elementFromPoint(x, y);

			if (elem) {
				for (const [key, value] of scrollables) {
					if (value.contains(elem)) {
						/* To handle page keys in nested scrollable components,
						 * break the loop only when `scrollByPageOnPointerMode` returns `true`.
						 * This approach assumes that an inner scrollable component is
						 * mounted earlier than an outer scrollable component.
						 */
						if (key.scrollByPageOnPointerMode(ev)) {
							break;
						}
					}
				}
			}
		}
	};

onWindowReady(() => {
	document.addEventListener('mousemove', pointerTracker);
	document.addEventListener('keydown', pageKeyHandler);
});

const isIntersecting = (elem, container) => elem && intersects(getRect(container), getRect(elem));
const getIntersectingElement = (elem, container) => isIntersecting(elem, container) && elem;
const getTargetInViewByDirectionFromPosition = (direction, position, container) => {
	const target = getTargetByDirectionFromPosition(direction, position, Spotlight.getActiveContainer());
	return getIntersectingElement(target, container);
};

/**
 * A Moonstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @class ScrollableBase
 * @memberof moonstone/Scrollable
 * @extends moonstone/UiScrollable.ScrollableBase
 * @ui
 * @public
 */
class ScrollableBase extends Component {
	static displayName = 'Scrollable';

	static contextType = SharedState;

	static propTypes = /** @lends moonstone/Scrollable.Scrollable.prototype */ {
		/**
		 * Render function.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		childRenderer: PropTypes.func.isRequired,

		/**
		 * This is set to `true` by SpotlightContainerDecorator
		 *
		 * @type {Boolean}
		 * @private
		 */
		'data-spotlight-container': PropTypes.bool,

		/**
		 * `false` if the content of the list or the scroller could get focus
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		'data-spotlight-container-disabled': PropTypes.bool,

		/**
		 * This is passed onto the wrapped component to allow
		 * it to customize the spotlight container for its use case.
		 *
		 * @type {String}
		 * @private
		 */
		'data-spotlight-id': PropTypes.string,

		/**
		 * Direction of the list or the scroller.
		 * `'both'` could be only used for {@link moonstone/Scroller.Scroller|Scroller}.
		 *
		 * Valid values are:
		 * * `'both'`,
		 * * `'horizontal'`, and
		 * * `'vertical'`.
		 *
		 * @type {String}
		 * @private
		 */
		direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

		/**
		 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
		 * not move focus to the scrollbar controls.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		focusableScrollbar: PropTypes.bool,

		/**
		 * A unique identifier for the scrollable component.
		 *
		 * When specified and when the scrollable is within a SharedStateDecorator, the scroll
		 * position will be shared and restored on mount if the component is destroyed and
		 * recreated.
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Specifies overscroll effects shows on which type of inputs.
		 *
		 * @type {Object}
		 * @default {
		 *	arrowKey: false,
		 *	drag: false,
		 *	pageKey: false,
		 *	scrollbarButton: false,
		 *	wheel: true
		 * }
		 * @private
		 */
		overscrollEffectOn: PropTypes.shape({
			arrowKey: PropTypes.bool,
			drag: PropTypes.bool,
			pageKey: PropTypes.bool,
			scrollbarButton: PropTypes.bool,
			wheel: PropTypes.bool
		}),

		/**
		 * Specifies preventing keydown events from bubbling up to applications.
		 * Valid values are `'none'`, and `'programmatic'`.
		 *
		 * When it is `'none'`, every keydown event is bubbled.
		 * When it is `'programmatic'`, an event bubbling is not allowed for a keydown input
		 * which invokes programmatic spotlight moving.
		 *
		 * @type {String}
		 * @default 'none'
		 * @private
		 */
		preventBubblingOnKeyDown: PropTypes.oneOf(['none', 'programmatic']),

		/**
		 * Sets the hint string read when focusing the next button in the vertical scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll down')
		 * @public
		 */
		scrollDownAriaLabel: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the previous button in the horizontal scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll left')
		 * @public
		 */
		scrollLeftAriaLabel: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the next button in the horizontal scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll right')
		 * @public
		 */
		scrollRightAriaLabel: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the previous button in the vertical scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll up')
		 * @public
		 */
		scrollUpAriaLabel: PropTypes.string
	};

	static defaultProps = {
		'data-spotlight-container-disabled': false,
		childRenderer: nop, // eslint-disable-line react/default-props-match-prop-types
		focusableScrollbar: false,
		overscrollEffectOn: {
			arrowKey: false,
			drag: false,
			pageKey: false,
			scrollbarButton: false,
			wheel: true
		},
		preventBubblingOnKeyDown: 'none'
	};

	constructor (props) {
		super(props);

		this.scrollbarProps = {
			cbAlertThumb: this.alertThumbAfterRendered,
			onNextScroll: this.onScrollbarButtonClick,
			onPrevScroll: this.onScrollbarButtonClick
		};

		this.overscrollRefs = {
			horizontal: createRef(),
			vertical: createRef()
		};
		this.childRef = createRef();
		this.uiRef = createRef();

		configureSpotlightContainer(props);
	}

	componentDidMount () {
		this.createOverscrollJob('horizontal', 'before');
		this.createOverscrollJob('horizontal', 'after');

		this.createOverscrollJob('vertical', 'before');
		this.createOverscrollJob('vertical', 'after');

		this.restoreScrollPosition();
		scrollables.set(this, this.uiRef.current.containerRef.current);
	}

	componentDidUpdate (prevProps) {
		if (prevProps['data-spotlight-id'] !== this.props['data-spotlight-id'] ||
				prevProps.focusableScrollbar !== this.props.focusableScrollbar) {
			configureSpotlightContainer(this.props);
		}
	}

	componentWillUnmount () {
		scrollables.delete(this);

		this.stopOverscrollJob('horizontal', 'before');
		this.stopOverscrollJob('horizontal', 'after');
		this.stopOverscrollJob('vertical', 'before');
		this.stopOverscrollJob('vertical', 'after');
	}

	// status
	isWheeling = false;

	// spotlight
	lastScrollPositionOnFocus = null;
	indexToFocus = null;
	nodeToFocus = null;
	pointToFocus = null;

	// voice control
	isVoiceControl = false;
	voiceControlDirection = 'vertical';

	// overscroll
	overscrollJobs = {
		horizontal: {before: null, after: null},
		vertical: {before: null, after: null}
	};

	// Only intended to be used within componentDidMount, this method will fetch the last stored
	// scroll position from SharedState and scroll (without animation) to that position
	restoreScrollPosition () {
		const {id} = this.props;
		if (id && this.context && this.context.get) {
			const scrollPosition = this.context.get(`${id}.scrollPosition`);
			if (scrollPosition) {
				this.uiRef.current.scrollTo({
					position: scrollPosition,
					animate: false
				});
			}
		}
	}

	isScrollButtonFocused () {
		const {horizontalScrollbarRef: h, verticalScrollbarRef: v} = this.uiRef.current;

		return (
			h.current && h.current.isOneOfScrollButtonsFocused() ||
			v.current && v.current.isOneOfScrollButtonsFocused()
		);
	}

	onFlick = ({direction}) => {
		const bounds = this.uiRef.current.getScrollBounds();
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}

		if ((
			direction === 'vertical' && this.uiRef.current.canScrollVertically(bounds) ||
			direction === 'horizontal' && this.uiRef.current.canScrollHorizontally(bounds)
		) && !this.props['data-spotlight-container-disabled']) {
			this.childRef.current.setContainerDisabled(true);
		}
	};

	onMouseDown = (ev) => {
		if (this.isScrollButtonFocused()) {
			ev.preventDefault();
		}

		if (this.props['data-spotlight-container-disabled']) {
			ev.preventDefault();
		}
	};

	onTouchStart = () => {
		const focusedItem = Spotlight.getCurrent();

		if (!Spotlight.isPaused() && focusedItem && !this.isScrollButtonFocused()) {
			focusedItem.blur();
		}
	};

	onWheel = ({delta}) => {
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem && !this.isScrollButtonFocused()) {
			focusedItem.blur();
		}

		if (delta !== 0) {
			this.isWheeling = true;
			if (!this.props['data-spotlight-container-disabled']) {
				this.childRef.current.setContainerDisabled(true);
			}
		}
	};

	isContent = (element) => (element && this.uiRef.current && this.uiRef.current.childRefCurrent.containerRef.current.contains(element));

	startScrollOnFocus = (pos) => {
		if (pos) {
			const
				{top, left} = pos,
				bounds = this.uiRef.current.getScrollBounds(),
				scrollHorizontally = bounds.maxLeft > 0 && left !== this.uiRef.current.scrollLeft,
				scrollVertically = bounds.maxTop > 0 && top !== this.uiRef.current.scrollTop;

			if (scrollHorizontally || scrollVertically) {
				this.uiRef.current.start({
					targetX: left,
					targetY: top,
					animate: (animationDuration > 0) && this.animateOnFocus,
					overscrollEffect: this.props.overscrollEffectOn[this.uiRef.current.lastInputType] && (!this.childRef.current.shouldPreventOverscrollEffect || !this.childRef.current.shouldPreventOverscrollEffect())
				});
				this.lastScrollPositionOnFocus = pos;
			}
		}
	};

	calculateAndScrollTo = () => {
		const
			spotItem = Spotlight.getCurrent(),
			positionFn = this.childRef.current.calculatePositionOnFocus,
			containerNode = this.uiRef.current.childRefCurrent.containerRef.current;

		if (spotItem && positionFn && containerNode && containerNode.contains(spotItem)) {
			const lastPos = this.lastScrollPositionOnFocus;
			let pos;

			// If scroll animation is ongoing, we need to pass last target position to
			// determine correct scroll position.
			if (this.uiRef.current.animator.isAnimating() && lastPos) {
				const containerRect = getRect(containerNode);
				const itemRect = getRect(spotItem);
				let scrollPosition;

				if (this.props.direction === 'horizontal' || this.props.direction === 'both' && !(itemRect.left >= containerRect.left && itemRect.right <= containerRect.right)) {
					scrollPosition = lastPos.left;
				} else if (this.props.direction === 'vertical' || this.props.direction === 'both' && !(itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom)) {
					scrollPosition = lastPos.top;
				}

				pos = positionFn({item: spotItem, scrollPosition});
			} else {
				// scrollInfo passes in current `scrollHeight` and `scrollTop` before calculations
				const
					scrollInfo = {
						previousScrollHeight: this.uiRef.current.bounds.scrollHeight,
						scrollTop: this.uiRef.current.scrollTop
					};
				pos = positionFn({item: spotItem, scrollInfo});
			}

			if (pos && (pos.left !== this.uiRef.current.scrollLeft || pos.top !== this.uiRef.current.scrollTop)) {
				this.startScrollOnFocus(pos);
			}

			// update `scrollHeight`
			this.uiRef.current.bounds.scrollHeight = this.uiRef.current.getScrollBounds().scrollHeight;
		}
	};

	onFocus = (ev) => {
		const
			{isDragging} = this.uiRef.current,
			shouldPreventScrollByFocus = this.childRef.current.shouldPreventScrollByFocus ?
				this.childRef.current.shouldPreventScrollByFocus() :
				false;

		if (this.isWheeling) {
			this.uiRef.current.stop();
			this.animateOnFocus = false;
		}

		if (!Spotlight.getPointerMode()) {
			this.alertThumb();
		}

		if (!(shouldPreventScrollByFocus || Spotlight.getPointerMode() || isDragging)) {
			const
				item = ev.target,
				spotItem = Spotlight.getCurrent();

			if (item && item === spotItem) {
				this.calculateAndScrollTo();
			}
		} else if (this.childRef.current.setLastFocusedNode) {
			this.childRef.current.setLastFocusedNode(ev.target);
		}
	};

	scrollByPage = (direction) => {
		const
			{childRefCurrent, scrollTop} = this.uiRef.current,
			focusedItem = Spotlight.getCurrent(),
			bounds = this.uiRef.current.getScrollBounds(),
			isUp = direction === 'up',
			directionFactor = isUp ? -1 : 1,
			pageDistance = directionFactor * bounds.clientHeight * paginationPageMultiplier,
			scrollPossible = isUp ? scrollTop > 0 : bounds.maxTop > scrollTop;

		this.uiRef.current.lastInputType = 'pageKey';

		if (directionFactor !== this.uiRef.current.wheelDirection) {
			this.uiRef.current.isScrollAnimationTargetAccumulated = false;
			this.uiRef.current.wheelDirection = directionFactor;
		}

		if (scrollPossible) {
			if (focusedItem) {
				const contentNode = childRefCurrent.containerRef.current;
				// Should do nothing when focusedItem is paging control button of Scrollbar
				if (contentNode.contains(focusedItem)) {
					const
						contentRect = contentNode.getBoundingClientRect(),
						clientRect = focusedItem.getBoundingClientRect(),
						yAdjust = isUp ? 1 : -1,
						x = clamp(contentRect.left, contentRect.right, (clientRect.right + clientRect.left) / 2),
						y = bounds.maxTop <= scrollTop + pageDistance || 0 >= scrollTop + pageDistance ?
							contentRect[isUp ? 'top' : 'bottom'] + yAdjust :
							clamp(contentRect.top, contentRect.bottom, (clientRect.bottom + clientRect.top) / 2);

					focusedItem.blur();
					if (!this.props['data-spotlight-container-disabled']) {
						this.childRef.current.setContainerDisabled(true);
					}
					this.pointToFocus = {direction, x, y};
				}
			} else {
				this.pointToFocus = {direction, x: lastPointer.x, y: lastPointer.y};
			}

			this.uiRef.current.scrollToAccumulatedTarget(pageDistance, true, this.props.overscrollEffectOn.pageKey);
		}
	};

	hasFocus () {
		let current = Spotlight.getCurrent();

		if (!current) {
			const spotlightId = Spotlight.getActiveContainer();
			current = document.querySelector(`[data-spotlight-id="${spotlightId}"]`);
		}

		return current && this.uiRef.current && this.uiRef.current.containerRef.current.contains(current);
	}

	checkAndApplyOverscrollEffectByDirection = (direction) => {
		const
			orientation = (direction === 'up' || direction === 'down') ? 'vertical' : 'horizontal',
			bounds = this.uiRef.current.getScrollBounds(),
			scrollability = orientation === 'vertical' ? this.uiRef.current.canScrollVertically(bounds) : this.uiRef.current.canScrollHorizontally(bounds);

		if (scrollability) {
			const
				isRtl = this.uiRef.current.props.rtl,
				edge = (direction === 'up' || !isRtl && direction === 'left' || isRtl && direction === 'right') ? 'before' : 'after';
			this.uiRef.current.checkAndApplyOverscrollEffect(orientation, edge, overscrollTypeOnce);
		}
	};

	scrollByPageOnPointerMode = (ev) => {
		const {keyCode, repeat} = ev;
		forward('onKeyDown', ev, this.props);
		ev.preventDefault();

		this.animateOnFocus = true;

		if (!repeat && (this.props.direction === 'vertical' || this.props.direction === 'both')) {
			const direction = isPageUp(keyCode) ? 'up' : 'down';

			this.scrollByPage(direction);
			if (this.props.overscrollEffectOn.pageKey) { /* if the spotlight focus will not move */
				this.checkAndApplyOverscrollEffectByDirection(direction);
			}

			return true; // means consumed
		}

		return false; // means to be propagated
	};

	onKeyDown = (ev) => {
		const {keyCode, repeat, target} = ev;

		forward('onKeyDown', ev, this.props);

		if (isPageUp(keyCode) || isPageDown(keyCode)) {
			ev.preventDefault();
		}

		this.animateOnFocus = true;

		if (!repeat && this.hasFocus()) {
			const {overscrollEffectOn} = this.props;
			let direction = null;

			if (isPageUp(keyCode) || isPageDown(keyCode)) {
				if (this.props.direction === 'vertical' || this.props.direction === 'both') {
					direction = isPageUp(keyCode) ? 'up' : 'down';

					if (this.isContent(target)) {
						ev.stopPropagation();
						this.scrollByPage(direction);
					}
					if (overscrollEffectOn.pageKey) {
						this.checkAndApplyOverscrollEffectByDirection(direction);
					}
				}
			} else if (getDirection(keyCode)) {
				const element = Spotlight.getCurrent();

				this.uiRef.current.lastInputType = 'arrowKey';

				direction = getDirection(keyCode);
				if (overscrollEffectOn.arrowKey && !(element ? getTargetByDirectionFromElement(direction, element) : null)) {
					const {horizontalScrollbarRef, verticalScrollbarRef} = this.uiRef.current;

					if (!(horizontalScrollbarRef.current && horizontalScrollbarRef.current.getContainerRef().current.contains(element)) &&
						!(verticalScrollbarRef.current && verticalScrollbarRef.current.getContainerRef().current.contains(element))) {
						this.checkAndApplyOverscrollEffectByDirection(direction);
					}
				}
			}
		}
	};

	onScrollbarButtonClick = ({isPreviousScrollButton, isVerticalScrollBar}) => {
		const
			bounds = this.uiRef.current.getScrollBounds(),
			direction = isPreviousScrollButton ? -1 : 1,
			pageDistance = direction * (isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth) * paginationPageMultiplier;

		this.uiRef.current.lastInputType = 'scrollbarButton';

		if (direction !== this.uiRef.current.wheelDirection) {
			this.uiRef.current.isScrollAnimationTargetAccumulated = false;
			this.uiRef.current.wheelDirection = direction;
		}

		this.uiRef.current.scrollToAccumulatedTarget(pageDistance, isVerticalScrollBar, this.props.overscrollEffectOn.scrollbarButton);
	};

	focusOnScrollButton (scrollbarRef, isPreviousScrollButton) {
		if (scrollbarRef.current) {
			scrollbarRef.current.focusOnButton(isPreviousScrollButton);
		}
	}

	scrollAndFocusScrollbarButton = (direction) => {
		if (this.uiRef.current) {
			const
				{focusableScrollbar, direction: directionProp} = this.props,
				uiRefCurrent = this.uiRef.current,
				isRtl = uiRefCurrent.props.rtl,
				isPreviousScrollButton = direction === 'up' || (isRtl ? direction === 'right' : direction === 'left'),
				isHorizontalDirection = direction === 'left' || direction === 'right',
				isVerticalDirection = direction === 'up' || direction === 'down',
				canScrollHorizontally = isHorizontalDirection && (directionProp === 'horizontal' || directionProp === 'both'),
				canScrollingVertically = isVerticalDirection && (directionProp === 'vertical' || directionProp === 'both');

			if (canScrollHorizontally || canScrollingVertically) {
				this.onScrollbarButtonClick({
					isPreviousScrollButton,
					isVerticalScrollBar: canScrollingVertically
				});

				if (focusableScrollbar) {
					this.focusOnScrollButton(
						canScrollingVertically ? uiRefCurrent.verticalScrollbarRef : uiRefCurrent.horizontalScrollbarRef,
						isPreviousScrollButton
					);
				}
			}
		}
	};

	stop = () => {
		if (!this.props['data-spotlight-container-disabled']) {
			this.childRef.current.setContainerDisabled(false);
		}

		this.focusOnItem();
		this.lastScrollPositionOnFocus = null;
		this.isWheeling = false;
		if (this.isVoiceControl) {
			this.isVoiceControl = false;
			this.updateFocusAfterVoiceControl();
		}
	};

	focusOnItem () {
		const childRef = this.childRef;

		if (this.indexToFocus !== null && typeof childRef.current.focusByIndex === 'function') {
			childRef.current.focusByIndex(this.indexToFocus);
			this.indexToFocus = null;
		}
		if (this.nodeToFocus !== null && typeof childRef.current.focusOnNode === 'function') {
			childRef.current.focusOnNode(this.nodeToFocus);
			this.nodeToFocus = null;
		}
		if (this.pointToFocus !== null) {
			// no need to focus on pointer mode
			if (!Spotlight.getPointerMode()) {
				const {direction, x, y} = this.pointToFocus;
				const position = {x, y};
				const {current: {containerRef: {current}}} = this.uiRef;
				const elemFromPoint = document.elementFromPoint(x, y);
				const target =
					elemFromPoint && elemFromPoint.closest && getIntersectingElement(elemFromPoint.closest(`.${spottableClass}`), current) ||
					getTargetInViewByDirectionFromPosition(direction, position, current) ||
					getTargetInViewByDirectionFromPosition(reverseDirections[direction], position, current);

				if (target) {
					Spotlight.focus(target);
				}
			}
			this.pointToFocus = null;
		}
	}

	scrollTo = (opt) => {
		this.indexToFocus = (opt.focus && typeof opt.index === 'number') ? opt.index : null;
		this.nodeToFocus = (opt.focus && opt.node instanceof Object && opt.node.nodeType === 1) ? opt.node : null;
	};

	alertThumb = () => {
		const bounds = this.uiRef.current.getScrollBounds();

		this.uiRef.current.showThumb(bounds);
		this.uiRef.current.startHidingThumb();
	};

	alertThumbAfterRendered = () => {
		const spotItem = Spotlight.getCurrent();

		if (!Spotlight.getPointerMode() && this.isContent(spotItem) && this.uiRef.current.isUpdatedScrollThumb) {
			this.alertThumb();
		}
	};

	handleResizeWindow = () => {
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}
	};

	// Callback for scroller updates; calculate and, if needed, scroll to new position based on focused item.
	handleScrollerUpdate = () => {
		if (this.uiRef.current.scrollToInfo === null) {
			const scrollHeight = this.uiRef.current.getScrollBounds().scrollHeight;
			if (scrollHeight !== this.uiRef.current.bounds.scrollHeight) {
				this.calculateAndScrollTo();
			}
		}

		// oddly, Scroller manages this.uiRef.current.bounds so if we don't update it here (it is also
		// updated in calculateAndScrollTo but we might not have made it to that point), it will be
		// out of date when we land back in this method next time.
		this.uiRef.current.bounds.scrollHeight = this.uiRef.current.getScrollBounds().scrollHeight;
	};

	clearOverscrollEffect = (orientation, edge) => {
		this.overscrollJobs[orientation][edge].startAfter(overscrollTimeout, orientation, edge, overscrollTypeNone, 0);
		this.uiRef.current.setOverscrollStatus(orientation, edge, overscrollTypeNone, 0);
	};

	applyOverscrollEffect = (orientation, edge, type, ratio) => {
		const nodeRef = this.overscrollRefs[orientation].current;

		if (nodeRef) {
			nodeRef.style.setProperty(overscrollRatioPrefix + orientation + edge, ratio);

			if (type === overscrollTypeOnce) {
				this.overscrollJobs[orientation][edge].start(orientation, edge, overscrollTypeDone, 0);
			}
		}
	};

	createOverscrollJob = (orientation, edge) => {
		if (!this.overscrollJobs[orientation][edge]) {
			this.overscrollJobs[orientation][edge] = new Job(this.applyOverscrollEffect.bind(this), overscrollTimeout);
		}
	};

	stopOverscrollJob = (orientation, edge) => {
		const job = this.overscrollJobs[orientation][edge];

		if (job) {
			job.stop();
		}
	};

	// FIXME setting event handlers directly to work on the V8 snapshot.
	addEventListeners = (childContainerRef) => {
		if (childContainerRef.current && childContainerRef.current.addEventListener) {
			childContainerRef.current.addEventListener('focusin', this.onFocus);
			if (platform.webos) {
				childContainerRef.current.addEventListener('webOSVoice', this.onVoice);
				childContainerRef.current.setAttribute('data-webos-voice-intent', 'Scroll');
			}
		}
	};

	// FIXME setting event handlers directly to work on the V8 snapshot.
	removeEventListeners = (childContainerRef) => {
		if (childContainerRef.current && childContainerRef.current.removeEventListener) {
			childContainerRef.current.removeEventListener('focusin', this.onFocus);
			if (platform.webos) {
				childContainerRef.current.removeEventListener('webOSVoice', this.onVoice);
				childContainerRef.current.removeAttribute('data-webos-voice-intent');
			}
		}
	};

	updateFocusAfterVoiceControl = () => {
		const spotItem = Spotlight.getCurrent();
		if (spotItem && this.uiRef.current.containerRef.current.contains(spotItem)) {
			const
				viewportBounds = this.uiRef.current.containerRef.current.getBoundingClientRect(),
				spotItemBounds = spotItem.getBoundingClientRect(),
				nodes = Spotlight.getSpottableDescendants(this.uiRef.current.containerRef.current.dataset.spotlightId),
				first = this.voiceControlDirection === 'vertical' ? 'top' : 'left',
				last = this.voiceControlDirection === 'vertical' ? 'bottom' : 'right';

			if (spotItemBounds[last] < viewportBounds[first] || spotItemBounds[first] > viewportBounds[last]) {
				for (let i = 0; i < nodes.length; i++) {
					const nodeBounds = nodes[i].getBoundingClientRect();
					if (nodeBounds[first] > viewportBounds[first] && nodeBounds[last] < viewportBounds[last]) {
						Spotlight.focus(nodes[i]);
						break;
					}
				}
			}
		}
	};

	isReachedEdge = (scrollPos, ltrBound, rtlBound, isRtl = false) => {
		const bound = isRtl ? rtlBound : ltrBound;
		return (bound === 0 && scrollPos === 0) || (bound > 0 && scrollPos >= bound - 1);
	};

	onVoice = (e) => {
		const
			isHorizontal = this.props.direction === 'horizontal',
			isRtl = this.uiRef.current.props.rtl,
			{scrollTop, scrollLeft} = this.uiRef.current,
			{maxLeft, maxTop} = this.uiRef.current.getScrollBounds(),
			verticalDirection = ['up', 'down', 'top', 'bottom'],
			horizontalDirection = isRtl ? ['right', 'left', 'rightmost', 'leftmost'] : ['left', 'right', 'leftmost', 'rightmost'],
			movement = ['previous', 'next', 'first', 'last'];

		let
			scroll = e && e.detail && e.detail.scroll,
			index = movement.indexOf(scroll);

		if (index > -1) {
			scroll = isHorizontal ? horizontalDirection[index] : verticalDirection[index];
		}

		this.voiceControlDirection = verticalDirection.includes(scroll) && 'vertical' || horizontalDirection.includes(scroll) && 'horizontal' || null;

		// Case 1. Invalid direction
		if (this.voiceControlDirection === null) {
			this.isVoiceControl = false;
		// Case 2. Cannot scroll
		} else if (
			(['up', 'top'].includes(scroll) && this.isReachedEdge(scrollTop, 0)) ||
			(['down', 'bottom'].includes(scroll) && this.isReachedEdge(scrollTop, maxTop)) ||
			(['left', 'leftmost'].includes(scroll) && this.isReachedEdge(scrollLeft, 0, maxLeft, isRtl)) ||
			(['right', 'rightmost'].includes(scroll) && this.isReachedEdge(scrollLeft, maxLeft, 0, isRtl))
		) {
			if (window.webOSVoiceReportActionResult) {
				window.webOSVoiceReportActionResult({voiceUi: {exception: 'alreadyCompleted'}});
				e.preventDefault();
			}
		// Case 3. Can scroll
		} else {
			this.isVoiceControl = true;
			if (['up', 'down', 'left', 'right'].includes(scroll)) {
				const isPreviousScrollButton = (scroll === 'up') || (scroll === 'left' && !isRtl) || (scroll === 'right' && isRtl);
				this.onScrollbarButtonClick({isPreviousScrollButton, isVerticalScrollBar: verticalDirection.includes(scroll)});
			} else { // ['top', 'bottom', 'leftmost', 'rightmost'].includes(scroll)
				this.uiRef.current.scrollTo({align: verticalDirection.includes(scroll) && scroll || (scroll === 'leftmost' && isRtl || scroll === 'rightmost' && !isRtl) && 'right' || 'left'});
			}
			e.preventDefault();
		}
	};

	handleScroll = handle(
		forward('onScroll'),
		(ev, {id}, context) => id && context && context.set,
		({scrollLeft: x, scrollTop: y}, {id}, context) => {
			context.set(`${id}.scrollPosition`, {x, y});
		}
	).bindAs(this, 'handleScroll');

	render () {
		const
			{
				childRenderer,
				'data-spotlight-container': spotlightContainer,
				'data-spotlight-container-disabled': spotlightContainerDisabled,
				'data-spotlight-id': spotlightId,
				focusableScrollbar,
				preventBubblingOnKeyDown,
				scrollDownAriaLabel,
				scrollLeftAriaLabel,
				scrollRightAriaLabel,
				scrollUpAriaLabel,
				...rest
			} = this.props,
			downButtonAriaLabel = scrollDownAriaLabel == null ? $L('scroll down') : scrollDownAriaLabel,
			upButtonAriaLabel = scrollUpAriaLabel == null ? $L('scroll up') : scrollUpAriaLabel,
			rightButtonAriaLabel = scrollRightAriaLabel == null ? $L('scroll right') : scrollRightAriaLabel,
			leftButtonAriaLabel = scrollLeftAriaLabel == null ? $L('scroll left') : scrollLeftAriaLabel;

		return (
			<UiScrollableBase
				noScrollByDrag={!platform.touchscreen}
				{...rest}
				addEventListeners={this.addEventListeners}
				applyOverscrollEffect={this.applyOverscrollEffect}
				clearOverscrollEffect={this.clearOverscrollEffect}
				handleResizeWindow={this.handleResizeWindow}
				onFlick={this.onFlick}
				onKeyDown={this.onKeyDown}
				onMouseDown={this.onMouseDown}
				onScroll={this.handleScroll}
				onWheel={this.onWheel}
				ref={this.uiRef}
				removeEventListeners={this.removeEventListeners}
				scrollTo={this.scrollTo}
				stop={this.stop}
				containerRenderer={({ // eslint-disable-line react/jsx-no-bind
					childComponentProps,
					childWrapper: ChildWrapper,
					childWrapperProps: {className: contentClassName, ...restChildWrapperProps},
					className,
					componentCss,
					containerRef: uiContainerRef,
					handleScroll,
					horizontalScrollbarProps,
					initChildRef: initUiChildRef,
					isHorizontalScrollbarVisible,
					isVerticalScrollbarVisible,
					rtl,
					scrollTo,
					style,
					verticalScrollbarProps
				}) => (
					<div
						className={classNames(className, overscrollCss.scrollable)}
						data-spotlight-container={spotlightContainer}
						data-spotlight-container-disabled={spotlightContainerDisabled}
						data-spotlight-id={spotlightId}
						onTouchStart={this.onTouchStart}
						ref={uiContainerRef}
						style={style}
					>
						<div className={classNames(componentCss.container, overscrollCss.overscrollFrame, overscrollCss.vertical, isHorizontalScrollbarVisible ? overscrollCss.horizontalScrollbarVisible : null)} ref={this.overscrollRefs.vertical}>
							<ChildWrapper className={classNames(contentClassName, overscrollCss.overscrollFrame, overscrollCss.horizontal)} ref={this.overscrollRefs.horizontal} {...restChildWrapperProps}>
								{childRenderer({
									...childComponentProps,
									cbScrollTo: scrollTo,
									className: componentCss.scrollableFill,
									initUiChildRef,
									isHorizontalScrollbarVisible,
									isVerticalScrollbarVisible,
									onScroll: handleScroll,
									onUpdate: this.handleScrollerUpdate,
									ref: this.childRef,
									rtl,
									scrollAndFocusScrollbarButton: this.scrollAndFocusScrollbarButton,
									spotlightId
								})}
							</ChildWrapper>
							{isVerticalScrollbarVisible ?
								<Scrollbar
									{...verticalScrollbarProps}
									{...this.scrollbarProps}
									disabled={!isVerticalScrollbarVisible}
									focusableScrollButtons={focusableScrollbar}
									nextButtonAriaLabel={downButtonAriaLabel}
									onKeyDownButton={this.onKeyDown}
									preventBubblingOnKeyDown={preventBubblingOnKeyDown}
									previousButtonAriaLabel={upButtonAriaLabel}
									rtl={rtl}
								/> :
								null
							}
						</div>
						{isHorizontalScrollbarVisible ?
							<Scrollbar
								{...horizontalScrollbarProps}
								{...this.scrollbarProps}
								corner={isVerticalScrollbarVisible}
								disabled={!isHorizontalScrollbarVisible}
								focusableScrollButtons={focusableScrollbar}
								nextButtonAriaLabel={rightButtonAriaLabel}
								onKeyDownButton={this.onKeyDown}
								preventBubblingOnKeyDown={preventBubblingOnKeyDown}
								previousButtonAriaLabel={leftButtonAriaLabel}
								rtl={rtl}
							/> :
							null
						}
					</div>
				)}
			/>
		);
	}
}

/**
 * A Moonstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @class Scrollable
 * @memberof moonstone/Scrollable
 * @mixes spotlight/SpotlightContainerDecorator
 * @extends moonstone/Scrollable.ScrollableBase
 * @ui
 * @public
 */
const Scrollable = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			ScrollableBase
		)
	)
);

export default Scrollable;
export {
	dataIndexAttribute,
	Scrollable,
	ScrollableBase
};
