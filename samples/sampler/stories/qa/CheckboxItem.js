import CheckboxItem from '@enact/moonstone/CheckboxItem';
import Item, {ItemBase} from '@enact/moonstone/Item';
import ToggleItem from '@enact/moonstone/ToggleItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Group from '@enact/ui/Group';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';

const Config = mergeComponentMetadata('CheckboxItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, CheckboxItem);

const prop = {
	iconPosition: ['before', 'after'],
	longText : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	tallText : ['नरेंद्र मोदी', 'ฟิ้ ไั ஒ து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'],
	extraSpaceText : 'This		Text 		has			extra 		space',
	rtlText: 'هناك حقيقة مثبتة منذ زمن طويل وهي'
};

export default {
	title: 'Moonstone/CheckboxItem',
	component: 'CheckboxItem'
};

export const WithLongText = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		iconPosition={args['iconPosition']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithLongText, Config, false);
select('iconPosition', WithLongText, prop.iconPosition, Config, prop.tallText[0]);
boolean('inline', WithLongText, Config);
text('children', WithLongText, Config, prop.longText);

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		iconPosition={args['iconPosition']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithTallCharacters, Config, false);
select('iconPosition', WithTallCharacters, prop.iconPosition, Config, prop.tallText[0]);
boolean('inline', WithTallCharacters, Config);
select('children', WithTallCharacters, prop.tallText, Config, prop.tallText[0]);

WithTallCharacters.storyName = 'with tall characters';

export const WithExtraSpacing = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		iconPosition={args['iconPosition']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithExtraSpacing, Config, false);
select('iconPosition', WithExtraSpacing, prop.iconPosition, Config, prop.tallText[0]);
boolean('inline', WithExtraSpacing, Config);
text('children', WithExtraSpacing, Config, prop.extraSpaceText);

WithExtraSpacing.storyName = 'with extra spacing';

export const WithRightToLeftText = (args) => (
	<CheckboxItem
		disabled={args['disabled']}
		iconPosition={args['iconPosition']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxItem>
);

boolean('disabled', WithRightToLeftText, Config, false);
select('iconPosition', WithRightToLeftText, prop.iconPosition, Config, prop.tallText[0]);
boolean('inline', WithRightToLeftText, Config);
text('children', WithRightToLeftText, Config, prop.rtlText);

WithRightToLeftText.storyName = 'with right to left text';

export const Grouped = (args) => (
	<Group
		childComponent={CheckboxItem}
		childSelect="onToggle"
		defaultSelected={0}
		itemProps={{
			inline: args['itemProps-inline']
		}}
		onSelect={action('onSelect')}
		select={args['select']}
		selectedProp="selected"
	>
		{['Checkbox Item 1', 'Checkbox Item 2', 'Checkbox Item 3']}
	</Group>
);

boolean('itemProps-inline', Grouped, Config, false);
select('select', Grouped, ['single', 'radio', 'multiple'], Group, 'multiple');

Grouped.storyName = 'grouped';
