import Item from '@enact/moonstone/Item';
import {ScrollableBaseNative as UiScrollableBaseNative} from '@enact/moonstone/ui/Scrollable/ScrollableNative';
import {VirtualListBaseNative as UiVirtualListBaseNative} from '@enact/moonstone/UiVirtualList';
import {VirtualListNative, VirtualListBase} from '@enact/moonstone/VirtualList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';

const Config = mergeComponentMetadata('VirtualListNative', UiVirtualListBaseNative, UiScrollableBaseNative, VirtualListBase);

const
	items = [],
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	wrapOption = {
		false: false,
		true: true,
		'"noAnimation"': 'noAnimation'
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

export default {
	title: 'Moonstone/VirtualListNative',
	component: 'VirtualListNative'
};

export const WithExtraItems = (args) => (
	<Column>
		<Cell
			component={VirtualListNative}
			dataSize={updateDataSize(args['dataSize'])}
			direction="vertical"
			focusableScrollbar={args['focusableScrollbar']}
			horizontalScrollbar={args['horizontalScrollbar']}
			// eslint-disable-next-line react/jsx-no-bind
			itemRenderer={({index, ...rest}) => {
				return (<Item {...rest}>{items[index]}</Item>);
			}}
			itemSize={ri.scale(args['itemSize'])}
			noScrollByWheel={args['noScrollByWheel']}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled(for all items)']}
			verticalScrollbar={args['verticalScrollbar']}
			wrap={args['wrap']}
		/>
		<Cell shrink component={Item}>extra item1</Cell>
		<Cell shrink component={Item}>extra item2</Cell>
		<Cell shrink component={Item}>extra item3</Cell>
	</Column>
);

boolean('focusableScrollbar', WithExtraItems, Config);
boolean('noScrollByWheel', WithExtraItems, Config);
boolean('spotlightDisabled(for all items)', WithExtraItems, Config, false);
number('dataSize', WithExtraItems, Config, 10);
number('itemSize', WithExtraItems, Config, 60);
number('spacing', WithExtraItems, Config, 20);
select('horizontalScrollbar', WithExtraItems, prop.scrollbarOption, Config);
select('verticalScrollbar', WithExtraItems, prop.scrollbarOption, Config);
select('wrap', WithExtraItems, wrapOption, Config);

WithExtraItems.storyName = 'with extra items';
