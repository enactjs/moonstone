import {GridListImageItem} from '@enact/moonstone/GridListImageItem';
import {VirtualGridList, VirtualListBase} from '@enact/moonstone/VirtualList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {ScrollableBase as UiScrollableBase} from '@enact/ui/Scrollable';
import {VirtualListBase as UiVirtualListBase} from '@enact/ui/VirtualList';

import {svgGenerator} from "../helper/svg";


const
	defaultDataSize = 1000,
	items = [],
	longContent = 'Lorem ipsum dolor sit amet',
	prop = {
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {source, subText, text} = items[index];

		return (
			<GridListImageItem
				{...rest}
				caption={text}
				source={source}
				subCaption={subText}
			/>
		);
	},
	shouldAddLongContent = ({index, modIndex}) => (
		index % modIndex === 0 ? ` ${longContent}` : ''
	);


const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			count = (headingZeros + i).slice(-itemNumberDigits),
			source = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`),
			subText = `SubItem ${count}${shouldAddLongContent({index: i, modIndex: 3})}`,
			text = `Item ${count}${shouldAddLongContent({index: i, modIndex: 2})}`;

		items.push({source, subText, text});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

VirtualGridList.displayName = 'VirtualGridList';
const VirtualGridListConfig = mergeComponentMetadata(
	'VirtualGridList',
	UiScrollableBase,
	UiVirtualListBase,
	VirtualListBase
);

export default {
	title: 'Moonstone/VirtualList.VirtualGridList',
	component: 'VirtualGridList'
};

export const _VirtualGridList = (args) => (
	<VirtualGridList
		dataSize={updateDataSize(args['dataSize'])}
		direction={args['direction']}
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		itemRenderer={renderItem}
		itemSize={{
			minWidth: ri.scale(args['minWidth']),
			minHeight: ri.scale(args['minHeight'])
		}}
		noScrollByWheel={args['noScrollByWheel']}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spacing={ri.scale(args['spacing'])}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
		wrap={wrapOption[args['wrap']]}
	/>
);

boolean('focusableScrollbar', _VirtualGridList, VirtualGridListConfig);
boolean('noScrollByWheel', _VirtualGridList, VirtualGridListConfig);
boolean('spotlightDisabled', _VirtualGridList, VirtualGridListConfig, false);
number('dataSize', _VirtualGridList, VirtualGridListConfig, defaultDataSize);
number('minHeight', _VirtualGridList, VirtualGridListConfig, 270);
number('minWidth', _VirtualGridList, VirtualGridListConfig, 180);
number('spacing', _VirtualGridList, VirtualGridListConfig, 20);
select('direction', _VirtualGridList, prop.direction, VirtualGridListConfig);
select('horizontalScrollbar', _VirtualGridList, prop.scrollbarOption, VirtualGridListConfig);
select('verticalScrollbar', _VirtualGridList, prop.scrollbarOption, VirtualGridListConfig);
select('wrap', _VirtualGridList, ['false', 'true', '"noAnimation"'], VirtualGridListConfig);

_VirtualGridList.storyName = 'VirtualList.VirtualGridList';
_VirtualGridList.parameters = {
	info: {
		text: 'Basic usage of VirtualGridList'
	}
};
