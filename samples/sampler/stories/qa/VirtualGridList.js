import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import GridListImageItem from '@enact/moonstone/GridListImageItem';
import Item from '@enact/moonstone/Item';
import {ScrollableBase as UiScrollableBase} from '@enact/moonstone/ui/Scrollable';
import {VirtualListBase as UiVirtualListBase} from '@enact/moonstone/UiVirtualList';
import {VirtualGridList, VirtualListBase} from '@enact/moonstone/VirtualList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('VirtualGridList', UiVirtualListBase, UiScrollableBase, VirtualListBase);

const
	defaultDataSize = 1000,
	prop = {
		scrollbarOption: ['auto', 'hidden', 'visible']
	},
	wrapOption = {
		false: false,
		true: true,
		'"noAnimation"': 'noAnimation'
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
			source = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`);

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
				cbScrollTo={getScrollTo}
				dataSize={itemList.length}
				direction="vertical"
				itemRenderer={componentRenderItem}
				itemSize={{minWidth: ri.scale(285), minHeight: ri.scale(60)}}
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
				direction="right"
				onClick={openPopup}
				onClose={closePopup}
				open={isPopup}
				popupComponent={renderPopup}
				showCloseButton
				spotlightRestrict="self-only"
			>
				Focus here
			</ContextualPopupButton>
		</div>
	);
};

export default {
	title: 'Moonstone/VirtualGridList',
	component: 'VirtualGridList'
};

export const HorizontalVirtualGridList = (args) => (
	<VirtualGridList
		dataSize={updateDataSize(args['dataSize'])}
		direction="horizontal"
		focusableScrollbar={args['focusableScrollbar']}
		horizontalScrollbar={args['horizontalScrollbar']}
		itemRenderer={renderItem}
		itemSize={{
			minWidth: ri.scale(args['minWidth']),
			minHeight: ri.scale(args['minHeight'])
		}}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		spacing={ri.scale(args['spacing'])}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
		wrap={args['wrap']}
	/>
);

number('dataSize', HorizontalVirtualGridList, Config, defaultDataSize);
boolean('focusableScrollbar', HorizontalVirtualGridList, Config);
select('horizontalScrollbar', HorizontalVirtualGridList, prop.scrollbarOption, Config);
number('minWidth', HorizontalVirtualGridList, Config, 180);
number('minHeight', HorizontalVirtualGridList, Config, 270);
boolean('noScrollByWheel', HorizontalVirtualGridList, Config);
number('spacing', HorizontalVirtualGridList, Config, 18);
boolean('spotlightDisabled', HorizontalVirtualGridList, Config, false);
select('verticalScrollbar', HorizontalVirtualGridList, prop.scrollbarOption, Config);
select('wrap', HorizontalVirtualGridList, wrapOption, Config);

HorizontalVirtualGridList.storyName = 'Horizontal VirtualGridList';
HorizontalVirtualGridList.parameters = {
	propTables: [Config]
};

export const WithButtonSpotlightGoesToCorrectTarget = () => {
	return (
		<ButtonAndVirtualGridList />
	);
};

WithButtonSpotlightGoesToCorrectTarget.storyName = 'with Button, Spotlight goes to correct target';
WithButtonSpotlightGoesToCorrectTarget.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

