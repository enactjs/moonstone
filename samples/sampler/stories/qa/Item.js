import Icon from '@enact/moonstone/Icon';
import Item from '@enact/moonstone/Item';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

import icons from '../helper/icons';

const iconNames = ['', ...icons];

const inputData = {
	longText : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	extraSpaceText : 'This                                                             text                                                                          has                                                                                        extra                                                                         spaces',
	tallText : ['नरेंद्र मोदी', 'ฟิ้ ไั ஒ து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'صباح الخير'],
	disabledText : 'This text is disabled',
	normalText : 'Item with text that is spottable'
};

Item.displayName = 'Item';
Icon.displayName = 'Icon';

export default {
	title: 'Moonstone/Item',
	component: 'Item'
};

export const WithLongText = (args) => {
	return (
		<Item disabled={args['disabled']}>
			{args['children']}
		</Item>
	);
};

text('children', WithLongText, Item, inputData.longText);
boolean('disabled', WithLongText, Item);

WithLongText.storyName = 'with long text';

export const WithTallText = (args) => {
	return (
		<Item disabled={args['disabled']}>
			{args['value']}
		</Item>
	);
};

boolean('disabled', WithTallText, Item);
select('value', WithTallText, inputData.tallText, Item, inputData.tallText[2]);

WithTallText.storyName = 'with tall characters';

export const WithExtraSpaces = (args) => {
	return (
		<Item disabled={args['disabled']}>
			{args['children']}
		</Item>
	);
};

text('children', WithExtraSpaces, Item, inputData.extraSpaceText);
boolean('disabled', WithExtraSpaces, Item);

WithExtraSpaces.storyName = 'with extra spaces';

export const SpotabilityTest = (args) => {
	return (
		<div>
			<Item>
				{args['Spottable Text']}
			</Item>
			<Item disabled>
				{args['Disabled Text']}
			</Item>
			<Item>
				<Icon size={args['size']}>
					{args['iconBefore']}
				</Icon>
				{args['Text with iconBefore']}
			</Item>
			<Item>
				{args['Text with iconAfter']}
				<Icon size={args['size']}>
					{args['iconAfter']}
				</Icon>
			</Item>
			<Item>
				<Icon size={args['size']}>gear</Icon>
				<Icon size={args['size']}>minus</Icon>
				<Icon size={args['size']}>trash</Icon>
				<Icon size={args['size']}>flag</Icon>
			</Item>
		</div>
	);
};

text('Spottable Text', SpotabilityTest, Item, inputData.normalText);
text('Disabled Text', SpotabilityTest, Item, inputData.disabledText);
select('iconAfter', SpotabilityTest, iconNames, Item, 'pauseforward');
select('iconBefore', SpotabilityTest, iconNames, Item, 'plus');
select('size', SpotabilityTest, ['small', 'large'], Item, 'large');
text('Text with iconAfter', SpotabilityTest, Item, 'Item with text that is spottable with an icon(at the end of the string)');
text('Text with iconBefore', SpotabilityTest, Item, 'Item with text that is spottable with an icon(at the start of the string)');

SpotabilityTest.storyName = 'sample for spotability test';
