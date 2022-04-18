import Heading from '@enact/moonstone/Heading';
import ExpandableList from '@enact/moonstone/ExpandableList';
import Scroller from '@enact/moonstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';
import {useCallback, useState} from 'react';

const
	data = [
		{
			ariaLabel: 'First option',
			value: 'option1'
		},
		{
			ariaLabel: 'Second option',
			value: 'option2'
		},
		{
			ariaLabel: 'Third option',
			value: 'option3'
		}
	],
	noneText = 'nothing selected',
	title = 'title';

const CustomExpandableList = () => {
	const [label, setLabel] = useState(noneText);

	const onSelect = useCallback(({selected}) => {
		if (selected) { // case with 'multiple' select prop in ExpandableList
			let newLabel = '';
			for (let i = 0; i < selected.length; i++) {
				newLabel = newLabel + data[selected[i]].ariaLabel + ', ';
			}
			setLabel(newLabel);
		} else { // Nothing selected in ExpandableList
			setLabel(noneText);
		}
	}, []);

	return (
		<ExpandableList
			aria-label={title + ' ' + label}
			noneText={noneText}
			onSelect={onSelect}
			select="multiple"
			title={title}
		>
			{data.map((o, i) => ({key: i, children: o.value, 'aria-label': o.ariaLabel}))}
		</ExpandableList>
	);
};

const ExpandableListView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<ExpandableList
				noneText={noneText}
				select="multiple"
				title={title}
			>
				{['option1', 'option2', 'option3']}
			</ExpandableList>
			<Heading showLine>Customizable aria-labels</Heading>
			<CustomExpandableList />
		</Cell>
	</Layout>
);

export default ExpandableListView;
