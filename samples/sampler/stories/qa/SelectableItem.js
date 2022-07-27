import SelectableItem from '@enact/moonstone/SelectableItem';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Group from '@enact/ui/Group';

SelectableItem.displayName = 'SelectableItem';

const inputData = {
	longText : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	disabledLong : 'Default disabled Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	tallText : ['नरेंद्र मोदी', 'ฟิ้ ไั ஒ து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'],
	extraSpaceText : 'This                        Text                               has                      extra                                space',
	rtlText : 'هناك حقيقة مثبتة منذ زمن طويل وهي',
	normalText : 'Selectable Item'
};

export default {
	title: 'Moonstone/SelectableItem',
	component: 'SelectableItem'
};

export const WithLongText = (args) => (
	<div>
		<SelectableItem
			disabled={args['disabled']}
			inline={args['inline']}
			onToggle={action('onToggle')}
		>
			{args['Long Text']}
		</SelectableItem>
		<SelectableItem
			disabled
			inline={args['inline']}
			onToggle={action('onToggle')}
		>
			{args['Disable Long Text']}
		</SelectableItem>
	</div>
);

boolean('disabled', WithLongText, SelectableItem);
boolean('inline', WithLongText, SelectableItem);
text('Long Text', WithLongText, SelectableItem, inputData.longText);
text('Disable Long Text', WithLongText, SelectableItem, inputData.disabledLong);

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<SelectableItem
		disabled={args['disabled']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</SelectableItem>
);

boolean('disabled', WithTallCharacters, SelectableItem);
boolean('inline', WithTallCharacters, SelectableItem);
select('children', WithTallCharacters, inputData.tallText, SelectableItem, inputData.tallText[0]);

WithTallCharacters.storyName = 'with tall characters';

export const WithExtraSpacing = (args) => (
	<SelectableItem
		disabled={args['disabled']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['extra space text']}
	</SelectableItem>
);

boolean('disabled', WithExtraSpacing, SelectableItem);
boolean('inline', WithExtraSpacing, SelectableItem);
text('extra space text', WithExtraSpacing, SelectableItem, inputData.extraSpaceText);

WithExtraSpacing.storyName = 'with extra spacing';

export const WithDefaultSelected = (args) => (
	<SelectableItem
		defaultSelected
		disabled={args['disabled']}
		inline={args['inline']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</SelectableItem>
);

boolean('disabled', WithDefaultSelected, SelectableItem);
boolean('inline', WithDefaultSelected, SelectableItem);
text('children', WithDefaultSelected, SelectableItem, inputData.normalText);

WithDefaultSelected.storyName = 'with default selected';

export const Grouped = (args) => (
	<Group
		childComponent={SelectableItem}
		itemProps={{
			inline: args['inline'],
			disabled:  args['disabled']
		}}
		childSelect="onToggle"
		selectedProp="selected"
		disabled={args['disabled']}
		onSelect={action('onSelect')}
	>

		{[
			args['Normal Text 1'],
			args['Normal Text 2'],
			args['Normal Text 3']
		]}
	</Group>
);

boolean('disabled', Grouped, SelectableItem);
boolean('inline', Grouped, SelectableItem);
text('Normal Text 1', Grouped, SelectableItem, inputData.normalText + 1);
text('Normal Text 2', Grouped, SelectableItem, inputData.normalText + 2);
text('Normal Text 3', Grouped, SelectableItem, inputData.normalText + 3);

Grouped.storyName = 'that is grouped';

export const GroupedDisabledItems = () => (
	<Group
		childComponent={SelectableItem}
		childSelect="onToggle"
		selectedProp="selected"
		onSelect={action('onSelect')}
	>
		{[
			{key: 'item1', children: '1', disabled: true},
			{key: 'item2', children: '2', disabled: false},
			{key: 'item3', children: '3', disabled: true},
			{key: 'item4', children: '4', disabled: false}
		]}
	</Group>
);

GroupedDisabledItems.storyName = 'that is grouped with individual disabled items';
GroupedDisabledItems.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
