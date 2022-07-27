import DaySelector, {DaySelectorBase} from '@enact/moonstone/DaySelector';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

DaySelector.displayName = 'DaySelector';
const Config = mergeComponentMetadata('DaySelector', DaySelectorBase, DaySelector);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	dayNameLength: 'long',
	disabled: false
};

export default {
	title: 'Moonstone/DaySelector',
	component: 'DaySelector'
};

export const _DaySelector = (args) => (
	<DaySelector
		dayNameLength={args['dayNameLength']}
		disabled={args['disabled']}
		onSelect={action('onSelect')}
	/>
);

boolean('disabled', _DaySelector, Config);
select('dayNameLength', _DaySelector, ['short', 'medium', 'long', 'full'], Config);

_DaySelector.storyName = 'DaySelector';
_DaySelector.parameters = {
	info: {
		text: 'Basic usage of DaySelector'
	}
};
