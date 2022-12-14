/**
 * An {@link moonstone/Icon.Icon|Icon} ecorated with a label.
 *
 * You may specify an image or a font-based icon by setting the `icon` to either the path
 * to the image or a string from an {@link moonstone/Icon.IconBase.iconList|iconList}.
 *
 * @example
 * <LabeledIcon icon="star" labelPosition="after">
 *   Favorite
 * </LabeledIcon>
 *
 * @module moonstone/LabeledIcon
 * @exports LabeledIcon
 * @exports LabeledIconBase
 * @exports LabeledIconDecorator
 */

import kind from '@enact/core/kind';
import {LabeledIconBase as UiLabeledIconBase, LabeledIconDecorator as UiLabeledIconDecorator} from '@enact/ui/LabeledIcon';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {IconBase} from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './LabeledIcon.module.less';

// Make a basic Icon. This cuts `Pure` out of icon for a small gain.
const Icon = Skinnable(IconBase);

/**
 * A basic LabeledIcon component structure without any behaviors applied to it.
 *
 * @class LabeledIconBase
 * @memberof moonstone/LabeledIcon
 * @extends ui/LabeledIcon.LabeledIconBase
 * @ui
 * @public
 */
const LabeledIconBase = kind({
	name: 'LabeledIcon',

	propTypes: /** @lends moonstone/LabeledIcon.LabeledIconBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledIcon` - The root component class
		 * * `label` - The label component class
		 * * `icon` - The icon component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		className: 'labeledIcon',
		publicClassNames: ['labeledIcon', 'icon', 'label']
	},

	render: (props) => {
		return UiLabeledIconBase.inline({
			...props,
			iconComponent: Icon,
			css: props.css
		});
	}
});

/**
 * Adds Moonstone specific behaviors to {@link moonstone/LabeledIcon.LabeledIconBase|LabeledIconBase}.
 *
 * @hoc
 * @memberof moonstone/LabeledIcon
 * @mixes ui/LabeledIcon.LabeledIconDecorator
 * @mixes moonstone/Skinnable.Skinnable
 * @public
 */
const LabeledIconDecorator = compose(
	UiLabeledIconDecorator,
	Pure,
	Skinnable
);

/**
 * A Moonstone-styled icon component with a label.
 *
 * Usage:
 * ```
 * <LabeledIcon icon="star" labelPosition="after">
 *   Favorite
 * </LabeledIcon>
 * ```
 *
 * @class LabeledIcon
 * @memberof moonstone/LabeledIcon
 * @extends moonstone/LabeledIcon.LabeledIconBase
 * @mixes moonstone/LabeledIcon.LabeledIconDecorator
 * @ui
 * @public
 */
const LabeledIcon = LabeledIconDecorator(LabeledIconBase);

export default LabeledIcon;
export {
	LabeledIcon,
	LabeledIconBase,
	LabeledIconDecorator
};
