/**
 * An unstyled item component that accepts multiple positions of children.
 *
 * Using the usual `children` prop, as well as two additional props: `slotBefore`, and `slotAfter`.
 * It is able to be customized by a theme or application.
 *
 * @module moonstone/UiSlotItem
 * @exports SlotItem
 * @exports SlotItemBase
 * @exports SlotItemDecorator
 */

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import ForwardRef from '@enact/ui/ForwardRef';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import componentCss from './UiSlotItem.module.less';

/**
 * An ui-styled `SlotItem` without any behavior.
 *
 * @class SlotItemBase
 * @memberof moonstone/UiSlotItem
 * @ui
 * @public
 */
const SlotItemBase = kind({
	name: 'SlotItem',

	propTypes: /** @lends moonstone/UiSlotItem.SlotItemBase.prototype */ {
		/**
		 * The type of component to use to render the item.
		 *
		 * This component will receive the `inline` prop and any additional unhandled props provided
		 * to `SlotItem`. A derivative of {@link ui/Item.Item|Item} is recommended.
		 *
		 * @type {String|Component}
		 * @default 'div'
		 * @required
		 * @public
		 */
		component: EnactPropTypes.component.isRequired,

		/**
		 * Controls the visibility state of the slots.
		 *
		 * One, both, or neither slot can be shown. Choosing `'after'` will leave `slotBefore`
		 * visible at all times; only `slotAfter` will have its visibility toggled.  Valid values
		 * are `'before'`, `'after'` and `'both'`. Omitting the property will result in
		 * no-auto-hiding for either slot so they will both be present.
		 *
		 * In order for `autoHide` to have a visual affect, the `hidden` class must be tied to
		 * another condition such as focus.
		 *
		 * ```
		 * .slot.hidden:not(:focus) {
		 *   display: none;
		 * }
		 * ```
		 *
		 * @type {Boolean}
		 * @public
		 */
		autoHide: PropTypes.oneOf(['after', 'before', 'both']),

		/**
		 * Called with a reference to the root component.
		 *
		 * When using {@link moonstone/UiSlotItem.SlotItem}, the `ref` prop is forwarded to this component
		 * as `componentRef`.
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
		 * * `slotItem` - The root class name
		 * * `slot` - Applied to both slots
		 * * `after` - Applied to the slot that falls after the content
		 * * `before` - Applied to the slot that falls before the content
		 * * `hidden` - Applied to a slot when that slot is supposed to be hidden, according to
		 *              `autoHide` prop
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Applies inline styling to the component.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		inline: PropTypes.bool,

		/**
		 * The layout technique for `SlotItem`.
		 *
		 * `"flex"` is applied as a default and gives basic flex support to the wrapping elements.
		 * This may be set to `null` to define your own layout method.
		 *
		 * @type {String}
		 * @default 'flex'
		 * @public
		 */
		layout: PropTypes.oneOf(['flex']),

		/**
		 * Nodes to be inserted after `children` and hidden using `autoHide`.
		 *
		 * If nothing is specified, nothing, not even an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotAfter: PropTypes.node,

		/**
		 * Nodes to be inserted before `children` and hidden using `autoHide`.
		 *
		 * If nothing is specified, nothing, not even an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node
	},

	defaultProps: {
		component: 'div',
		inline: false,
		layout: 'flex'
	},

	styles: {
		css: componentCss,
		className: 'slotItem',
		publicClassNames: true
	},

	computed: {
		className: ({inline, layout, styler}) => styler.append(layout, {inline}),
		slotBefore: ({slotBefore, autoHide, styler}) => (slotBefore ?
			<div className={styler.join('slot', 'before', {hidden: (autoHide === 'before' || autoHide === 'both')})}>
				{slotBefore}
			</div> : null
		),
		slotAfter: ({slotAfter, autoHide, styler}) => (slotAfter ?
			<div className={styler.join('slot', 'after', {hidden: (autoHide === 'after' || autoHide === 'both')})}>
				{slotAfter}
			</div> : null
		)
	},

	render: ({children, component: Component, componentRef, inline, slotAfter, slotBefore, ...rest}) => {
		delete rest.autoHide;
		delete rest.layout;

		return (
			<Component
				ref={componentRef}
				{...rest}
				inline={inline}
			>
				{slotBefore}
				{children}
				{slotAfter}
			</Component>
		);
	}
});

/**
 * An ui-specific higher-order component (HOC) with slot behaviors to apply to {@link moonstone/UiSlotItem.SlotItemBase|SlotItem}.
 *
 * @class SlotItemDecorator
 * @memberof moonstone/UiSlotItem
 * @mixes ui/Slottable.Slottable
 * @mixes ui/ForwardRef.ForwardRef
 * @hoc
 * @public
 */
const SlotItemDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	Slottable({slots: ['slotAfter', 'slotBefore']})
);

/**
 * An ui-styled item with built-in support for slots.
 *
 * Example:
 * ```
 *	<SlotItem component={Item} autoHide="both">
 *		<slotBefore>
 *			<Icon>flag</Icon>
 *			<Icon>star</Icon>
 *		</slotBefore>
 *		An Item that will show some icons slotBefore and slotAfter this text when spotted
 *		<Icon slot="slotAfter">trash</Icon>
 *	</SlotItem>
 * ```
 *
 * @class SlotItem
 * @memberof moonstone/UiSlotItem
 * @extends moonstone/UiSlotItem.SlotItemBase
 * @mixes moonstone/UiSlotItem.SlotItemDecorator
 * @omit componentRef
 * @ui
 * @public
 */
const SlotItem = SlotItemDecorator(SlotItemBase);

export default SlotItem;
export {
	SlotItem,
	SlotItemBase,
	SlotItemDecorator
};
