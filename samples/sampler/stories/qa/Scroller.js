import Button from '@enact/moonstone/Button';
import ExpandableList from '@enact/moonstone/ExpandableList';
import Heading from '@enact/moonstone/Heading';
import {ScrollableBase as UiScrollableBase} from '@enact/moonstone/internal/Scrollable';
import Item from '@enact/moonstone/Item';
import {ScrollableBase} from '@enact/moonstone/Scrollable';
import Scroller from '@enact/moonstone/Scroller';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';
import Group from '@enact/ui/Group';
import ri from '@enact/ui/resolution';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import UiScroller from '@enact/ui/Scroller';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

const Config = mergeComponentMetadata('Scroller', UiScrollableBase, ScrollableBase, Scroller);

const itemData = [];
for (let i = 0; i < 100; i++) {
	itemData.push(`Item ${i}`);
}

const
	prop = {
		direction: ['both', 'horizontal', 'vertical'],
		scrollbarOption: ['auto', 'hidden', 'visible']
	};

const ScrollerResizableItem = ({...props}) => {
	const height = ri.unit(props.more ? 1500 : 400, 'rem');
	const text = props.more ? 'less' : 'more';
	const style = {
		border: 'solid yellow',
		position: 'relative',
		width: '90%'
	};
	return (
		<div style={{...style, height}}>
			<Button onClick={props.toggleMore} size="small" style={{position: 'absolute', bottom: 0}}>{text}</Button>
		</div>
	);
};

ScrollerResizableItem.propTypes = {
	more: PropTypes.bool,
	toggleMore: PropTypes.func
};

const ScrollerWithResizable = () => {
	const [more, setMore] = useState(false);

	const handleClick = useCallback(() => {
		setMore(!more);
	}, [more]);

	return (
		<Scroller
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			verticalScrollbar="visible"
		>
			<Item>Item</Item>
			<Item>Item</Item>
			<ScrollerResizableItem more={more} toggleMore={handleClick} />
		</Scroller>
	);
};

const ScrollerWithTwoExpandableList = () => (
	<div>
		<Scroller
			direction="vertical"
			onKeyDown={action('onKeyDown (1st Scroller)')}
			onScrollStart={action('onScrollStart (1st Scroller)')}
			onScrollStop={action('onScrollStop (1st Scroller)')}
			style={{height: ri.scale(200)}}
		>
			<ExpandableList selected={0} title="first">
				{['a', 'b', 'c', 'd', 'b', 'c', 'd', 'b', 'c', 'd', 'b', 'c', 'd', 'b', 'c', 'd']}
			</ExpandableList>
		</Scroller>
		<Scroller
			direction="vertical"
			onKeyDown={action('onKeyDown (2nd Scroller)')}
			onScrollStart={action('onScrollStart (2nd Scroller)')}
			onScrollStop={action('onScrollStop (2nd Scroller)')}
			style={{height: ri.scale(200)}}
		>
			<ExpandableList title="second">
				{['a', 'b', 'c', 'd']}
			</ExpandableList>
		</Scroller>
	</div>
);

const Container = SpotlightContainerDecorator('div');

const ScrollerWithLargeContainer = () => {
	useEffect(() => {
		setTimeout(() => {
			Spotlight.focus('scroller');
		}, 50);
	});

	return (
		<Scroller
			focusableScrollbar
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			spotlightId="scroller"
			style={{height: 200}}
		>
			<Container>
				<Item>Hello</Item>
				<Item>Hello</Item>
				<Item>Hello</Item>
				<Item>Hello</Item>
				<Item>Hello</Item>
				<Item>Hello</Item>
				<Item>Hello</Item>
				<Item>Hello</Item>
				<Item>Hello</Item>
			</Container>
		</Scroller>
	);
};

export default {
	title: 'Moonstone/Scroller',
	component: 'Scroller'
};

export const ListOfThings = (args) => (
	<Scroller
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
	>
		<Group childComponent={Item}>
			{itemData}
		</Group>
	</Scroller>
);

boolean('focusableScrollbar', ListOfThings, Config);
select('horizontalScrollbar', ListOfThings, prop.scrollbarOption, Config);
boolean('noScrollByWheel', ListOfThings, Config);
boolean('spotlightDisabled', ListOfThings, Config, false);
select('verticalScrollbar', ListOfThings, prop.scrollbarOption, Config);

ListOfThings.storyName = 'List of things';

export const WithExpandableList = (args) => (
	<Scroller
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
	>
		<ExpandableList
			closeOnSelect
			title="Expandable List in Scroller"
		>
			{itemData}
		</ExpandableList>
	</Scroller>
);

boolean('focusableScrollbar', WithExpandableList, Config);
select('horizontalScrollbar', WithExpandableList, prop.scrollbarOption, Config);
boolean('noScrollByWheel', WithExpandableList, Config);
boolean('spotlightDisabled', WithExpandableList, Config, false);
select('verticalScrollbar', WithExpandableList, prop.scrollbarOption, Config);

WithExpandableList.storyName = 'With ExpandableList';

export const HorizontalScroll = (args) => (
	<Scroller
		direction={args['direction']}
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
	>
		<div
			style={{
				width: ri.unit(4200, 'rem'),
				padding: '1px'
			}}
		>
			{[...Array(20)].map((x, i) => (
				<Button key={i + 1}>
					Button {i + 1}
				</Button>
			))}
		</div>
	</Scroller>
);

select('direction', HorizontalScroll, prop.direction, Config, 'horizontal');
boolean('focusableScrollbar', HorizontalScroll, Config);
select('horizontalScrollbar', HorizontalScroll, prop.scrollbarOption, Config);
boolean('noScrollByWheel', HorizontalScroll, Config);
boolean('spotlightDisabled', HorizontalScroll, Config, false);
select('verticalScrollbar', HorizontalScroll, prop.scrollbarOption, Config);

HorizontalScroll.storyName = 'Horizontal Scroll';

export const WithSpottableComponents = (args) => (
	<Scroller
		direction={args['direction']}
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
	>
		<div
			style={{
				width: ri.unit(4400, 'rem'),
				height: ri.unit(4000, 'rem'),
				padding: '1px'
			}}
		>
			{[...Array(10)].map((y, j) => <div key={j + 1}>{(
				[...Array(10)].map((x, i) => (
					<Button key={i + 1} style={{width: '200px', height: '50px', margin: '25px'}}>
						Button {j * 10 + i + 1}
					</Button>
				))
			)}</div>)}
		</div>
	</Scroller>
);

select('direction', WithSpottableComponents, prop.direction, Config);
boolean('focusableScrollbar', WithSpottableComponents, Config);
select('horizontalScrollbar', WithSpottableComponents, prop.scrollbarOption, Config);
boolean('noScrollByWheel', WithSpottableComponents, Config);
boolean('spotlightDisabled', WithSpottableComponents, Config, false);
select('verticalScrollbar', WithSpottableComponents, prop.scrollbarOption, Config);

WithSpottableComponents.storyName = 'With Spottable Components';

export const WithManyExpandableList = (args) => (
	<Scroller
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
	>
		<Heading showLine>Nothing selected</Heading>
		<ExpandableList
			closeOnSelect
			noneText="Nothing Selected"
			title="Default"
		>
			{['Option 1', 'Option 2', 'Option 3',
				'Option 4', 'Option 5', 'Option 6',
				'Option 7', 'Option 8', 'Option 9',
				'Option 10', 'Option 11', 'Option 12',
				'Option 13', 'Option 14', 'Option 15',
				'Option 16', 'Option 17', 'Option 18',
				'Option 19', 'Option 20'
			]}
		</ExpandableList>
		<br />
		<Heading showLine>Default selected</Heading>
		<ExpandableList
			noneText="Nothing Selected"
			selected={1}
			title="Default"
		>
			{['Option 1', 'Option 2', 'Option 3']}
		</ExpandableList>
		<br />
		<Heading showLine>Default selected</Heading>
		<ExpandableList
			noneText="Nothing Selected"
			selected={1}
			title="Default"
		>
			{['Option 1', 'Option 2', 'Option 3']}
		</ExpandableList>
		<br />
		<Heading showLine>Default selected</Heading>
		<ExpandableList
			noneText="Nothing Selected"
			selected={1}
			title="Default"
		>
			{['Option 1', 'Option 2', 'Option 3']}
		</ExpandableList>
		<br />
		<Heading showLine>Multitple selected</Heading>
		<ExpandableList
			noneText="Nothing Selected"
			select="multiple"
			selected={[1, 2]}
			title="multiple"
		>
			{['Option 1', 'Option 2', 'Option 3']}
		</ExpandableList>
		<br />
		<Heading showLine>Long contents selected</Heading>
		<ExpandableList
			noneText="Nothing Selected"
			select="multiple"
			selected={[18, 19]}
			title="multiple"
		>
			{['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10', 'Option 11', 'Option 12', 'Option 13', 'Option 14', 'Option 15', 'Option 16', 'Option 17', 'Option 18', 'Option 19', 'Option 20']}
		</ExpandableList>
	</Scroller>
);

boolean('focusableScrollbar', WithManyExpandableList, Config);
select('horizontalScrollbar', WithManyExpandableList, prop.scrollbarOption, Config);
boolean('noScrollByWheel', WithManyExpandableList, Config);
boolean('spotlightDisabled', WithManyExpandableList, Config, false);
select('verticalScrollbar', WithManyExpandableList, prop.scrollbarOption, Config);

WithManyExpandableList.storyName = 'With Many ExpandableList';

export const WithResizable = () => {
	return (
		<ScrollerWithResizable />
	);
};

WithResizable.storyName = 'With Resizable';
WithResizable.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithTwoExpandableList = () => {
	return (
		<ScrollerWithTwoExpandableList />
	);
};

WithTwoExpandableList.storyName = 'With Two Expandable List';
WithTwoExpandableList.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithTwoUiScroller = () => (
	<div style={{display: 'flex', height: ri.unit(399, 'rem')}}>
		<UiScroller
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
		>
			<Group childComponent={Item}>
				{itemData}
			</Group>
		</UiScroller>
		<UiScroller
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
		>
			<Group childComponent={Item}>
				{itemData}
			</Group>
		</UiScroller>
	</div>
);

WithTwoUiScroller.storyName = 'With Two ui:Scroller';
WithTwoUiScroller.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithLargeContainer = () => (
	<ScrollerWithLargeContainer />
);

WithLargeContainer.storyName = 'With Large Container';
WithLargeContainer.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithFocusOutsideContainer = () => (
	<div>
		<Button>focus to me</Button>
		<Scroller
			focusableScrollbar
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			style={{height: ri.unit(ri.scale(420), 'rem'), width: ri.unit(ri.scale(300), 'rem'), display:'inline-block'}}
		>
			<Item>Item 1</Item>
			<Item>Item 2</Item>
			<Item>Item 3</Item>
			<Item>Item 4</Item>
			<Item>Item 5</Item>
			<Item>Item 6</Item>
			<Item>Item 7</Item>
			<Item>Item 8</Item>
			<Item>Item 9</Item>
			<div>Test Test Test Test Test Test </div>
		</Scroller>
	</div>
);

WithFocusOutsideContainer.storyName = 'With Focus outside Container';
WithFocusOutsideContainer.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const TestScrollingToBoundaryWithSmallOverflow = (args) => {
	const size = args['Spacer size'];
	return (
		<Scroller
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			style={{height: ri.scaleToRem(200)}}
		>
			<Item>1</Item>
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(40)}}>{size}px Spacer</div>
			<Item style={{marginBottom: ri.scaleToRem(18)}}>3</Item>
		</Scroller>
	);
};

range('Spacer size', TestScrollingToBoundaryWithSmallOverflow, Config, {max: 300, min: 0}, 100);

TestScrollingToBoundaryWithSmallOverflow.storyName = 'Test scrolling to boundary with small overflow';

export const TestScrollingToBoundaryWithLongOverflow = (args) => {
	const size = args['Spacer size'];
	return (
		<Scroller
			focusableScrollbar={args['focusableScrollbar']}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			style={{height: ri.scaleToRem(200)}}
		>
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(40)}}>{size}px Spacer</div>
			<Item>1</Item>
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(40)}}>{size}px Spacer</div>
			<Item>3</Item>
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(40)}}>{size}px Spacer</div>
		</Scroller>
	);
};

range('Spacer size', TestScrollingToBoundaryWithLongOverflow, Config, {max: 300, min: 0}, 200);
boolean('focusableScrollbar', TestScrollingToBoundaryWithLongOverflow, Config, true);

TestScrollingToBoundaryWithLongOverflow.storyName = 'Test scrolling to boundary with long overflow';

export const WithSpotlightTargetCalculation = () => (
	<div>
		<Button>hello</Button>
		<Scroller
			focusableScrollbar
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			style={{height: 400}}
		>
			<Group childComponent={Item}>
				{itemData}
			</Group>
		</Scroller>
	</div>
);

WithSpotlightTargetCalculation.storyName = 'With Spotlight Target Calculation';
WithSpotlightTargetCalculation.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithLongItem = () => (
	<Scroller
		focusableScrollbar
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
	>
		<Item>Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Text</Item>
		<ExpandableList title="Title">
			{itemData}
		</ExpandableList>
	</Scroller>
);

WithLongItem.storyName = 'With Long Item';
WithLongItem.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithOneLongHeightItem = () => (
	<Scroller
		focusableScrollbar
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
	>
		<div style={{height: '1220px'}}>
			<Item style={{height: '1200px'}}>Long Height Item</Item>
		</div>
	</Scroller>
);

WithOneLongHeightItem.storyName = 'With One Long Height Item';
WithOneLongHeightItem.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithNestedScroller = (args) => {
	let noScrollByWheel = args['noScrollByWheel'];

	return (
		<Scroller
			direction="vertical"
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			verticalScrollbar="visible"
		>
			<Scroller
				direction="horizontal"
				horizontalScrollbar="visible"
				noScrollByWheel={noScrollByWheel}
				onKeyDown={action('onKeyDown (Nested 1st Scroller)')}
				onScrollStart={action('onScrollStart (Nested 1st Scroller)')}
				onScrollStop={action('onScrollStop (Nested 1st Scroller)')}
				style={{
					height: 'auto',
					width: '90%'
				}}
			>
				<div
					style={{
						backgroundColor: '#444',
						width: ri.unit(2400, 'rem')
					}}
				>
					<Item>The first nested scroller.</Item>
					<br />
					<br />
					<Item>This is the upper horizontal scroller. If noScrollByWheel is not specified, this scroller will be scrolled by wheel and the outer scroller will not be scrolled.</Item>
					<br />
					<br />
					<Item>If noScrollByWheel is specified, this scroller will NOT be scrolled by wheel but the outer scroller will be scrolled.</Item>
					<br />
					<br />
					<Item>To set or unset noScrollByWheel prop, click KNOBS below.</Item>
				</div>
			</Scroller>
			<Scroller
				direction="horizontal"
				horizontalScrollbar="visible"
				noScrollByWheel={noScrollByWheel}
				onKeyDown={action('onKeyDown (Nested 2nd Scroller)')}
				onScrollStart={action('onScrollStart (Nested 2nd Scroller)')}
				onScrollStop={action('onScrollStop (Nested 2nd Scroller)')}
				style={{
					height: 'auto',
					width: '90%'
				}}
			>
				<div
					style={{
						backgroundColor: '#444',
						width: ri.unit(2400, 'rem')
					}}
				>
					<Item>The second nested scroller.</Item>
					<br />
					<br />
					<Item>This is the lower horizontal scroller. If noScrollByWheel is not specified, this scroller will be scrolled by wheel and the outer scroller will not be scrolled.</Item>
					<br />
					<br />
					<Item>If noScrollByWheel is specified, this scroller will NOT be scrolled by wheel but the outer scroller will be scrolled.</Item>
					<br />
					<br />
					<Item>To set or unset noScrollByWheel prop, click KNOBS below.</Item>
				</div>
			</Scroller>
		</Scroller>
	);
};

boolean('noScrollByWheel', WithNestedScroller, Config);

WithNestedScroller.storyName = 'With Nested Scroller';
