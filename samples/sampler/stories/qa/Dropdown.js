import Button, {ButtonBase} from '@enact/moonstone/Button';
import Dropdown, {DropdownBase} from '@enact/moonstone/Dropdown';
import Heading from '@enact/moonstone/Heading';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {useCallback, useState} from 'react';

const Config = mergeComponentMetadata('Dropdown', UIButtonBase, UIButton, ButtonBase, Button, DropdownBase, Dropdown);
const items = (itemCount, optionText = 'Option') => (new Array(itemCount)).fill().map((i, index) => `${optionText} ${index + 1}`);

Dropdown.displayName = 'Dropdown';

const list = [
	{children: 'hello 1', 'key': 'key1', 'aria-label': 'aria 1'},
	{children: 'hello 2', 'key': 'key2', 'aria-label': 'aria 2', disabled: true},
	{children: 'hello 3', 'key': 'key3', 'aria-label': 'aria 3'}
];

const AutoDismissDropdown = () => {
	const [open, setOpen] = useState(true);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<div>
			<Heading>Click in the blank area of the viewport to dismiss the Dropdown</Heading>
			<Dropdown
				onClose={handleClose}
				open={open} // initial value is true
			>
				{['test1', 'test2', 'test3']}
			</Dropdown>
		</div>
	);
};

export default {
	title: 'Moonstone/Dropdown',
	component: 'Dropdown'
};

export const With2OptionsForTestingDirection = (args) => (
	<Dropdown
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		size={args['size']}
		style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
		title={args['title']}
		width={args['width']}
	>
		{['Option 1', 'Option 2']}
	</Dropdown>
);

select('direction', With2OptionsForTestingDirection, ['up', 'down'], Config);
boolean('disabled', With2OptionsForTestingDirection, Config);
select('size', With2OptionsForTestingDirection, ['small', 'large'], Config);
text('title', With2OptionsForTestingDirection, Config, 'Dropdown');
select('width', With2OptionsForTestingDirection, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

With2OptionsForTestingDirection.storyName = 'with 2 options for testing direction';

export const WithDefaultSelectedIn20Options = (args) => (
	<Dropdown
		defaultSelected={10}
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		size={args['size']}
		title={args['title']}
		width={args['width']}
	>
		{items(30)}
	</Dropdown>
);

select('direction', WithDefaultSelectedIn20Options, ['up', 'down'], Config);
boolean('disabled', WithDefaultSelectedIn20Options, Config);
select('size', WithDefaultSelectedIn20Options, ['small', 'large'], Config);
text('title', WithDefaultSelectedIn20Options, Config, 'Dropdown');
select('width', WithDefaultSelectedIn20Options, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithDefaultSelectedIn20Options.storyName = 'with defaultSelected in 20 options';

export const WithLongText = (args) => (
	<Dropdown
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		size={args['size']}
		title={args['title']}
		width={args['width']}
	>
		{items(10, 'Looooooooooooooooooooooong')}
	</Dropdown>
);

select('direction', WithLongText, ['up', 'down'], Config);
boolean('disabled', WithLongText, Config);
select('size', WithLongText, ['small', 'large'], Config);
text('title', WithLongText, Config, 'Dropdown');
select('width', WithLongText, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithLongText.storyName = 'with long text';

export const WithMultipleDropdowns = (args) => (
	<div>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			size={args['size']}
			style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
			title={args['title']}
			width={args['width']}
		>
			{items(5)}
		</Dropdown>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			size={args['size']}
			title={args['title']}
			width={args['width']}
		>
			{items(5)}
		</Dropdown>
	</div>
);

select('direction', WithMultipleDropdowns, ['up', 'down'], Config);
boolean('disabled', WithMultipleDropdowns, Config);
select('size', WithMultipleDropdowns, ['small', 'large'], Config);
text('title', WithMultipleDropdowns, Config, 'Dropdown');
select('width', WithMultipleDropdowns, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithMultipleDropdowns.storyName = 'with multiple dropdowns';

export const WithArrayOfChildrenObjects = (args) => (
	<div>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			size={args['size']}
			style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
			title={args['title']}
			width={args['width']}
		>
			{list}
		</Dropdown>
	</div>
);

select('direction', WithArrayOfChildrenObjects, ['up', 'down'], Config);
boolean('disabled', WithArrayOfChildrenObjects, Config);
select('size', WithArrayOfChildrenObjects, ['small', 'large'], Config);
text('title', WithArrayOfChildrenObjects, Config, 'Dropdown');
select('width', WithArrayOfChildrenObjects, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithArrayOfChildrenObjects.storyName = 'with array of children objects';

export const WithAutoDismiss = () => <AutoDismissDropdown />;

WithAutoDismiss.storyName = 'with auto dismiss';
WithAutoDismiss.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
