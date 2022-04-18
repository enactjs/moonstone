import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import Input from '@enact/moonstone/Input';
import {Header, Panel} from '@enact/moonstone/Panels';
import ToggleButton from '@enact/moonstone/ToggleButton';
import VirtualList from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setData} from '../actions';
import ListItem from '../components/ListItem';
import LocaleSwitch from '../components/LocaleSwitch';

import css from './MainPanel.module.less';

const childProps = {text: ' child props'};

const MainPanel = ({...rest}) => {
	const dispatch = useDispatch();
	const [hasChildProps, setHasChildProps] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [value, setValue] = useState('');

	const listItems = useSelector(({listItems:storeListItems}) => storeListItems);
	const changeData = useCallback((dataSize, isDisabledData) => dispatch(setData(dataSize, isDisabledData)), [dispatch]);

	useEffect(() => {
		changeData(200, false);
	}, [changeData]);

	const handleChange = useCallback(({value: newValue}) => setValue(newValue), []);

	const onChangeDataSize = useCallback(() => {
		const dataSize = parseInt(value) || 0;
		changeData(dataSize, isDisabled);
	}, [changeData, isDisabled, value]);

	const onToggleChildProps = useCallback(() => {
		setHasChildProps(!hasChildProps);
	}, [hasChildProps]);

	const onToggleDisabled = useCallback(() => {
		changeData(listItems.length, !isDisabled);
		return setIsDisabled(!isDisabled);
	}, [changeData, isDisabled, listItems.length]);

	const renderItem = useCallback(({index, text, ...props}) => {
		return (
			<ListItem {...props} index={index}>
				{listItems[index].content + (text || '')}
			</ListItem>
		);
	}, [listItems]);

	return (
		<Panel {...rest}>
			<Header
				title="VirtualList"
				type="compact"
			/>
			<div className={css.header}>
				<div>
					DataSize:
					<Input
						onChange={handleChange}
						placeholder={`${listItems.length}`}
						size="small"
						style={{width: '5em'}}
						type="number"
						value={value}
					/>
					<Button size="small" onClick={onChangeDataSize}>Set DataSize</Button>
					<ToggleButton size="small" onToggle={onToggleDisabled}>Disabled Items</ToggleButton>
					<ToggleButton size="small" onToggle={onToggleChildProps}>Child Props</ToggleButton>
					<LocaleSwitch size="small" />
					<Heading showLine />
				</div>
				<div className={css.list}>
					<VirtualList
						childProps={hasChildProps ? childProps : null}
						dataSize={listItems.length}
						focusableScrollbar
						itemRenderer={renderItem}
						itemSize={ri.scale(60 + 3)}
					/>
				</div>
			</div>
		</Panel>
	);
};

export default MainPanel;
