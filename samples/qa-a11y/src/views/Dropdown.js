import Dropdown from '@enact/moonstone/Dropdown';
import Heading from '@enact/moonstone/Heading';
import Scroller from '@enact/moonstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';
import {Component} from 'react';

const list = [
	{children: 'Option1', key: 'item1', 'aria-label': 'aria label 1'},
	{children: 'Option2', key: 'item2', 'aria-label': 'aria label 2'},
	{children: 'Option3', key: 'item3', 'aria-label': 'aria label 3'}
];

class A11yDropdown extends Component {
	constructor (props) {
		super(props);
		this.state = {
			ariaLabel: null
		};
	}

	onSelect = ({selected}) => {
		this.setState({ariaLabel: list[selected]['aria-label']});
	};

	render () {
		return (
			<Dropdown
				aria-label={this.state.ariaLabel}
				onSelect={this.onSelect}
				title="Dropdown"
			>
				{list}
			</Dropdown>
		);
	}
}

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
