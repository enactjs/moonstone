import IconButton from '@enact/moonstone/IconButton';
import {ScrollableBase as UiScrollableBase} from '@enact/moonstone/internal/Scrollable';
import Item from '@enact/moonstone/Item';
import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';
import SwitchItem from '@enact/moonstone/SwitchItem';
import VirtualList, {VirtualListBase} from '@enact/moonstone/VirtualList';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import {VirtualListBase as UiVirtualListBase} from '@enact/moonstone/internal/VirtualList';
import {storiesOf} from '@storybook/react';
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
		'&quot;noAnimation&quot;': 'noAnimation'
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
		items.push({item :'Item ' + (headingZeros + i).slice(-itemNumberDigits), selected: false});
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
		<ActivityPanels className={className} index={index} onSelectBreadcrumb={handleSelectBreadcrumb} noCloseButton>
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
				<Header type="compact" title={`${title} Panel 1`} key="header" />
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

storiesOf('VirtualList', module)
	.add(
		'horizontal scroll in Scroller',
		() => {
			const listProps = {
				dataSize: updateDataSize(number('dataSize', Config, defaultDataSize)),
				direction: 'horizontal',
				focusableScrollbar: boolean('focusableScrollbar', Config),
				horizontalScrollbar: select('horizontalScrollbar', prop.scrollbarOption, Config),
				itemRenderer: renderItem(Item, ri.scale(number('itemSize', Config, 72)), false),
				itemSize: ri.scale(number('itemSize', Config, 72)),
				noScrollByWheel: boolean('noScrollByWheel', Config),
				onKeyDown: action('onKeyDown'),
				onScrollStart: action('onScrollStart'),
				onScrollStop: action('onScrollStop'),
				spacing: ri.scale(number('spacing', Config)),
				style: listStyle,
				verticalScrollbar: select('verticalScrollbar', prop.scrollbarOption, Config),
				wrap: wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]
			};

			return (
				<Scroller >
					<VirtualList {...listProps} key="1" />
					<VirtualList {...listProps} key="2" />
					<VirtualList {...listProps} key="3" />
				</Scroller>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'with more items',
		() => {
			return (
				<VirtualList
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					focusableScrollbar={boolean('focusableScrollbar', Config)}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					itemRenderer={renderItem(StatefulSwitchItem, ri.scale(number('itemSize', Config, 72)), true)}
					itemSize={ri.scale(number('itemSize', Config, 72))}
					noScrollByWheel={boolean('noScrollByWheel', Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					spacing={ri.scale(number('spacing', Config))}
					spotlightDisabled={boolean('spotlightDisabled', Config, false)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'with small item min size and large item size',
		() => {
			return (
				<VirtualList
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSizeForSmallMinLargeSize))}
					direction="horizontal"
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					itemRenderer={renderItem(Item, ri.scale(number('size', Config, defaultItemSize)), false)}
					itemSize={updateItemSize({
						minSize: ri.scale(number('minSize', Config, defaultMinItemSize)),
						dataSize: number('dataSize', Config, defaultDataSizeForSmallMinLargeSize),
						size: ri.scale(number('size', Config, defaultItemSize))
					})}
					spacing={ri.scale(number('spacing', Config))}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'in Panels',
		context => {
			context.noPanels = true;
			const title = `${context.kind} ${context.story}`.trim();
			return (
				<InPanels
					title={title}
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					focusableScrollbar={boolean('focusableScrollbar', Config)}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					itemSize={ri.scale(number('itemSize', Config, 72))}
					noScrollByWheel={boolean('noScrollByWheel', Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					spacing={ri.scale(number('spacing', Config))}
					spotlightDisabled={boolean('spotlightDisabled', Config, false)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
			);
		}
	)
	.add(
		'scrolling to 0 whenever dataSize changes',
		() => {
			return (
				<VirtualListWithCBScrollTo
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					itemRenderer={renderItem(StatefulSwitchItem, ri.scale(number('itemSize', Config, 72)), true)}
					itemSize={ri.scale(number('itemSize', Config, 72))}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'overscrollEffectOn',
		() => {
			return (
				<VirtualList
					overscrollEffectOn={{
						arrowKey: false,
						drag: false,
						pageKey: true,
						scrollbarButton: false,
						wheel: false
					}}
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					focusableScrollbar={boolean('focusableScrollbar', Config)}
					itemRenderer={renderItem(StatefulSwitchItem, ri.scale(number('itemSize', Config, 72)), true)}
					itemSize={ri.scale(number('itemSize', Config, 72))}
				/>
			);
		},
		{propTables: [Config]}
	)
	.add(
		'with container items have spottable controls',
		() => {
			return (
				<VirtualList
					dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
					focusableScrollbar={boolean('focusableScrollbar', Config)}
					itemRenderer={renderItem(ContainerItemWithControls, ri.scale(number('itemSize', Config, 78)), true)}
					itemSize={ri.scale(number('itemSize', Config, 78))}
					wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
				/>
			);
		},
		{propTables: [Config]}
	);
