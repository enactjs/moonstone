/**
 * An {@link ui/Icon.Icon|Icon} that acts like a {@link ui/Button.Button|Button}.
 *
 * You may specify an image or a font-based icon by setting the `children` to either the path
 * to the image or a string from an {@link ui/Icon.Icon.iconList|iconList}. This is unstyled,
 * but can easily be extended and customized by a theme or application.
 *
 * @module moonstone/UiIconButton
 * @exports IconButton
 * @exports IconButtonBase
 * @exports IconButtonDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Children} from 'react';

import ComponentOverride from '@enact/ui/ComponentOverride';
import ForwardRef from '@enact/ui/ForwardRef';
import Touchable from '@enact/ui/Touchable';

import componentCss from './UiIconButton.module.less';

/**
 * An ui-styled button without any behavior.
 *
 * @class IconButtonBase
 * @memberof moonstone/UiIconButton
 * @ui
 * @public
 */
const IconButtonBase = kind({
	name: 'ui:IconButton',

	propTypes: /** @lends moonstone/UiIconButton.IconButtonBase.prototype */ {
		/**
		 * This is the root component used to render the button and will receive all props except
		 * `icon`.
		 *
		 * @type {Component|Element}
		 * @required
		 * @public
		 */
		buttonComponent: EnactPropTypes.componentOverride.isRequired,

		/**
		 * The component used to render the {@link moonstone/UiIconButton.IconButtonBase.icon|icon}.
		 *
		 * This component will receive the `flip` and `size` property set on the `IconButton` as well as the
		 * `icon` class to customize its styling.
		 *
		 * @type {Component}
		 * @required
		 * @public
		 */
		iconComponent: EnactPropTypes.component.isRequired,

		/**
		 * Additional children that follow the icon.
		 *
		 * If `icon` isn't specified but `children` is, `children` is used as the icon's value.
		 *
		 * @see {@link ui/Icon.Icon#children}
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Called with a reference to the root component.
		 *
		 * When using {@link moonstone/UiIconButton.IconButton}, the `ref` prop is forwarded to this
		 * component as `componentRef`.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `iconButton` - The root component class
		 * * `icon` - The {@link moonstone/UiIconButton.IconButtonBase.iconComponent|icon component} class
		 * * `large` - Applied when `size` prop is `'large'`
		 * * `small` - Applied when `size` prop is `'small'`
		 * * `pressed` - Applied when `pressed` prop is `true`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables IconButton.
		 *
		 * When `true`, the button is shown as disabled and does not generate
		 * `onClick` {@link /docs/developer-guide/glossary/#event|events}.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Flip the icon horizontally, vertically or both.
		 *
		 * @type {('both'|'horizontal'|'vertical')}
		 * @public
		 */
		flip: PropTypes.string,

		/**
		 * The icon displayed within the IconButton.
		 *
		 * If not specified, `children` is used as the icon value instead.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * Applies the `pressed` CSS class.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		pressed: PropTypes.bool,

		/**
		 * Applies the `selected` CSS class.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The size of the button.
		 *
		 * Applies the CSS class which can be customized by
		 * {@link /docs/developer-guide/theming/|theming}.
		 *
		 * @type {String}
		 * @public
		 */
		size: PropTypes.string
	},

	defaultProps: {
		disabled: false,
		pressed: false,
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'iconButton',
		publicClassNames: true
	},

	computed: {
		className: ({size, styler}) => styler.append(size)
	},

	render: ({buttonComponent, children, componentRef, css, flip, icon, iconComponent: Icon, size, ...rest}) => {
		// To support the simpler use case of only specifying the icon as the children within
		// <IconButton>, this falls back on using children if icon isn't specified.
		if (!icon && children) {
			icon = children;
			children = null;
		}

		return ComponentOverride({
			...rest,
			component: buttonComponent,
			size: size,
			minWidth: false,
			children: [
				<Icon key="icon" flip={flip} size={size} className={css.icon}>{icon}</Icon>,
				...Children.toArray(children)
			],
			ref: componentRef
		});
	}
});

/**
 * A higher-order component that adds universal button behaviors to an {@link moonstone/UiIconButton.IconButtonBase|IconButtonBase}.
 *
 * @hoc
 * @memberof moonstone/UiIconButton
 * @mixes ui/ForwardRef.ForwardRef
 * @mixes ui/Touchable.Touchable
 * @public
 */
const IconButtonDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	Touchable({activeProp: 'pressed'})
);

/**
 * A minimally styled, but interactive, Button ready for customization by a theme.
 *
 * Example:
 * ```
 * <IconButton size="small">
 *     plus
 * </IconButton>
 * ```
 *
 * @class IconButton
 * @extends moonstone/IconButton.IconButtonBase
 * @mixes moonstone/IconButton.IconButtonDecorator
 * @omit componentRef
 * @memberof moonstone/UiIconButton
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
