import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {RadioControllerDecorator} from '@enact/ui/RadioDecorator';
import {useCallback, useState} from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import ExpandableList, {ExpandableListBase} from '@enact/moonstone/ExpandableList';
import Scroller from '@enact/moonstone/Scroller';

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

storiesOf('ExpandableList', module)
	.add(
		'with children length update',
		() => (
			<ExpandableListChildrenLengthUpdate
				closeOnSelect={boolean('closeOnSelect', Config)}
				disabled={boolean('disabled', Config)}
				noAutoClose={boolean('noAutoClose', Config)}
				noLockBottom={boolean('noLockBottom', Config)}
				noneText={text('noneText', Config, 'nothing selected')}
				onSelect={action('onSelect')}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				select={select('select', ['radio', 'multiple', 'single'], Config, 'radio')}
				title="with children length update"
			/>
		)
	)
	.add(
		'grouped',
		() => (
			<ExpandableGroup>
				<ExpandableList
					closeOnSelect={boolean('closeOnSelect', Config)}
					title="First"
				>
					{['One', 'Two', 'Three']}
				</ExpandableList>
				<ExpandableList
					closeOnSelect={boolean('closeOnSelect', Config)}
					title="Second"
				>
					{['Fourth', 'Fifth', 'Sixth']}
				</ExpandableList>
				<ExpandableList
					closeOnSelect={boolean('closeOnSelect', Config)}
					title="Third"
				>
					{['Seventh', 'Eighth', 'Ninth']}
				</ExpandableList>
			</ExpandableGroup>
		)
	)
	.add(
		'with multiples (to test "lockBottom" prop)',
		() => (
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
		)
	)
	.add(
		'with default selected',
		() => (
			<Scroller>
				<ExpandableList title="Default Selected" defaultSelected={2}>
					{['Option 1', 'Option 2', 'Option 3']}
				</ExpandableList>
				<ExpandableList title="Multiple Selected" select="multiple" defaultSelected={[1, 2]}>
					{['Option 1', 'Option 2', 'Option 3']}
				</ExpandableList>
				<ExpandableList title="Long Contents Selected" select="multiple" defaultSelected={[17, 18, 19]}>
					{optionsArray}
				</ExpandableList>
			</Scroller>
		)
	)
	.add(
		'with added children',
		() => (
			<ExpandableListWithAddedChildren />
		)
	);
