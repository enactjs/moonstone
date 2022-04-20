import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import GridListImageItem from '@enact/moonstone/GridListImageItem';
import Item from '@enact/moonstone/Item';
import {VirtualGridList, VirtualListBase} from '@enact/moonstone/VirtualList';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import {ScrollableBase as UiScrollableBase} from '@enact/ui/Scrollable';
import {VirtualListBase as UiVirtualListBase} from '@enact/ui/VirtualList/VirtualListBase';
import {storiesOf} from '@storybook/react';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

const Config = mergeComponentMetadata('VirtualGridList', UiVirtualListBase, UiScrollableBase, VirtualListBase);

const
	defaultDataSize = 1000,
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	wrapOption = {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	},
	items = [],
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {text, subText, source} = items[index];

		return (
			<GridListImageItem
				{...rest}
				caption={text}
				source={source}
				subCaption={subText}
			/>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = (headingZeros + i).slice(-itemNumberDigits),
			text = `Item ${count}`,
			subText = `SubItem ${count}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = `http://via.placeholder.com/300x300/${color}/ffffff/png?text=Image+${i}`;

		items.push({text, subText, source});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

let itemList = [];
for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

const ContextualPopupButton = ContextualPopupDecorator(Button);

let lastIndex = 0;

const MyVirtualList = ({closePopup, ...props}) => {
	const scrollTo = useRef();

	useEffect(() => {
		scrollTo.current({index: lastIndex, animate: false, focus: true});
	}, []);

	const componentClosePopup = useCallback((index) => {
		lastIndex = index;
		// eslint-disable-next-line enact/prop-types
		closePopup();
	}, [closePopup]);

	const componentRenderItem = useCallback(({index, ...rest}) => {
		return (
			/* eslint-disable react/jsx-no-bind */
			<Item key={index} onClick={() => componentClosePopup(index)} {...rest}>{itemList[index]}</Item>
		);
	}, [componentClosePopup]);

	const getScrollTo = useCallback((newScrollTo) => {
		scrollTo.current = newScrollTo;
	}, []);

	return (
		<div {...props} style={{width: ri.scaleToRem(915), height: ri.scaleToRem(600)}}>
			<VirtualGridList
				dataSize={itemList.length}
				itemRenderer={componentRenderItem}
				itemSize={{minWidth: ri.scale(285), minHeight: ri.scale(60)}}
				direction="vertical"
				cbScrollTo={getScrollTo}
			/>
		</div>
	);
};

MyVirtualList.propTypes = {
	closePopup: PropTypes.func
};

const ButtonAndVirtualGridList = () => {
	const [isPopup, setIsPopup] = useState(false);

	const openPopup = useCallback(() => {
		setIsPopup(true);
	}, []);

	const closePopup = useCallback(() => {
		setIsPopup(false);
	}, []);

	const renderPopup = useCallback((rest) => {
		return (
			<MyVirtualList {...rest} closePopup={closePopup} />
		);
	}, [closePopup]);

	return (
		<div>
			<ContextualPopupButton
				open={isPopup}
				popupComponent={renderPopup}
				onClick={openPopup}
				direction="right"
				showCloseButton
				spotlightRestrict="self-only"
				onClose={closePopup}
			>
				Focus here
			</ContextualPopupButton>
		</div>
	);
};

storiesOf('VirtualGridList', module)
	.add(
		'Horizontal VirtualGridList',
		() => (
			<VirtualGridList
				dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
				direction="horizontal"
				focusableScrollbar={boolean('focusableScrollbar', Config)}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(number('minWidth', Config, 180)),
					minHeight: ri.scale(number('minHeight', Config, 270))
				}}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				spacing={ri.scale(number('spacing', Config, 18))}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
				wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
			/>
		),
		{propTables: [Config]}
	)
	.add(
		'with Button, Spotlight goes to correct target',
		() => (
			<ButtonAndVirtualGridList />
		)
	);
