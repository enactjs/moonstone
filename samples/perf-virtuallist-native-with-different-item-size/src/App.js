import Dropdown from '@enact/moonstone/Dropdown';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

import {useCallback, useState} from 'react';

import HorizontalDifferentWidthItemList from './views/HorizontalDifferentWidthItemList';
import VerticalDifferentHeightItemList from './views/VerticalDifferentHeightItemList';
import VerticalExpandableDifferentHeightItemList from './views/VerticalExpandableDifferentHeightItemList';

const views = [
	HorizontalDifferentWidthItemList,
	VerticalDifferentHeightItemList,
	VerticalExpandableDifferentHeightItemList
];

const viewNames = [
	'HorizontalDifferentWidthItemList',
	'VerticalDifferentHeightItemList',
	'VerticalExpandableDifferentHeightItemList'
];

const defaultViewIndex = 0;

const VirtualListSample = (props) => {
	const [index, setIndex] = useState(defaultViewIndex);

	const onSelect = useCallback(({selected}) => {
		setIndex(selected);
	}, []);

	const View = views[index];

	return (
		<div {...props}>
			<Dropdown
				direction="down"
				onSelect={onSelect}
				size="large"
				title={viewNames[defaultViewIndex]}
				width="large"
			>
				{viewNames}
			</Dropdown>
			<View style={{height: '600px'}} />
		</div>
	);
};

export default MoonstoneDecorator(VirtualListSample);
