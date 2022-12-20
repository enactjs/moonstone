import IconButton from '@enact/moonstone/IconButton';
import Item from '@enact/moonstone/Item';
import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';
import SwitchItem from '@enact/moonstone/SwitchItem';
import VirtualList, {VirtualListBase} from '@enact/moonstone/VirtualList';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

const Config = mergeComponentMetadata('VirtualList', UiVirtualListBase, UiScrollableBase, VirtualListBase);

const
	itemStyle = {
		boxSizing: 'border-box',
		display: 'flex'
	},
	listStyle = {
		height: '200px'
	},
	borderStyle = ri.unit(3, 'rem') + ' solid #202328',
	items = [],
	defaultDataSize = 1000,
	defaultDataSizeForSmallMinLargeSize = 5,
	defaultItemSize = 500,
	defaultMinItemSize = 100,
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	wrapOption = {
		false: false,
		true: true,
		'"noAnimation"': 'noAnimation'
	},
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (ItemComponent, size, vertical, onClick) => ({index, ...rest}) => {
		const style = {
			...(
				vertical ?
					{borderBottom: borderStyle, height: size + 'px'} :
					{borderRight: borderStyle, height: '100%', width: size + 'px', writingMode: 'vertical-lr'}
			),
			...itemStyle
		};
		return (
			<ItemComponent index={index} style={style} onClick={onClick} {...rest}>
				{items[index].item}
			</ItemComponent>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push({item: 'Item ' + (headingZeros + i).slice(-itemNumberDigits), selected: false});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const updateItemSize = ({minSize, dataSize, size}) => ({minSize, size: new Array(dataSize).fill(size)});

const StatefulSwitchItem = ({index, ...props}) => {
	const [selected, setSelected] = useState(items[index].selected);

	useEffect(() => {
		setSelected(items[index].selected);
	}, [index]);

	const onToggle = useCallback(() => {
		items[index].selected = !items[index].selected;
		setSelected(!selected);
	}, [index, selected]);

	return (
		<SwitchItem {...props} onToggle={onToggle} selected={selected}>
			{props.children}
		</SwitchItem>
	);
};

StatefulSwitchItem.propTypes = {
	index: PropTypes.number
};

const ContainerItemWithControls = SpotlightContainerDecorator(({children, index, style, ...rest}) => {
	const itemHeight = ri.scaleToRem(78);
	const containerStyle = {...style, display: 'flex', width: '100%', height: itemHeight};
	const textStyle = {flex: '1 1 100%', lineHeight: itemHeight};
	const IconStyle = {flex: '0 0 auto', marginTop: ri.scaleToRem(9)};
	return (
		<div {...rest} style={containerStyle}>
			<div style={textStyle}>
				{children}
			</div>
			<IconButton data-index={index} style={IconStyle}>
				{'list'}
			</IconButton>
			<IconButton data-index={index} style={IconStyle}>
				{'star'}
			</IconButton>
			<IconButton data-index={index} style={IconStyle}>
				{'home'}
			</IconButton>
		</div>
	);
});

// eslint-disable-next-line enact/prop-types
const InPanels = ({className, title, ...rest}) => {
	const [index, setIndex] = useState(0);
	const handleSelectBreadcrumb = useCallback((ev) => {
		setIndex(ev.index);
	}, []);

	const handleSelectItem = useCallback(() => {
		setIndex(index === 0 ? 1 : 0);
	}, [index]);

	return (
		<ActivityPanels className={className} index={index} noCloseButton onSelectBreadcrumb={handleSelectBreadcrumb}>
			<Panel>
				<Header type="compact" title={`${title} Panel 0`} key="header" />
				<VirtualList
					id="spotlight-list"
					// eslint-disable-next-line enact/prop-types
					itemRenderer={renderItem(Item, rest.itemSize, true, handleSelectItem)}
					spotlightId="virtual-list"
					{...rest}
				/>
			</Panel>
			<Panel title={`${title} Panel 1`}>
				<Header key="header" title={`${title} Panel 1`} type="compact" />
				<Item onClick={handleSelectItem}>Go Back</Item>
			</Panel>
		</ActivityPanels>
	);
};

const VirtualListWithCBScrollTo = ({dataSize, ...props}) => {
	const scrollTo = useRef();

	useEffect(() => {
		scrollTo.current({animate: false, focus: false, index: 0});
	}, [dataSize]);

	const getScrollTo = useCallback((newScrollTo) => {
		scrollTo.current = newScrollTo;
	}, []);

	return (
		<VirtualList
			{...props}
			cbScrollTo={getScrollTo}
			dataSize={dataSize}
		/>
	);
};

VirtualListWithCBScrollTo.propTypes = {
	dataSize: PropTypes.number
};

export default {
	title: 'Moonstone/VirtualList',
	component: 'VirtualList'
};

export const HorizontalScrollInScroller = (args) => {
	const listProps = {
		dataSize: updateDataSize(args['dataSize']),
		direction: 'horizontal',
		focusableScrollbar: args['focusableScrollbar'],
		horizontalScrollbar: args['horizontalScrollbar'],
		itemRenderer: renderItem(Item, ri.scale(args['itemSize']), false),
		itemSize: ri.scale(args['itemSize']),
		noScrollByWheel: args['noScrollByWheel'],
		onKeyDown: action('onKeyDown'),
		onScrollStart: action('onScrollStart'),
		onScrollStop: action('onScrollStop'),
		spacing: ri.scale(args['spacing']),
		style: listStyle,
		verticalScrollbar: args['verticalScrollbar'],
		wrap: [args['wrap']]
	};

	return (
		<Scroller >
			<VirtualList {...listProps} key="1" />
			<VirtualList {...listProps} key="2" />
			<VirtualList {...listProps} key="3" />
		</Scroller>
	);
};

boolean('focusableScrollbar', HorizontalScrollInScroller, Config);
boolean('noScrollByWheel', HorizontalScrollInScroller, Config);
number('dataSize', HorizontalScrollInScroller, Config, defaultDataSize);
number('itemSize', HorizontalScrollInScroller, Config, 72);
number('spacing', HorizontalScrollInScroller, Config);
select('horizontalScrollbar', HorizontalScrollInScroller, prop.scrollbarOption, Config);
select('verticalScrollbar', HorizontalScrollInScroller, prop.scrollbarOption, Config);
select('wrap', HorizontalScrollInScroller, wrapOption, Config);

HorizontalScrollInScroller.storyName = 'horizontal scroll in Scroller';
HorizontalScrollInScroller.parameters = {
	propTables: [Config]
};

export const WithMoreItems = (args) => {
	return (
		<VirtualList
			dataSize={updateDataSize(args['dataSize'])}
			focusableScrollbar={args['focusableScrollbar']}
			horizontalScrollbar={args['horizontalScrollbar']}
			itemRenderer={renderItem(StatefulSwitchItem, ri.scale(args['itemSize']), true)}
			itemSize={ri.scale(args['itemSize'])}
			noScrollByWheel={args['noScrollByWheel']}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={args['verticalScrollbar']}
			wrap={args['wrap']}
		/>
	);
};

boolean('focusableScrollbar', WithMoreItems, Config);
boolean('noScrollByWheel', WithMoreItems, Config);
boolean('spotlightDisabled', WithMoreItems, Config, false);
number('dataSize', WithMoreItems, Config, defaultDataSize);
select('horizontalScrollbar', WithMoreItems, prop.scrollbarOption, Config);
select('verticalScrollbar', WithMoreItems, prop.scrollbarOption, Config);
number('itemSize', WithMoreItems, Config, 72);
number('spacing', WithMoreItems, Config);
select('wrap', WithMoreItems, wrapOption, Config);

WithMoreItems.storyName = 'with more items';
WithMoreItems.parameters = {
	propTables: [Config]
};

export const WithSmallItemMinSizeAndLargeItemSize = (args) => {
	return (
		<VirtualList
			dataSize={updateDataSize(args['dataSize'])}
			direction="horizontal"
			horizontalScrollbar={args['horizontalScrollbar']}
			itemRenderer={renderItem(Item, ri.scale(args['size']), false)}
			itemSize={updateItemSize({
				minSize: ri.scale(args['minSize']),
				dataSize: args['dataSize'],
				size: ri.scale(args['size'])
			})}
			spacing={ri.scale(args['spacing'])}
		/>
	);
};

number('dataSize', WithSmallItemMinSizeAndLargeItemSize, Config, defaultDataSizeForSmallMinLargeSize);
number('minSize', WithSmallItemMinSizeAndLargeItemSize, Config, defaultMinItemSize);
number('size', WithSmallItemMinSizeAndLargeItemSize, Config, defaultItemSize);
number('spacing', WithSmallItemMinSizeAndLargeItemSize, Config);
select('horizontalScrollbar', WithSmallItemMinSizeAndLargeItemSize, prop.scrollbarOption, Config);

WithSmallItemMinSizeAndLargeItemSize.storyName = 'with small item min size and large item size';
WithSmallItemMinSizeAndLargeItemSize.parameters = {
	propTables: [Config]
};

export const _InPanels = (args, context) => {
	context.noPanels = true;
	const title = `${context.kind} ${context.story}`.trim();
	return (
		<InPanels
			dataSize={updateDataSize(args['dataSize'])}
			focusableScrollbar={args['focusableScrollbar']}
			horizontalScrollbar={args['horizontalScrollbar']}
			itemSize={ri.scale(args['itemSize'])}
			noScrollByWheel={args['noScrollByWheel']}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			spacing={ri.scale(args['spacing'])}
			spotlightDisabled={args['spotlightDisabled']}
			title={title}
			verticalScrollbar={args['verticalScrollbar']}
			wrap={args['wrap']}
		/>
	);
};

boolean('focusableScrollbar', _InPanels, Config);
boolean('noScrollByWheel', _InPanels, Config);
boolean('spotlightDisabled', _InPanels, Config, false);
number('dataSize', _InPanels, Config, defaultDataSize);
number('itemSize', _InPanels, Config, 72);
number('spacing', _InPanels, Config);
select('horizontalScrollbar', _InPanels, prop.scrollbarOption, Config);
select('verticalScrollbar', _InPanels, prop.scrollbarOption, Config);
select('wrap', _InPanels, wrapOption, Config);

_InPanels.storyName = 'in Panels';
_InPanels.parameters = {
	props: {
		noPanels: true
	}
};

export const ScrollingTo0WheneverDataSizeChanges = (args) => {
	return (
		<VirtualListWithCBScrollTo
			dataSize={updateDataSize(args['dataSize'])}
			itemRenderer={renderItem(StatefulSwitchItem, ri.scale(args['itemSize']), true)}
			itemSize={ri.scale(args['itemSize'])}
		/>
	);
};

number('dataSize', ScrollingTo0WheneverDataSizeChanges, Config, defaultDataSize);
number('itemSize', ScrollingTo0WheneverDataSizeChanges, Config, 72);

ScrollingTo0WheneverDataSizeChanges.storyName = 'scrolling to 0 whenever dataSize changes';
ScrollingTo0WheneverDataSizeChanges.parameters = {
	propTables: [Config]
};

export const OverscrollEffectOn = (args) => {
	return (
		<VirtualList
			dataSize={updateDataSize(args['dataSize'])}
			focusableScrollbar={args['focusableScrollbar']}
			itemRenderer={renderItem(StatefulSwitchItem, ri.scale(args['itemSize']), true)}
			itemSize={ri.scale(args['itemSize'])}
			overscrollEffectOn={{
				arrowKey: false,
				drag: false,
				pageKey: true,
				scrollbarButton: false,
				wheel: false
			}}
		/>
	);
};

boolean('focusableScrollbar', OverscrollEffectOn, Config);
number('dataSize', OverscrollEffectOn, Config, defaultDataSize);
number('itemSize', OverscrollEffectOn, Config, 72);

OverscrollEffectOn.storyName = 'overscrollEffectOn';
OverscrollEffectOn.parameters = {
	propTables: [Config]
};

export const WithContainerItemsHaveSpottableControls = (args) => {
	return (
		<VirtualList
			dataSize={updateDataSize(args['dataSize'])}
			focusableScrollbar={args['focusableScrollbar']}
			itemRenderer={renderItem(ContainerItemWithControls, ri.scale(args['itemSize']), true)}
			itemSize={ri.scale(args['itemSize'])}
			wrap={args['wrap']}
		/>
	);
};

boolean('focusableScrollbar', WithContainerItemsHaveSpottableControls, Config);
number('dataSize', WithContainerItemsHaveSpottableControls, Config, defaultDataSize);
number('itemSize', WithContainerItemsHaveSpottableControls, Config, 78);
select('wrap', WithContainerItemsHaveSpottableControls, wrapOption, Config);

WithContainerItemsHaveSpottableControls.storyName = 'with container items have spottable controls';
WithContainerItemsHaveSpottableControls.parameters = {
	propTables: [Config]
};
