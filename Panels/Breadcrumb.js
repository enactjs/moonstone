import {handle, forward, adaptEvent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';

import $L from '../internal/$L';

import css from './Panels.module.less';

// Since we expose `onSelect` to handle breadcrumb selection, we need that handler to be set on a
// component that proxies mouse events for key events so we create a spottable div that will
// get the right classes as well as handle events correctly.
const SpottableDiv = Spottable('div');

/**
 * The width of a breadcrumb which may be used to allocate space for it in a panels layout.
 * Note: This value will be scaled according to the resolution.
 *
 * @type {Number}
 * @default 96
 * @private
 * @memberof moonstone/Panels
 */
export const breadcrumbWidth = 96;

/**
 * Vertical, transparent bar used to navigate to a prior Panel.
 *
 * {@link moonstone/Panels.ActivityPanels|ActivityPanels} has one breadcrumb, and
 * {@link moonstone/Panels.AlwaysViewingPanels|AlwaysViewingPanels} can have multiple stacked
 * horizontally.
 *
 * @class Breadcrumb
 * @memberof moonstone/Panels
 * @ui
 * @public
 */
const BreadcrumbBase = kind({
	name: 'Breadcrumb',

	propTypes: /** @lends moonstone/Panels.Breadcrumb.prototype */ {
		/**
		 * Index of the associated panel.
		 *
		 * @type {Number}
		 * @required
		 */
		index: PropTypes.number.isRequired,

		/**
		 * Called when the breadcrumb is clicked.
		 *
		 * @private
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * Called when the breadcrumb is clicked.
		 *
		 * The index of the clicked breadcrumb is passed in the event data.
		 *
		 * @type {Function}
		 */
		onSelect: PropTypes.func
	},

	styles: {
		css,
		className: 'breadcrumb'
	},

	handlers: {
		onSelect: handle(
			forward('onClick'),
			adaptEvent((ev, {index}) => ({type: 'onSelect', index}), forward('onSelect'))
		)
	},

	render: ({children, index, onSelect, ...rest}) => (
		<SpottableDiv
			{...rest}
			aria-label={$L('GO TO PREVIOUS')}
			data-index={index}
			onClick={(...param) => setTimeout(() => onSelect(...param), 50)} // eslint-disable-line react/jsx-no-bind
		>
			<div className={css.breadcrumbHeader}>
				{children}
			</div>
		</SpottableDiv>
	)
});

export default BreadcrumbBase;
export {BreadcrumbBase as Breadcrumb, BreadcrumbBase};
