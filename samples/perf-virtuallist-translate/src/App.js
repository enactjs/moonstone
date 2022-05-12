import Item from '@enact/moonstone/Item';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import VirtualList from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useRef} from 'react';

import css from './App.module.less';

const
	items = [],
	languages = [
		'한국어 - 한국',
		'English - United States',
		'Português - Brasil',
		'Português - Portugal',
		'Čeština - Česká republika',
		'Dansk - Danmark',
		'Deutsch - Deutschland',
		'Ελληνική γλώσσα - Ελλάδα',
		'Español - España',
		'Suomi - Suomi'
	];

for (let i = 0; i < 1000; i++) {
	items.push({title: ('00' + i).slice(-3) + ' - ' + languages[i % 10]});
}

const VirtualListSample = (props) => {
	const scrollTo = useRef();

	const getScrollTo = useCallback((fn) => {
		scrollTo.current = fn;
	}, []);

	const renderItem = useCallback(({index, ...rest}) => (
		<Item {...rest} className={css.item}>
			{items[index].title}
		</Item>
	), []);

	useEffect(() => {
		scrollTo.current({animate: false, focus: true, index: 10});
	});

	return (
		<div {...props}>
			<VirtualList
				cbScrollTo={getScrollTo}
				dataSize={items.length}
				focusableScrollbar
				itemRenderer={renderItem}
				itemSize={ri.scale(62)}
			/>
		</div>
	);
};

export default MoonstoneDecorator(VirtualListSample);
