import Dropdown from '@enact/moonstone/Dropdown';
import Heading from '@enact/moonstone/Heading';
import Scroller from '@enact/moonstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';
import {useCallback, useState} from 'react';

const list = [
	{children: 'Option1', key: 'item1', 'aria-label': 'aria label 1'},
	{children: 'Option2', key: 'item2', 'aria-label': 'aria label 2'},
	{children: 'Option3', key: 'item3', 'aria-label': 'aria label 3'}
];

const A11yDropdown = () => {
	const [ariaLabel, setAriaLabel] = useState(null);

	const onSelect = useCallback(({selected}) => {
		setAriaLabel(list[selected]['aria-label']);
	}, []);

	return (
		<Dropdown
			aria-label={ariaLabel}
			onSelect={onSelect}
			title="Dropdown"
		>
			{list}
		</Dropdown>
	);
};

const DropdownView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>String Array children</Heading>
			<Dropdown title="Dropdown">
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
			<br />
			<br />
			<Heading showLine>Object Array children with aria-label</Heading>
			<A11yDropdown />
		</Cell>
	</Layout>
);

export default DropdownView;
