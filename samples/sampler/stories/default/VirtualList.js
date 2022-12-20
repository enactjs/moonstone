import {ScrollableBase as UiScrollableBase} from '@enact/moonstone/ui/Scrollable';
import {VirtualListBase as UiVirtualListBase} from '@enact/moonstone/ui/VirtualList';
import Item from '@enact/moonstone/Item';
import VirtualList, {VirtualListBase} from '@enact/moonstone/VirtualList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

const
	defaultDataSize = 1000,
	items = [],
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (size) => ({index, ...rest}) => {
		const itemStyle = {
			borderBottom: ri.unit(3, 'rem') + ' solid #202328',
			boxSizing: 'border-box',
			height: size + 'px'
		};

		return (
			<Item {...rest} style={itemStyle}>
				{items[index]}
			</Item>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push('Item ' + (headingZeros + i).slice(-itemNumberDigits));
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

VirtualList.displayName = 'VirtualList';
const VirtualListConfig = mergeComponentMetadata(
	'VirtualList',
	UiVirtualListBase,
	UiScrollableBase,
	VirtualListBase
);

export default {
	title: 'Moonstone/VirtualList',
	component: 'VirtualList'
};

export const _VirtualList = (args) => {
	return (
		<VirtualList
			dataSize={updateDataSize(args['dataSize'])}
			focusableScrollbar={args['focusableScrollbar']}
			horizontalScrollbar={args['horizontalScrollbar']}
			itemRenderer={renderItem(ri.scale(args['itemSize']))}
			itemSize={ri.scale(args['itemSize'])}
			noScrollByWheel={args['noScrollByWheel']}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={args['verticalScrollbar']}
			wrap={wrapOption[args['wrap']]}
		/>
	);
};

boolean('focusableScrollbar', _VirtualList, VirtualListConfig);
boolean('noScrollByWheel', _VirtualList, VirtualListConfig);
boolean('spotlightDisabled', _VirtualList, VirtualListConfig, false);
number('dataSize', _VirtualList, VirtualListConfig, defaultDataSize);
number('itemSize', _VirtualList, VirtualListConfig, 72);
number('spacing', _VirtualList, VirtualListConfig);
select('horizontalScrollbar', _VirtualList, prop.scrollbarOption, VirtualListConfig);
select('verticalScrollbar', _VirtualList, prop.scrollbarOption, VirtualListConfig);
select('wrap', _VirtualList, ['false', 'true', '"noAnimation"'], VirtualListConfig);

_VirtualList.storyName = 'VirtualList';
_VirtualList.parameters = {
	info: {
		text: 'Basic usage of VirtualList'
	}
};
