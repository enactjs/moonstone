import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import ExpandableList, {ExpandableListBase} from '@enact/moonstone/ExpandableList';
import Scroller from '@enact/moonstone/Scroller';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/controls';
import {RadioControllerDecorator} from '@enact/ui/RadioDecorator';
import {useCallback, useState} from 'react';

const Config = mergeComponentMetadata('ExpandableList', ExpandableList, ExpandableListBase);

const ExpandableGroup = RadioControllerDecorator('div');

const prop = {
	listArray: [['a', 'b', 'c'], ['c', 'd', 'e', 'f', 'g']]
};

const optionsArray = [];

for (let i = 0; i < 21; i++) {
	optionsArray.push(`Option ${i + 1}`);
}

const ExpandableListChildrenLengthUpdate = ({...props}) => {
	const [index, setIndex] = useState(0);

	const updateValue = useCallback(() => {
		setIndex(1 - index);
	}, [index]);

	return (
		<div>
			<Button onClick={updateValue}>update value</Button>
			<Heading showLine />
			<ExpandableList {...props}>
				{prop.listArray[index]}
			</ExpandableList>
		</div>
	);
};

const ExpandableListWithAddedChildren = () => {
	const [list, setList] = useState([]);

	const setZero = useCallback(() => {
		setList([]);
	}, []);

	const setTen = useCallback(() => {
		setList(['a', 'b', 'c', 'd', 'e', 'a', 'b', 'c', 'd', 'e']);
	}, []);

	return (
		<Scroller>
			<Heading showLine>Change the number of items in the list</Heading>
			<Button onClick={setZero}>0</Button>
			<Button onClick={setTen}>10</Button>
			<ExpandableList title={'test'} defaultOpen>
				{list}
			</ExpandableList>
		</Scroller>
	);
};

export default {
	title: 'Moonstone/ExpandableList',
	component: 'ExpandableList'
};

export const WithChildrenLengthUpdate = (args) => (
	<ExpandableListChildrenLengthUpdate
		closeOnSelect={args['closeOnSelect']}
		disabled={args['disabled']}
		noAutoClose={args['noAutoClose']}
		noLockBottom={args['noLockBottom']}
		noneText={args['noneText']}
		onSelect={action('onSelect')}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		select={args['select']}
		title="with children length update"
	/>
);

boolean('closeOnSelect', WithChildrenLengthUpdate, Config);
boolean('disabled', WithChildrenLengthUpdate, Config);
boolean('noAutoClose', WithChildrenLengthUpdate, Config);
boolean('noLockBottom', WithChildrenLengthUpdate, Config);
text('noneText', WithChildrenLengthUpdate, Config, 'nothing selected');
select('select', WithChildrenLengthUpdate, ['radio', 'multiple', 'single'], Config, 'radio');

WithChildrenLengthUpdate.storyName = 'with children length update';

export const Grouped = (args) => (
	<ExpandableGroup>
		<ExpandableList
			closeOnSelect={args['closeOnSelect']}
			title="First"
		>
			{['One', 'Two', 'Three']}
		</ExpandableList>
		<ExpandableList
			closeOnSelect={args['closeOnSelect']}
			title="Second"
		>
			{['Fourth', 'Fifth', 'Sixth']}
		</ExpandableList>
		<ExpandableList
			closeOnSelect={args['closeOnSelect']}
			title="Third"
		>
			{['Seventh', 'Eighth', 'Ninth']}
		</ExpandableList>
	</ExpandableGroup>
);

boolean('closeOnSelect', Grouped, Config);

Grouped.storyName = 'grouped';

export const WithMultipleLists = () => (
	<div>
		<ExpandableList title="First">
			{['One', 'Two', 'Three']}
		</ExpandableList>
		<ExpandableList title="Second (with disabled items)">
			{[
				{key: 1, children: 'a', disabled: true},
				{key: 2, children: 'b'},
				{key: 3, children: 'c', disabled: true},
				{key: 4, children: 'd'},
				{key: 5, children: 'e', disabled: true}
			]}
		</ExpandableList>
		<ExpandableList title="Third">
			{['Seventh', 'Eighth', 'Ninth']}
		</ExpandableList>
	</div>
);

WithMultipleLists.storyName = 'with multiples (to test "lockBottom" prop)';
WithMultipleLists.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithDefaultSelected = () => (
	<div>
		<ExpandableList title="First">
			{['One', 'Two', 'Three']}
		</ExpandableList>
		<ExpandableList title="Second (with disabled items)">
			{[
				{key: 1, children: 'a', disabled: true},
				{key: 2, children: 'b'},
				{key: 3, children: 'c', disabled: true},
				{key: 4, children: 'd'},
				{key: 5, children: 'e', disabled: true}
			]}
		</ExpandableList>
		<ExpandableList title="Third">
			{['Seventh', 'Eighth', 'Ninth']}
		</ExpandableList>
	</div>
);

WithDefaultSelected.storyName = 'with default selected';
WithDefaultSelected.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithAddedChildren = () => (
	<ExpandableListWithAddedChildren />
);

WithAddedChildren.storyName = 'with added children';
WithAddedChildren.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
