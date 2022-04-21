import Item from '@enact/moonstone/Item';
import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';
import Spotlight from '@enact/spotlight';
import VirtualList from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useState} from 'react';

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

const PanelsView = () => {
	const [panelIndex, setPanelIndex] = useState(0);

	useEffect(() => {
		Spotlight.setPointerMode(false);
	});

	const nextPanel = useCallback(() => setPanelIndex(1), []);

	const prevPanel = useCallback(() => setPanelIndex(0), []);

	const customItem = useCallback(({index, ...rest}) => {
		return (
			<Item {...rest} onClick={nextPanel}>
				{itemList[index]}
			</Item>
		);
	}, [nextPanel]);

	return (
		<ActivityPanels index={panelIndex} onSelectBreadcrumb={prevPanel}>
			<Panel>
				<Header title="Panel 0" />
				<VirtualList
					dataSize={itemList.length}
					direction="vertical"
					focusableScrollbar
					itemRenderer={customItem}
					itemSize={ri.scale(72)}
					spotlightId={'virtualList_$' + panelIndex}
				/>
			</Panel>
			<Panel>
				<Header title="Panel 1" />
				<Scroller>
					{
						itemList.map((item, key) => {
							return (
								<Item key={key} onClick={prevPanel}>{item}</Item>
							);
						})
					}
				</Scroller>
			</Panel>
		</ActivityPanels>
	);
};

export default PanelsView;
