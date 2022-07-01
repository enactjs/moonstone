import Item from '@enact/moonstone/Item';
import {VirtualGridListNative} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useRef} from 'react';

const items = Array.from(new Array(1000)).map((n, i) => `Item  ${('00' + i).slice(-3)}`);

const SampleVirtualGridListNative = ({index, onClick, ...rest}) => {
	const id = `vgl_${index}`;
	const scrollTo = useRef();

	const getScrollTo = useCallback((newScrollTo) => {
		scrollTo.current = newScrollTo;
	}, []);

	const renderItem = useCallback(({index: receivedIndex, ...props}) => (
		<Item {...props} onClick={onClick}>
			{items[receivedIndex]}
		</Item>
	), [onClick]);

	return (
		<VirtualGridListNative
			{...rest}
			cbScrollTo={getScrollTo}
			dataSize={items.length}
			id={id}
			itemRenderer={renderItem}
			itemSize={{
				minHeight: ri.scale(270),
				minWidth: ri.scale(180)
			}}
			spotlightId={id} // Set a unique ID to preserve last focus
		/>
	);
};

SampleVirtualGridListNative.propTypes = {
	index: PropTypes.number,
	onClick: PropTypes.func
};

export default SampleVirtualGridListNative;
