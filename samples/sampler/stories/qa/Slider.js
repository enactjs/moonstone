import Item from '@enact/moonstone/Item';
import Slider from '@enact/moonstone/Slider';
import VirtualList from '@enact/moonstone/VirtualList';
import {number} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import {storiesOf} from '@storybook/react';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

Slider.displayName = 'Slider';

const items = [
	{item: 'Apple', count: 10},
	{item: 'Orange', count: 5},
	{item: 'Banana', count: 20},
	{item: 'Mango', count: 60},
	{item: 'Apricot', count: 15},
	{item: 'Peach', count: 92},
	{item: 'Pineapple', count: 67},
	{item: 'Strawberry', count: 70},
	{item: 'Grapes', count: 44},
	{item: 'Watermelon', count: 55}
];

const SliderList = ({itemSize}) => {
	const [selectedItems, setSelectedItems] = useState([]);
	const [value, setValue] = useState(50);

	const fillItems = (definedValue) => {
		let selected = items.filter((item) => {
			if (item.count <= definedValue) {
				return true;
			}
		});

		setSelectedItems(selected);
		setValue(definedValue);
	};

	useEffect(() => fillItems(value), [value]);

	const handleChange = useCallback((e) => {
		fillItems(e.value);
	}, []);

	// eslint-disable-next-line enact/display-name, enact/prop-types
	const renderItem = useCallback((size) => ({index, ...rest}) => {
		const itemStyle = {
			height: size + 'px',
			borderBottom: ri.unit(3, 'rem') + ' solid #202328',
			boxSizing: 'border-box'
		};

		return (
			<Item {...rest} style={itemStyle}>
				{items[index].item + ': ' + items[index].count}
			</Item>
		);
	}, []);

	return (
		<div>
			<Slider
				backgroundProgress={0}
				disabled={false}
				max={100}
				min={0}
				onChange={handleChange}
				step={1}
				tooltip={false}
				value={value}
			/>
			<VirtualList
				dataSize={selectedItems.length}
				itemRenderer={renderItem(itemSize)}
				itemSize={itemSize}
				style={{
					height: ri.unit(552, 'rem')
				}}
			/>
		</div>
	);
};

SliderList.propTypes = {
	itemSize: PropTypes.number
};

storiesOf('Slider', module)
	.add(
		'Add and Remove ',
		() => {
			const itemSize = ri.scale(number('itemSize', Slider, 72));
			return (
				<SliderList itemSize={itemSize} />
			);
		}
	);
