import ProgressBar, {ProgressBarBase} from '@enact/moonstone/ProgressBar';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';

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

range('backgroundProgress', BasicProgressBar, Config, {max: 1, min: 0, step: 0.01}, 0.5);
boolean('disabled', BasicProgressBar, Config, false);
boolean('highlighted', BasicProgressBar, Config, false);
select('orientation', BasicProgressBar, ['horizontal', 'vertical'], Config, 'horizontal');
range('progress', BasicProgressBar, Config, {range: true, min: 0, max: 1, step: 0.01}, 0.4);
boolean('tooltip', BasicProgressBar, Config, false);

BasicProgressBar.storyName = 'The basic ProgressBar';
BasicProgressBar.parameters = {
	propTables: [Config]
};
