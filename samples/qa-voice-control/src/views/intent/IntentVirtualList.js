import Item from '@enact/moonstone/Item';
import {Header, Panel} from '@enact/moonstone/Panels';
import {VirtualList} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {Component} from 'react';

let items = [];
for (let i = 0; i < 30; i++) {
	items.push('item' + i);
}


class IntentVirtualList extends Component {
	renderItem = ({index, ...rest}) => {
		return (
			<Item
				{...rest}
				onClick={this.handleClick}
				style={{height: ri.unit(72, 'rem')}}
			>
				{items[index]}
			</Item>
		);
	};

	cbScrollTo = (ref) => {
		this.scrollTo = ref;
	};

	handleClick = () => {
		this.scrollTo({align: 'bottom', focus: true});
	};

	render () {
		return (
			<Panel>
				<Header title="Intent to scroll on VirtualList" />
				<VirtualList
					cbScrollTo={this.cbScrollTo}
					data-webos-voice-focused
					dataSize={items.length}
					itemRenderer={this.renderItem}
					itemSize={72}
					spacing={12}
				/>
			</Panel>
		);
	}
}

export default IntentVirtualList;
