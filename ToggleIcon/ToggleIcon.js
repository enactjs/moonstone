/**
 * Provides Moonstone-themed Icon component with interactive toggleable capabilities.
 *
 * `ToggleIcon` does not implement a visual change when a user interacts with the control and must
 * be customized by the consumer using {@link ui/ToggleIcon.ToggleIconBase.css|css className overrides}.
 *
 * Often, an {@link moonstone/Icon.Icon|Icon value} is passed as `children` to represent the
 * selected state but is not required. Omitting `children` allows the consumer to implement more
 * advanced approaches such as styling the `::before` and `::after` pseudo-elements to save a DOM
 * node.
 *
 * The following Moonstone components use `ToggleIcon`, and make good examples of various usages.
 *
 * * {@link moonstone/Checkbox.Checkbox|Checkbox},
 * * {@link moonstone/FormCheckbox.FormCheckbox|FormCheckbox},
 * * {@link moonstone/Switch.Switch|Switch},
 * * {@link moonstone/RadioItem.RadioItem|RadioItem}, and
 * * {@link moonstone/SelectableItem.SelectableItem|SelectableItem}.
 *
 * @example
 * <ToggleIcon onToggle={(props)=> console.log(props.selected)}>
 *   check
 * </ToggleIcon>
 *
 * @module moonstone/ToggleIcon
 * @exports ToggleIcon
 * @exports ToggleIconBase
 * @exports ToggleIconDecorator
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import UiToggleIcon from '@enact/ui/ToggleIcon';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

/**
 * A component that indicates a boolean state.
 *
 * @class ToggleIconBase
 * @memberof moonstone/ToggleIcon
 * @extends ui/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const ToggleIconBase = kind({
	name: 'ToggleIcon',

	render: (props) => {
		return (
			<UiToggleIcon {...props} iconComponent={Icon} />
		);
	}
});

/**
 * Moonstone-specific behaviors to apply to `ToggleIconBase`.
 *
 * @hoc
 * @memberof moonstone/ToggleIcon
 * @mixes moonstone/Skinnable.Skinnable
 * @public
 */
const ToggleIconDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A customizable Moonstone starting point {@link moonstone/Icon.Icon|Icon} that responds to the
 * `selected` prop.
 *
 * @class ToggleIcon
 * @memberof moonstone/ToggleIcon
 * @extends moonstone/ToggleIcon.ToggleIconBase
 * @mixes moonstone/ToggleIcon.ToggleIconDecorator
 * @ui
 * @public
 */
const ToggleIcon = ToggleIconDecorator(ToggleIconBase);

export default ToggleIcon;
export {
	ToggleIcon,
	ToggleIconBase,
	ToggleIconDecorator
};
