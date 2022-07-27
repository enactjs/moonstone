import Button, {ButtonBase} from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import IconButton from '@enact/moonstone/IconButton';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import iconNames from '../helper/icons';

import css from './Button.module.less';

// Button's prop `minWidth` defaults to true and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean knob and return `void 0` when `true`.
Button.displayName = 'Buttons';
const Config = mergeComponentMetadata('Buttons', UIButtonBase, UIButton, ButtonBase, Button);

// Set up some defaults for info and knobs
const prop = {
	backgroundOpacity: ['', 'translucent', 'lightTranslucent', 'transparent'],
	color: ['', 'red', 'green', 'yellow', 'blue'],
	longText: {'A Loooooooooooooooooong Button': 'A Loooooooooooooooooong Button', 'BUTTON   WITH   EXTRA   SPACES': 'BUTTON   WITH   EXTRA   SPACES'},
	tallText: {'ฟิ้ ไั ஒ து': 'ฟิ้ ไั ஒ து', 'ÁÉÍÓÚÑÜ': 'ÁÉÍÓÚÑÜ', 'Bản văn': 'Bản văn'},
	icons: ['', ...iconNames]
};

export default {
	title: 'Moonstone/Button',
	component: 'Button'
};

export const WithLongText = (args) => (
	<Button
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		icon={args['icon']}
		minWidth={args['minWidth'] ? void 0 : false}
		onClick={action('onClick')}
		selected={args['selected']}
		size={args['size']}
	>
		{args['value']}
	</Button>
);

select('backgroundOpacity', WithLongText, prop.backgroundOpacity, Config);
boolean('disabled', WithLongText, Config);
select('icon', WithLongText, prop.icons, Config);
boolean('minWidth', WithLongText, Config, true);
boolean('selected', WithLongText, Config);
select('size', WithLongText, ['small', 'large'], Config);
select('value', WithLongText, prop.longText, Config, 'A Loooooooooooooooooong Button');

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<Button
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		icon={args['icon']}
		minWidth={args['minWidth'] ? void 0 : false}
		onClick={action('onClick')}
		selected={args['selected']}
		size={args['size']}
	>
		{args['value']}
	</Button>
);

select('backgroundOpacity', WithTallCharacters, prop.backgroundOpacity, Config);
boolean('disabled', WithTallCharacters, Config);
select('icon', WithTallCharacters, prop.icons, Config);
boolean('minWidth', WithTallCharacters, Config, true);
boolean('selected', WithTallCharacters, Config);
select('size', WithTallCharacters, ['small', 'large'], Config);
select('value', WithTallCharacters, prop.tallText, Config, 'ฟิ้ ไั ஒ து');

WithTallCharacters.storyName = 'with tall characters';

export const WithSingleCharacter = (args) => (
	<Button
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		icon={args['icon']}
		minWidth={args['minWidth'] ? void 0 : false}
		onClick={action('onClick')}
		selected={args['selected']}
		size={args['size']}
	>
		{args['value']}
	</Button>
);

select('backgroundOpacity', WithSingleCharacter, prop.backgroundOpacity, Config);
boolean('disabled', WithSingleCharacter, Config);
select('icon', WithSingleCharacter, prop.icons, Config);
boolean('minWidth', WithSingleCharacter, Config, true);
boolean('selected', WithSingleCharacter, Config);
select('size', WithSingleCharacter, ['small', 'large'], Config);
text('value', WithSingleCharacter, Config, 'A');

WithSingleCharacter.storyName = 'to validate minWidth with a single character';

export const WithParent = (args) => (
	<div className={css.bgColor}>
		<Button
			backgroundOpacity={args['backgroundOpacity']}
			disabled={args['disabled']}
			icon={args['icon']}
			minWidth={args['minWidth'] ? void 0 : false}
			onClick={action('onClick')}
			selected={args['selected']}
			size={args['size']}
		>
			Normal Button
		</Button>
	</div>
);

select('backgroundOpacity', WithParent, prop.backgroundOpacity, Config);
boolean('disabled', WithParent, Config);
select('icon', WithParent, prop.icons, Config);
boolean('minWidth', WithParent, Config, true);
boolean('selected', WithParent, Config);
select('size', WithParent, ['small', 'large'], Config);

WithParent.storyName = 'to test if the parent element\'s background causes occlusion';

export const WithTapAreaDisplayed = () => (
	<div>
		<Heading>Button</Heading>
		<Button
			className={css.tapArea}
			disabled={boolean('disabled', Config)}
			onClick={action('onClick')}
			size="large"
		>
			Normal Button
		</Button>
		<Button
			className={css.tapArea}
			disabled={boolean('disabled', Config)}
			onClick={action('onClick')}
			size="small"
		>
			Small Button
		</Button>
		<Heading>IconButton</Heading>
		<IconButton
			className={css.tapArea}
			disabled={boolean('disabled', Config)}
			onClick={action('onClick')}
			size="large"
		>
			star
		</IconButton>
		<IconButton
			className={css.tapArea}
			disabled={boolean('disabled', Config)}
			onClick={action('onClick')}
			size="small"
		>
			star
		</IconButton>
	</div>
);

WithTapAreaDisplayed.storyName = 'with tap area displayed';
WithTapAreaDisplayed.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
