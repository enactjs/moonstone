/**
 * Modal component that appears at the bottom of the screen and takes up the full screen width.
 *
 * @example
 * <Popup open>Hello!</Popup>
 *
 * @module moonstone/Popup
 * @exports Popup
 * @exports PopupBase
 */

import {is} from '@enact/core/keymap';
import {on, off} from '@enact/core/dispatcher';
import {Row, Cell} from '@enact/ui/Layout';
import FloatingLayer from '@enact/ui/FloatingLayer';
import kind from '@enact/core/kind';
import {Component} from 'react';
import PropTypes from 'prop-types';
import Spotlight, {getDirection} from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Transition from '@enact/ui/Transition';
import {forward} from '@enact/core/handle';
import warning from 'warning';

import $L from '../internal/$L';
import IconButton from '../IconButton';
import Skinnable from '../Skinnable';

import componentCss from './Popup.module.less';

const isUp = is('up');
const TransitionContainer = SpotlightContainerDecorator(
	{enterTo: 'default-element', preserveId: true},
	Transition
);

const getContainerNode = (containerId) => {
	return document.querySelector(`[data-spotlight-id='${containerId}']`);
};

const forwardHide = forward('onHide');
const forwardShow = forward('onShow');

/**
 * The base popup component.
 *
 * @class PopupBase
 * @memberof moonstone/Popup
 * @ui
 * @public
 */
const PopupBase = kind({
	name: 'PopupBase',

	propTypes: /** @lends moonstone/Popup.PopupBase.prototype */ {
		/**
		 * The contents to be displayed in the body of the popup.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Sets the hint string read when focusing the popup close button.
		 *
		 * @type {String}
		 * @default 'Close'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `popup` - The root class name
		 * * `body` - Applied to the body content container
		 * * `closeContainer` - Applied to the close button's container
		 * * `reserveClose` - Applied when the close button is shown and space must be allocated for it
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when the close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onCloseButtonClick: PropTypes.func,

		/**
		 * Called after the popup's "hide" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Called after the popup's "show" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onShow: PropTypes.func,

		/**
		 * Controls the visibility of the Popup.
		 *
		 * By default, the Popup and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Shows the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showCloseButton: PropTypes.bool,

		/**
		 * Tells the body element to shrink to the size of the content.
		 *
		 * Popup is composed of a {@link ui/Layout.Layout|Layout} and {@link ui/Layout.Cell|Cells}.
		 * This informs the body cell to use the {@link ui/Layout.Cell#shrink|shrink} property so
		 * it will match the dimensions of its contents rather than expand to the width of the
		 * Popup's assigned dimensions.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		shrinkBody: PropTypes.bool,

		/**
		 * The container id for {@link spotlight/Spotlight}.
		 *
		 * @type {String}
		 * @default null
		 * @public
		 */
		spotlightId: PropTypes.string,

		/**
		 * Restricts or prioritizes navigation when focus attempts to leave the popup.
		 *
		 * It can be either `'none'`, `'self-first'`, or `'self-only'`.
		 *
		 * Note: The ready-to-use {@link moonstone/Popup.Popup|Popup} component only supports
		 * `'self-first'` and `'self-only'`.
		 *
		 * @type {String}
		 * @default 'self-only'
		 * @public
		 */
		spotlightRestrict: PropTypes.oneOf(['none', 'self-first', 'self-only'])
	},

	defaultProps: {
		noAnimation: false,
		open: false,
		showCloseButton: false,
		shrinkBody: false,
		spotlightRestrict: 'self-only'
	},

	styles: {
		css: componentCss,
		className: 'popup',
		publicClassNames: ['popup', 'body', 'closeContainer', 'reserveClose']
	},

	computed: {
		className: ({showCloseButton, styler}) => styler.append({reserveClose: showCloseButton}),
		closeButton: ({closeButtonAriaLabel, css, onCloseButtonClick, showCloseButton}) => {
			if (showCloseButton) {
				const ariaLabel = (closeButtonAriaLabel == null) ? $L('Close') : closeButtonAriaLabel;

				return (
					<Cell shrink className={css.closeContainer}>
						<IconButton
							className={css.closeButton}
							backgroundOpacity="transparent"
							size="small"
							onTap={onCloseButtonClick}
							aria-label={ariaLabel}
						>
							closex
						</IconButton>
					</Cell>
				);
			}
		}
	},

	render: ({children, closeButton, css, noAnimation, onHide, onShow, open, shrinkBody, spotlightId, spotlightRestrict, ...rest}) => {
		delete rest.closeButtonAriaLabel;
		delete rest.onCloseButtonClick;
		delete rest.showCloseButton;

		return (
			<TransitionContainer
				className={css.popupTransitionContainer}
				direction="down"
				duration="short"
				noAnimation={noAnimation}
				onHide={onHide}
				onShow={onShow}
				spotlightDisabled={!open}
				spotlightId={spotlightId}
				spotlightRestrict={spotlightRestrict}
				type="slide"
				visible={open}
			>
				<Row
					aria-live="off"
					role="alert"
					{...rest}
				>
					<Cell className={css.body} shrink={shrinkBody}>
						{children}
					</Cell>
					{closeButton}
				</Row>
			</TransitionContainer>
		);
	}
});

const SkinnedPopupBase = Skinnable(
	{defaultSkin: 'light'},
	PopupBase
);

// Deprecate using scrimType 'none' with spotlightRestrict of 'self-only'
const checkScrimNone = (props) => {
	const validScrim = !(props.scrimType === 'none' && props.spotlightRestrict === 'self-only');
	warning(validScrim, "Using 'spotlightRestrict' of 'self-only' without a scrim " +
		'is not supported. Use a transparent scrim to prevent spotlight focus outside of the popup');
};

const OpenState = {
	CLOSED: 0,
	OPENING: 1,
	OPEN: 2
};

/**
 * A stateful component that renders a popup in a
 * {@link ui/FloatingLayer.FloatingLayer|FloatingLayer}.
 *
 * @class Popup
 * @memberof moonstone/Popup
 * @extends moonstone/Popup.PopupBase
 * @ui
 * @public
 */
class Popup extends Component {

	static propTypes = /** @lends moonstone/Popup.Popup.prototype */ {
		/**
		 * Hint string read when focusing the popup close button.
		 *
		 * @type {String}
		 * @default 'Close'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Indicates that the popup will not trigger `onClose` when the user presses the cancel/back (e.g. `ESC`) key or
		 * taps outside of the popup.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAutoDismiss: PropTypes.bool,

		/**
		 * Called on:
		 *
		 * * pressing `ESC` key,
		 * * clicking on the close button, or
		 * * moving spotlight focus outside the boundary of the popup when `spotlightRestrict` is
		 *   `'self-first'`.
		 *
		 * It is the responsibility of the callback to set the `open` property to `false`.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called after hide transition has completed, and immediately with no transition.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Called when a key is pressed.
		 *
		 * @type {Function}
		 * @public
		 */
		onKeyDown: PropTypes.func,

		/**
		 * Called after show transition has completed, and immediately with no transition.
		 *
		 * Note: The function does not run if Popup is initially opened and
		 * {@link moonstone/Popup.PopupBase#noAnimation|noAnimation} is `true`.
		 *
		 * @type {Function}
		 * @public
		 */
		onShow: PropTypes.func,

		/**
		 * Controls the visibility of the Popup.
		 *
		 * By default, the Popup and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Scrim type.
		 *
		 * * Values: `'transparent'`, `'translucent'`, or `'none'`.
		 *
		 * `'none'` is not compatible with `spotlightRestrict` of `'self-only'`, use a transparent scrim
		 * to prevent mouse focus when using popup.
		 *
		 * @type {String}
		 * @default 'translucent'
		 * @public
		 */
		scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),

		/**
		 * Shows a close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showCloseButton: PropTypes.bool,

		/**
		 * Restricts or prioritizes navigation when focus attempts to leave the popup.
		 *
		 * * Values: `'self-first'`, or `'self-only'`.
		 *
		 * Note: If `onClose` is not set, then this has no effect on 5-way navigation. If the popup
		 * has no spottable children, 5-way navigation will cause the Popup to fire `onClose`.
		 *
		 * @type {String}
		 * @default 'self-only'
		 * @public
		 */
		spotlightRestrict: PropTypes.oneOf(['self-first', 'self-only'])
	};

	static defaultProps = {
		noAnimation: false,
		noAutoDismiss: false,
		open: false,
		scrimType: 'translucent',
		showCloseButton: false,
		spotlightRestrict: 'self-only'
	};

	constructor (props) {
		super(props);
		this.paused = new Pause('Popup');
		this.state = {
			floatLayerOpen: this.props.open,
			popupOpen: this.props.open ? OpenState.OPEN : OpenState.CLOSED,
			prevOpen: this.props.open,
			containerId: Spotlight.add(),
			activator: null
		};
		checkScrimNone(this.props);
	}

	static getDerivedStateFromProps (props, state) {
		if (props.open !== state.prevOpen) {
			if (props.open) {
				return {
					popupOpen: props.noAnimation || state.floatLayerOpen ? OpenState.OPEN : OpenState.CLOSED,
					floatLayerOpen: true,
					activator: Spotlight.getCurrent(),
					prevOpen: props.open
				};
			} else {
				return {
					popupOpen: OpenState.CLOSED,
					floatLayerOpen: state.popupOpen !== OpenState.CLOSED ? !props.noAnimation : false,
					activator: props.noAnimation ? null : state.activator,
					prevOpen: props.open
				};
			}
		}
		return null;
	}

	// Spot the content after it's mounted.
	componentDidMount () {
		if (this.props.open && getContainerNode(this.state.containerId)) {
			this.spotPopupContent();
		}
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.open !== prevProps.open) {
			if (!this.props.noAnimation) {
				this.paused.pause();
			} else if (this.props.open) {
				forwardShow({}, this.props);
				this.spotPopupContent();
			} else if (prevProps.open) {
				forwardHide({}, this.props);
				this.spotActivator(prevState.activator);
			}
		}

		checkScrimNone(this.props);
	}

	componentWillUnmount () {
		if (this.props.open) {
			off('keydown', this.handleKeyDown);
		}
		Spotlight.remove(this.state.containerId);
	}

	handleFloatingLayerOpen = () => {
		if (!this.props.noAnimation && this.state.popupOpen !== OpenState.OPEN) {
			this.setState({
				popupOpen: OpenState.OPENING
			});
		} else if (this.state.popupOpen === OpenState.OPEN && this.props.open) {
			this.spotPopupContent();
		}
	};

	handleKeyDown = (ev) => {
		const {onClose, spotlightRestrict} = this.props;
		const keyCode = ev.keyCode;
		const direction = getDirection(keyCode);
		const spottables = Spotlight.getSpottableDescendants(this.state.containerId).length;

		if (direction && onClose) {
			let focusChanged;

			if (spottables && Spotlight.getCurrent() && spotlightRestrict !== 'self-only') {
				focusChanged = Spotlight.move(direction);
				if (focusChanged) {
					// stop propagation to prevent default spotlight behavior
					ev.stopPropagation();
				}
			}

			if (!spottables || (focusChanged === false && isUp(keyCode))) {
				// prevent default page scrolling
				ev.preventDefault();
				// stop propagation to prevent default spotlight behavior
				ev.stopPropagation();
				// set the pointer mode to false on keydown
				Spotlight.setPointerMode(false);
				onClose(ev);
			}
		}
	};

	handlePopupHide = (ev) => {
		forwardHide(ev, this.props);

		this.setState({
			floatLayerOpen: false,
			activator: null
		});

		if (!ev.currentTarget || ev.currentTarget.getAttribute('data-spotlight-id') === this.state.containerId) {
			this.paused.resume();

			if (!this.props.open) {
				this.spotActivator(this.state.activator);
			}
		}
	};

	handlePopupShow = (ev) => {
		forwardShow(ev, this.props);

		this.setState({
			popupOpen: OpenState.OPEN
		});

		if (!ev.currentTarget || ev.currentTarget.getAttribute('data-spotlight-id') === this.state.containerId) {
			this.paused.resume();

			if (this.props.open) {
				this.spotPopupContent();
			}
		}
	};

	spotActivator = (activator) => {
		const current = Spotlight.getCurrent();
		const containerNode = getContainerNode(this.state.containerId);

		off('keydown', this.handleKeyDown);

		// if there is no currently-spotted control or it is wrapped by the popup's container, we
		// know it's safe to change focus
		if (!current || (containerNode && containerNode.contains(current))) {
			// attempt to set focus to the activator, if available
			if (!Spotlight.focus(activator)) {
				Spotlight.focus();
			}
		}
	};

	spotPopupContent = () => {
		const {containerId} = this.state;

		on('keydown', this.handleKeyDown);

		if (!Spotlight.focus(containerId)) {
			const current = Spotlight.getCurrent();

			// In cases where the container contains no spottable controls or we're in pointer-mode, focus
			// cannot inherently set the active container or blur the active control, so we must do that
			// here.
			if (current) {
				current.blur();
			}
			Spotlight.setActiveContainer(containerId);
		}
	};

	render () {
		const {noAutoDismiss, onClose, scrimType, ...rest} = this.props;
		delete rest.spotlightRestrict;

		return (
			<FloatingLayer
				noAutoDismiss={noAutoDismiss}
				open={this.state.floatLayerOpen}
				onOpen={this.handleFloatingLayerOpen}
				onDismiss={onClose}
				scrimType={scrimType}
			>
				<SkinnedPopupBase
					{...rest}
					data-webos-voice-exclusive
					onCloseButtonClick={onClose}
					onHide={this.handlePopupHide}
					onShow={this.handlePopupShow}
					open={this.state.popupOpen >= OpenState.OPENING}
					spotlightId={this.state.containerId}
					spotlightRestrict="self-only"
				/>
			</FloatingLayer>
		);
	}
}

export default Popup;
export {Popup, PopupBase};
