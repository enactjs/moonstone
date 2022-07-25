import Spinner, {SpinnerBase} from '@enact/moonstone/Spinner';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import UiSpinner, {SpinnerBase as UiSpinnerBase} from '@enact/ui/Spinner';

Spinner.displayName = 'Spinner';
const Config = mergeComponentMetadata(
	'Spinner',
	Spinner,
	SpinnerBase,
	UiSpinner,
	UiSpinnerBase,
);

export default {
	title: 'Moonstone/Spinner',
	component: 'Spinner'
};

export const _Spinner = (args) => (
	<div
		style={{
			backgroundColor: 'rgba(0, 187, 187, 0.5)',
			outline: 'teal dashed 1px',
			padding: ri.unit(90, 'rem'),
			position: 'relative'
		}}
	>
		<div
			style={{
				left: 0,
				height: '100%',
				position: 'absolute',
				top: 0,
				width: '100%',
			}}
			onClick={action('Outside container events')}
		/>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<label
				style={{
					backgroundColor: 'rgba(0, 128, 128, 0.5)',
					borderBottomWidth: 0,
					color: '#0bb',
					fontSize: ri.unit(15, 'rem'),
					fontStyle: 'italic',
					fontWeight: 100,
					outline: 'teal dashed 1px',
					padding: '0.1em 1em',
					position: 'absolute',
					transform: 'translateY(-100%)',
				}}
			>Container</label>
			<div
				style={{
					height: '100%',
					position: 'absolute',
					width: '100%'
				}}
				onClick={action('Inside container events')}
			/>
			<Spinner
				blockClickOn={args['blockClickOn']}
				centered={args['centered']}
				paused={args['paused']}
				scrim={args['scrim']}
				size={args['size']}
				transparent={args['transparent']}
			>
				{args['content']}
			</Spinner>
		</div>
	</div>
);


boolean('centered', _Spinner, Config);
boolean('paused', _Spinner, Config);
boolean('scrim', _Spinner, Config);
boolean('transparent', _Spinner, Config);
select('blockClickOn', _Spinner, [null, 'container', 'screen'], Config);
select('size', _Spinner, [null, 'medium', 'small'], Config);
text('content', _Spinner, Config, '');

_Spinner.storyName = 'Spinner';
_Spinner.parameters = {
	info: {
		text: 'Basic usage of Spinner'
	}
};
