import ri from '@enact/ui/resolution';
import {Component} from 'react';
import {storiesOf} from '@storybook/react';

import ExpandableList from '@enact/moonstone/ExpandableList';
import Item from '@enact/moonstone/Item';
import Scroller from '@enact/moonstone/Scroller';
import SelectableItem from '@enact/moonstone/SelectableItem';

const data = [
	'a',
	'ABCDEFGHIJKLMNOPQRSTUVW12345',
	'c'
];

class NoUpdate extends Component {
	shouldComponentUpdate () {
		return false;
	}

	render () {
		return (
			<div>{this.props.children}</div>
		);
	}
}

storiesOf('Resizable', module)
	.add(
		'should recalculate long marquee when scrollbar is rendered',
		() => (
			<Scroller style={{height: ri.unit(399, 'rem'), width: ri.unit(501, 'rem')}}>
				<NoUpdate>
					<Item marqueeOn="render">MARQUEEONRENDER ABCDE</Item>
					<Item>ABCDEFGHIJKLMNOPQRST</Item>
					<SelectableItem>
						SELECTABLE ITEM ABCDEFG
					</SelectableItem>
					<ExpandableList title={'ABCDEFGHIJKLMNOPQRS'}>
						{data}
					</ExpandableList>
					<Item>dummy</Item>
				</NoUpdate>
			</Scroller>
		)
	)
	.add(
		'should recalculate when selectable item is selected',
		() => (
			<Scroller style={{height: ri.unit(399, 'rem'), width: ri.unit(501, 'rem')}}>
				<SelectableItem>
					SELECTABLE ITEM ABCDEFGHIJ
				</SelectableItem>
			</Scroller>
		)
	);
