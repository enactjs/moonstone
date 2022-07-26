import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import Spinner from '@enact/moonstone/Spinner';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

Spinner.displayName = 'Spinner';

// Set up some defaults for info and knobs
const
	prop = {
		longText:'SpinnerWithLongText SpinnerWithLongText SpinnerWithLongText'
	};

const FocusOnSpinner = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleDeactivate = useCallback(() => setIsLoading(true), []);

	const hideSpinner = useCallback(() => setIsLoading(false), []);

	return (
		<div>
			<ol>
				<li>Focus and Click on the Input field.</li>
				<li>Click Enter key on the VKB.</li>
			</ol>
			<Input dismissOnEnter onDeactivate={handleDeactivate} />
			{isLoading ? <Spinner blockClickOn="screen" onClick={hideSpinner} /> : null}
		</div>
	);
};

export default {
	title: 'Moonstone/Spinner',
	component: 'Spinner'
};

export const WithLongContent = (args) => {
	return (
		<div>
			<div
				style={{
					height: ri.unit(420, 'rem'),
					border: ri.unit(3, 'rem') + ' dotted red'
				}}
			>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Button onClick={action('Inside Button events')}>Button</Button>
				<Spinner
					blockClickOn={args['blockClickOn']}
					centered={args['centered']}
					scrim={args['scrim']}
					transparent={args['transparent']}
				>
					{args['content']}
				</Spinner>
			</div>
			<Button onClick={action('Outside Button events')}>Button</Button>
		</div>
	);
};

select('blockClickOn', WithLongContent, [null, 'container', 'screen'], Spinner);
boolean('centered', WithLongContent, Spinner, false);
text('content', WithLongContent, Spinner, prop.longText);
boolean('scrim', WithLongContent, Spinner, false);
boolean('transparent', WithLongContent, Spinner, false);

WithLongContent.storyName = 'with long content';

export const BlockingClickEvents = (args) => {
	return (
		<div>
			<div
				style={{
					height: ri.unit(420, 'rem'),
					border: ri.unit(3, 'rem') + ' dotted red'
				}}
			>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Button onClick={action('Inside Button events')}>Button</Button>
				<Spinner
					blockClickOn={args['blockClickOn']}
					centered={args['centered']}
					scrim={args['scrim']}
					transparent={args['transparent']}
				>
					{args['content']}
				</Spinner>
			</div>
			<Button onClick={action('Outside Button events')}>Button</Button>
		</div>
	);
};

select('blockClickOn', BlockingClickEvents, [null, 'container', 'screen'], Spinner);
boolean('centered', BlockingClickEvents, Spinner, false);
text('content', BlockingClickEvents, Spinner);
boolean('scrim', BlockingClickEvents, Spinner, false);
boolean('transparent', BlockingClickEvents, Spinner, false);

BlockingClickEvents.storyName = 'blocking click events';

export const WithInput = () => {
	return (
		<FocusOnSpinner />
	);
};

WithInput.storyName = 'with input';
WithInput.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
