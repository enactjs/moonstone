// import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
// import {storiesOf} from '@storybook/react';
//
// import Icon from '@enact/moonstone/Icon';
// import Item from '@enact/moonstone/Item';
//
// import icons from '../helper/icons';
//
// const iconNames = ['', ...icons];
//
// const inputData = {
// 	longText : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
// 	extraSpaceText : 'This                                                             text                                                                          has                                                                                        extra                                                                         spaces',
// 	tallText : ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'صباح الخير'],
// 	disabledText : 'This text is disabled',
// 	normalText : 'Item with text that is spottable'
// };
//
// Item.displayName = 'Item';
// Icon.displayName = 'Icon';
//
// storiesOf('Item', module)
// 	.add(
// 		'with long text',
// 		() => (
// 			<Item disabled={boolean('disabled', Item)}>
// 				{text('Children', Item, inputData.longText)}
// 			</Item>
// 		)
// 	)
// 	.add(
// 		'with tall characters',
// 		() => (
// 			<Item disabled={boolean('disabled', Item)}>
// 				{select('value', inputData.tallText, Item, inputData.tallText[2])}
// 			</Item>
// 		)
// 	)
// 	.add(
// 		'with extra spaces',
// 		() => (
// 			<Item disabled={boolean('disabled', Item)}>
// 				{text('Children', Item, inputData.extraSpaceText)}
// 			</Item>
// 		)
// 	)
// 	.add(
// 		'sample for spotability test',
// 		() => (
// 			<div>
// 				<Item>
// 					{text('Spottable Text', Item, inputData.normalText)}
// 				</Item>
// 				<Item disabled>
// 					{text('Disabled Text', Item, inputData.disabledText)}
// 				</Item>
// 				<Item>
// 					<Icon size={select('size', ['small', 'large'], Item, 'large')}>
// 						{select('iconBefore', iconNames, Item, 'plus')}
// 					</Icon>
// 					{text('Text with iconBefore', Item, 'Item with text that is spottable with an icon (at the start of the string)')}
// 				</Item>
// 				<Item>
// 					{text('Text with iconAfter', Item, 'Item with text that is spottable with an icon(at the end of the string)')}
// 					<Icon size={select('size', ['small', 'large'], Item, 'large')}>
// 						{select('iconAfter', iconNames, Item, 'pauseforward')}
// 					</Icon>
// 				</Item>
// 				<Item>
// 					<Icon size={select('size', ['small', 'large'], Item, 'large')}>gear</Icon>
// 					<Icon size={select('size', ['small', 'large'], Item, 'large')}>minus</Icon>
// 					<Icon size={select('size', ['small', 'large'], Item, 'large')}>trash</Icon>
// 					<Icon size={select('size', ['small', 'large'], Item, 'large')}>flag</Icon>
// 				</Item>
// 			</div>
// 		)
// 	);
