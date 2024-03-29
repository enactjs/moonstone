/**
 * A Moonstone-themed {@link moonstone/Item|Item} used as the basis for other stylized toggle item
 * components.
 *
 * Note: This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an
 * {@link moonstone/ToggleItem.ToggleItemBase#iconComponent|iconComponent prop}.
 *
 * @example
 * <ToggleItem
 * 	iconComponent={Checkbox}
 * 	iconPosition='before'>
 * 	Toggle me
 * </ToggleItem>
 *
 * @module moonstone/ToggleItem
 * @exports ToggleItem
 * @exports ToggleItemBase
 * @exports ToggleItemDecorator
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import ForwardRef from '@enact/ui/ForwardRef';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import Toggleable from '@enact/ui/Toggleable';
import Touchable from '@enact/ui/Touchable';
import Spottable from '@enact/spotlight/Spottable';
import compose from 'ramda/src/compose';

import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';
import {SlotItemBase} from '../SlotItem';
import {ToggleItemBase as UiToggleItem} from '../UiToggleItem';

import componentCss from './ToggleItem.module.less';

/**
 * A Moonstone-styled toggle {@link moonstone/Item|Item} without any behavior.
 *
 * @class ToggleItemBase
 * @memberof moonstone/ToggleItem
 * @ui
 * @public
 */
const ToggleItemBase = kind({
	name: 'ToggleItem',

	propTypes: /** @lends moonstone/ToggleItem.ToggleItemBase.prototype */ {
		/**
		 * The content to be displayed as the main content of the toggle item.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * The icon component to render in this item.
		 *
		 * This component receives the `selected` prop and value, and must therefore respond to it in some
		 * way. It is recommended to use {@link moonstone/ToggleIcon|ToggleIcon} for this.
		 *
		 * @type {Component|Element}
		 * @required
		 * @public
		 */
		iconComponent: EnactPropTypes.componentOverride.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `toggleItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Overrides the icon of the `iconComponent` component.
		 *
		 * This accepts any string that the {@link moonstone/Icon.Icon|Icon} component supports,
		 * provided the recommendations of `iconComponent` are followed.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string
	},

	styles: {
		css: componentCss,
		publicClassNames: ['toggleItem', 'slot']
	},

	render: (props) => {
		return (
			<UiToggleItem
				role="checkbox"
				{...props}
				component={SlotItemBase}
				css={props.css}
			/>
		);
	}
});

/**
 * Default config for {@link moonstone/ToggleItem.ToggleItemDecorator}.
 *
 * @memberof moonstone/ToggleItem.ToggleItemDecorator
 * @hocconfig
 */
const defaultConfig = {
	/**
	 * Invalidate the distance of marquee text if any property (like 'inline') changes.
	 * Expects an array of props which on change trigger invalidateMetrics.
	 *
	 * @type {String[]}
	 * @default ['inline']
	 * @memberof moonstone/ToggleItem.ToggleItemDecorator.defaultConfig
	 */
	invalidateProps: ['inline']
};

/**
 * Adds interactive functionality to `ToggleItemBase`.
 *
 * @class ToggleItemDecorator
 * @memberof moonstone/ToggleItem
 * @mixes moonstone/UiToggleItem.ToggleItemDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes moonstone/Marquee.MarqueeDecorator
 * @mixes moonstone/Skinnable.Skinnable
 * @hoc
 * @public
 */
const ToggleItemDecorator = hoc(defaultConfig, ({invalidateProps}, Wrapped) => {
	return compose(
		Pure,
		ForwardRef({prop: 'componentRef'}),
		Toggleable({toggleProp: 'onClick', eventProps: ['value']}),
		Touchable,
		Spottable,
		MarqueeDecorator({css: componentCss, invalidateProps}),
		Skinnable
	)(Wrapped);
});

/**
 * A Moonstone-styled item with built-in support for toggling, marqueed text, and `Spotlight` focus.
 *
 * This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an `iconComponent` prop.
 *
 * @class ToggleItem
 * @memberof moonstone/ToggleItem
 * @extends moonstone/ToggleItem.ToggleItemBase
 * @mixes moonstone/ToggleItem.ToggleItemDecorator
 * @ui
 * @public
 */
const ToggleItem = ToggleItemDecorator(ToggleItemBase);

/**
 * The Icon to render in this item.
 *
 * This component receives the `selected` prop and value, and must therefore respond to it in some
 * way. It is recommended to use {@link moonstone/ToggleIcon|ToggleIcon} for this.
 *
 * @name iconComponent
 * @memberof moonstone/ToggleItem.ToggleItem.prototype
 * @type {Component|Element}
 * @default null
 * @required
 * @public
 */

export default ToggleItem;
export {
	ToggleItem,
	ToggleItemBase,
	ToggleItemDecorator
};
