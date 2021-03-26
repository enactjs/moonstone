import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';
import {Component} from 'react';
import ri from '@enact/ui/resolution';
import Scroller from '@enact/moonstone/Scroller';
import Spotlight from '@enact/spotlight';
import VirtualList from '@enact/moonstone/VirtualList';

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

class PanelsView extends Component {
	constructor (props) {
		super(props);
		this.state = {
			panelIndex: 0
		};
	}

	componentWillMount () { // eslint-disable-line
		Spotlight.setPointerMode(false);
	}

	nextPanel = () => this.setState({panelIndex: 1});

	prevPanel = () => this.setState({panelIndex: 0});

	customItem = ({index, ...rest}) => {
		return (
			<Item {...rest} onClick={this.nextPanel}>
				{itemList[index]}
			</Item>
		);
	};

	render () {
		return (
			<ActivityPanels index={this.state.panelIndex} onSelectBreadcrumb={this.prevPanel}>
				<Panel>
					<Header title="Panel 0" />
					<VirtualList
						spotlightId={'virtualList_$' + this.state.panelIndex}
						dataSize={itemList.length}
						direction="vertical"
						focusableScrollbar
						itemRenderer={this.customItem}
						itemSize={ri.scale(72)}
					/>
				</Panel>
				<Panel>
					<Header title="Panel 1" />
					<Scroller>
						{
							itemList.map((item, key) => {
								return (
									<Item onClick={this.prevPanel} key={key}>{item}</Item>
								);
							})
						}
					</Scroller>
				</Panel>
			</ActivityPanels>
		);
	}
}

export default PanelsView;
