import ProgressBar, {ProgressBarBase} from '@enact/moonstone/ProgressBar';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';

const Config = mergeComponentMetadata('ProgressBar', ProgressBarBase, ProgressBar);

export default {
	title: 'Moonstone/ProgressBar',
	component: 'ProgressBar'
};

export const BasicProgressBar = (args) => {
	return (
		<ProgressBar
			backgroundProgress={args['backgroundProgress']}
			disabled={args['disabled']}
			highlighted={args['highlighted']}
			orientation={args['orientation']}
			progress={args['progress']}
			tooltip={args['tooltip']}
		/>
	);
};

number('backgroundProgress', BasicProgressBar, Config, 0.5, {range: true, min: 0, max: 1, step: 0.01});
boolean('disabled', BasicProgressBar, Config, false);
boolean('highlighted', BasicProgressBar, Config, false);
select('orientation', BasicProgressBar, ['horizontal', 'vertical'], Config, 'horizontal');
number('progress', BasicProgressBar, Config, 0.4, {range: true, min: 0, max: 1, step: 0.01});
boolean('tooltip', BasicProgressBar, Config, false);

BasicProgressBar.storyName = 'The basic ProgressBar';
BasicProgressBar.parameters = {
	propTables: [Config]
};
