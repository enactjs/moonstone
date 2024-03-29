import kind from '@enact/core/kind';
import Measurable from '@enact/ui/Measurable';
import Slottable from '@enact/ui/Slottable';
import IdProvider from '@enact/ui/internal/IdProvider';
import {shape} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import CancelDecorator from './CancelDecorator';
import Controls from './Controls';
import Viewport from './Viewport';

import css from './Panels.module.less';

const getControlsId = (id) => id && `${id}-controls`;

/**
 * Basic Panels component without breadcrumbs or default {@link ui/ViewManager.Arranger|arranger}
 *
 * @class Panels
 * @memberof moonstone/Panels
 * @ui
 * @public
 */
const PanelsBase = kind({
	name: 'Panels',

	propTypes: /** @lends moonstone/Panels.Panels.prototype */ {
		/**
		 * Function that generates unique identifiers for Panel instances.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		generateId: PropTypes.func.isRequired,

		/**
		 * Set of functions that control how the panels are transitioned into and out of the
		 * viewport.
		 *
		 * @see {@link ui/ViewManager.SlideArranger}
		 * @type {ui/ViewManager.Arranger}
		 * @public
		 */
		arranger: shape,

		/**
		 * An object containing properties to be passed to each child.
		 *
		 *`aria-owns` will be added or updated to this object to add the close button to the
		 * accessibility tree of each panel.
		 *
		 * @type {Object}
		 * @public
		 */
		childProps: PropTypes.object,

		/**
		 * {@link moonstone/Panels.Panel|Panels} to be rendered
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Sets the hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * The background opacity of the application close button.
		 *
		 * * Values: `'translucent'`, `'lightTranslucent'`, `'transparent'`
		 *
		 * @type {String}
		 * @default 'transparent'
		 * @public
		 */
		closeButtonBackgroundOpacity: PropTypes.oneOf(['translucent', 'lightTranslucent', 'transparent']),

		/**
		 * A slot to insert additional Panels-level buttons into the global-navigation area.
		 *
		 * @type {Node}
		 * @public
		 */
		controls: PropTypes.node,

		/**
		 * The measurement bounds of the controls node
		 *
		 * @type {Object}
		 * @private
		 */
		controlsMeasurements: PropTypes.object,

		/**
		 * The method which receives the reference node to the controls element, used to determine
		 * the `controlsMeasurements`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		controlsRef: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.shape({current: PropTypes.any})
		]),

		/**
		 * Unique identifier for the Panels instance.
		 *
		 * When defined, `Panels` will manage the presentation state of `Panel` instances in order
		 * to restore it when returning to the `Panel`. See
		 * {@link moonstone/Panels.Panels.noSharedState|noSharedState} for more details on shared
		 * state.
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Indicates the close button will not be rendered on the top right corner.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Prevents maintaining shared state for framework components within this `Panels` instance.
		 *
		 * When `false`, each `Panel` will track the state of some framework components in order to
		 * restore that state when the Panel is recreated. For example, the scroll position of a
		 * `moonstone/Scroller` within a `Panel` will be saved and restored when returning to that
		 * `Panel`.
		 *
		 * This only applied when navigating "back" (to a lower index) to `Panel`. When navigating
		 * "forwards" (to a higher index), the `Panel` and its contained components will use their
		 * default state.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noSharedState: PropTypes.bool,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onApplicationClose: PropTypes.func,

		/**
		 * Called with cancel/back key events.
		 *
		 * @type {Function}
		 * @public
		 */
		onBack: PropTypes.func
	},

	defaultProps: {
		closeButtonBackgroundOpacity: 'transparent',
		index: 0,
		noAnimation: false,
		noCloseButton: false,
		noSharedState: false
	},

	styles: {
		css,
		className: 'panels enact-fit'
	},

	computed: {
		className: ({controls, noCloseButton, styler}) => styler.append({
			'moon-panels-hasControls': (!noCloseButton || !!controls) // If there is a close button or controls were specified
		}),
		childProps: ({childProps, controls, id, noCloseButton}) => {
			if ((noCloseButton && !controls) || !id) {
				return childProps;
			}

			const updatedChildProps = Object.assign({}, childProps);
			const controlsId = getControlsId(id);
			const owns = updatedChildProps['aria-owns'];

			if (owns) {
				updatedChildProps['aria-owns'] = `${owns} ${controlsId}`;
			} else {
				updatedChildProps['aria-owns'] = controlsId;
			}

			return updatedChildProps;
		},
		style: ({controlsMeasurements, style = {}}) => (controlsMeasurements ? {
			...style,
			'--moon-panels-controls-width': controlsMeasurements.width + 'px'
		} : style),
		viewportId: ({id}) => id && `${id}-viewport`
	},

	render: ({arranger, childProps, children, closeButtonAriaLabel, closeButtonBackgroundOpacity, controls, controlsRef, generateId, id, index, noAnimation, noCloseButton, noSharedState, onApplicationClose, viewportId, ...rest}) => {
		delete rest.controlsMeasurements;
		delete rest.onBack;

		const controlsId = getControlsId(id);

		return (
			<div {...rest} id={id}>
				<Controls
					closeButtonAriaLabel={closeButtonAriaLabel}
					closeButtonBackgroundOpacity={closeButtonBackgroundOpacity}
					id={controlsId}
					spotlightId={controlsId}
					noCloseButton={noCloseButton}
					onApplicationClose={onApplicationClose}
					ref={controlsRef}
				>
					{controls}
				</Controls>
				<Viewport
					arranger={arranger}
					childProps={childProps}
					generateId={generateId}
					id={viewportId}
					index={index}
					noAnimation={noAnimation}
					noSharedState={noSharedState}
				>
					{children}
				</Viewport>
			</div>
		);
	}
});

const PanelsDecorator = compose(
	Slottable({slots: ['controls']}),
	CancelDecorator({cancel: 'onBack'}),
	Measurable({refProp: 'controlsRef', measurementProp: 'controlsMeasurements'}),
	IdProvider,
	Skinnable
);

const Panels = PanelsDecorator(PanelsBase);

export default Panels;
export {
	Panels,
	PanelsBase
};
