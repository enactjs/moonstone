import ApiDecorator from '@enact/core/internal/ApiDecorator';
import PropTypes from 'prop-types';
import {createRef, Component} from 'react';

import Skinnable from '../Skinnable';
import {ScrollbarBase as UiScrollbarBase} from '../UiScrollable/Scrollbar';

import ScrollButtons from './ScrollButtons';
import ScrollThumb from './ScrollThumb';

import componentCss from './Scrollbar.module.less';

/**
 * A Moonstone-styled scroller base component.
 *
 * @class ScrollbarBase
 * @memberof moonstone/Scrollable
 * @extends moonstone/UiScrollbarBase
 * @ui
 * @private
 */
class ScrollbarBase extends Component {
	static displayName = 'ScrollbarBase';

	static propTypes = /** @lends moonstone/Scrollable.Scrollbar.prototype */ {
		/**
		 * Called when {@link moonstone/Scrollable.ScrollThumb|ScrollThumb} is updated.
		 *
		 * @type {Function}
		 * @private
		 */
		cbAlertThumb: PropTypes.func,

		/**
		 * Client size of the container; valid values are an object that has `clientWidth` and `clientHeight`.
		 *
		 * @type {Object}
		 * @property {Number}    clientHeight    The client height of the list.
		 * @property {Number}    clientWidth    The client width of the list.
		 * @public
		 */
		clientSize: PropTypes.shape({
			clientHeight: PropTypes.number.isRequired,
			clientWidth: PropTypes.number.isRequired
		}),

		/**
		 * Adds the corner between vertical and horizontal scrollbars.
		 *
		 * @type {Booelan}
		 * @default false
		 * @public
		 */
		corner: PropTypes.bool,

		/**
		 * `true` if rtl, `false` if ltr.
		 * Normally, {@link moonstone/UiScrollable.Scrollable|Scrollable} should set this value.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Registers the ScrollButtons component with an
		 * {@link core/internal/ApiDecorator.ApiDecorator}.
		 *
		 * @type {Function}
		 * @private
		 */
		setApiProvider: PropTypes.func,

		/**
		 * The scrollbar will be oriented vertically.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		vertical: PropTypes.bool
	};

	static defaultProps = {
		corner: false,
		vertical: true
	};

	constructor (props) {
		super(props);

		if (props.setApiProvider) {
			props.setApiProvider(this);
		}

		this.scrollbarRef = createRef();
		this.scrollButtonsRef = createRef();
	}

	componentDidMount () {
		const {getContainerRef, showThumb, startHidingThumb, update: uiUpdate} = this.scrollbarRef.current;

		this.getContainerRef = getContainerRef;
		this.showThumb = showThumb;
		this.startHidingThumb = startHidingThumb;
		this.uiUpdate = uiUpdate;

		const {isOneOfScrollButtonsFocused, updateButtons, focusOnButton} = this.scrollButtonsRef.current;

		this.isOneOfScrollButtonsFocused = isOneOfScrollButtonsFocused;
		this.update = (bounds) => {
			updateButtons(bounds);
			this.uiUpdate(bounds);
		};
		this.focusOnButton = focusOnButton;
	}

	render () {
		const {cbAlertThumb, clientSize, corner, vertical, ...rest} = this.props;

		return (
			<UiScrollbarBase
				corner={corner}
				clientSize={clientSize}
				css={componentCss}
				ref={this.scrollbarRef}
				vertical={vertical}
				childRenderer={({thumbRef}) => ( // eslint-disable-line react/jsx-no-bind
					<ScrollButtons
						{...rest}
						ref={this.scrollButtonsRef}
						vertical={vertical}
						thumbRenderer={() => ( // eslint-disable-line react/jsx-no-bind
							<ScrollThumb
								cbAlertThumb={cbAlertThumb}
								key="thumb"
								ref={thumbRef}
								vertical={vertical}
							/>
						)}
					/>
				)}
			/>
		);
	}
}

/**
 * A Moonstone-styled scroll bar. It is used in {@link moonstone/Scrollable.Scrollable|Scrollable}.
 *
 * @class Scrollbar
 * @memberof moonstone/Scrollable
 * @ui
 * @private
 */
const Scrollbar = ApiDecorator(
	{api: [
		'focusOnButton',
		'getContainerRef',
		'isOneOfScrollButtonsFocused',
		'showThumb',
		'startHidingThumb',
		'update'
	]}, Skinnable(ScrollbarBase)
);
Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
export {
	Scrollbar,
	Scrollbar as ScrollbarBase
};
