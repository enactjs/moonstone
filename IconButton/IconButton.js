/**
 * An {@link moonstone/Icon.Icon|Icon} that acts like a {@link moonstone/Button.Button|Button}.
 * You may specify an image or a font-based icon by setting the `children` to either the path
 * to the image or a string from an {@link moonstone/Icon.IconBase.iconList|iconList}.
 *
 * @example
 * <IconButton size="small">plus</IconButton>
 *
 * @module moonstone/IconButton
 * @exports IconButton
 * @exports IconButtonBase
 * @exports IconButtonDecorator
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {ButtonBase} from '../Button';
import Icon from '../Icon';
import Skinnable from '../Skinnable';
import TooltipDecorator from '../TooltipDecorator';
import {IconButtonBase as UiIconButtonBase, IconButtonDecorator as UiIconButtonDecorator} from '../UiIconButton';

import componentCss from './IconButton.module.less';

/**
 * A moonstone-styled icon button without any behavior.
 *
 * @class IconButtonBase
 * @memberof moonstone/IconButton
 * @extends moonstone/Button.ButtonBase
 * @extends moonstone/UiIconButton.IconButtonBase
 * @omit buttonComponent
 * @omit iconComponent
 * @ui
 * @public
 */
const IconButtonBase = kind({
	name: 'IconButton',

	propTypes: /** @lends moonstone/IconButton.IconButtonBase.prototype */ {
		/**
		 * The background-color opacity of this icon button.
		 *
		 * Valid values are:
		 * * `'translucent'`,
		 * * `'lightTranslucent'`, and
		 * * `'transparent'`.
		 *
		 * @type {String}
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['translucent', 'lightTranslucent', 'transparent']),

		/**
		 * The color of the underline beneath the icon.
		 *
		 * This property accepts one of the following color names, which correspond with the
		 * colored buttons on a standard remote control: `'red'`, `'green'`, `'yellow'`, `'blue'`
		 *
		 * @type {String}
		 * @public
		 */
		color: PropTypes.oneOf(['red', 'green', 'yellow', 'blue']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `iconButton` - The root class name
		 * * `bg` - The background node of the icon button
		 * * `large` - Applied to a `size='large'` icon button
		 * * `selected` - Applied to a `selected` icon button
		 * * `small` - Applied to a `size='small'` icon button
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	defaultProps: {
		size: 'small'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['iconButton', 'bg', 'large', 'selected', 'small']
	},

	computed: {
		className: ({color, styler}) => styler.append(color)
	},

	render: ({children, css, ...rest}) => {
		return UiIconButtonBase.inline({
			'data-webos-voice-intent': 'Select',
			...rest,
			buttonComponent: <ButtonBase css={css} />,
			css,
			icon: children,
			iconComponent: Icon
		});
	}
});

/**
 * Moonstone-specific button behaviors to apply to
 * {@link moonstone/IconButton.IconButtonBase|IconButton}.
 *
 * @hoc
 * @memberof moonstone/IconButton
 * @mixes moonstone/TooltipDecorator.TooltipDecorator
 * @mixes moonstone/UiIconButton.IconButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes moonstone/Skinnable.Skinnable
 * @public
 */
const IconButtonDecorator = compose(
	Pure,
	TooltipDecorator({tooltipDestinationProp: 'decoration'}),
	UiIconButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * `IconButton` does not have `Marquee` like `Button` has, as it should not contain text.
 *
 * Usage:
 * ```
 * <IconButton onClick={handleClick} size="small">
 *     plus
 * </IconButton>
 * ```
 *
 * @class IconButton
 * @memberof moonstone/IconButton
 * @extends moonstone/IconButton.IconButtonBase
 * @mixes moonstone/IconButton.IconButtonDecorator
 * @ui
 * @public
 */
const IconButton = IconButtonDecorator(IconButtonBase);

export default IconButton;
export {
	IconButton,
	IconButtonBase,
	IconButtonDecorator
};
