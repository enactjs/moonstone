import DatePicker from '@enact/moonstone/DatePicker';
import ExpandableInput from '@enact/moonstone/ExpandableInput';
import ExpandableItem from '@enact/moonstone/ExpandableItem';
import ExpandableList from '@enact/moonstone/ExpandableList';
import Icon from '@enact/moonstone/Icon';
import Item from '@enact/moonstone/Item';
import Picker from '@enact/moonstone/Picker';
import RadioItem from '@enact/moonstone/RadioItem';
import {ScrollerNative as Scroller} from '@enact/moonstone/Scroller';
import TimePicker from '@enact/moonstone/TimePicker';
import Group from '@enact/ui/Group';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

const
	airports = [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	],
	data = [],
	itemData = [];

for (let i = 0; i < 20; i++) {
	data.push(airports[i % 4]);
}

for (let i = 0; i < 50; i++) {
	itemData.push(`Item ${i}`);
}

const MainView = () => {
	const [focusableScrollbar, setFocusableScrollbar] = useState(false);
	const [height, setHeight] = useState(4000);
	const [width, setWidth] = useState(1000);

	const getScaledSize = (size) => ri.scale(parseInt(size) || 0);

	const handleFocusableScrollbar = useCallback( () => {
		setFocusableScrollbar((fs) => setFocusableScrollbar(!fs));
	}, []);

	const handleHeight = useCallback(({value}) => setHeight(value), []);

	const handleWidth = useCallback(({value}) => setWidth(value), []);

	return (
		<div className={css.mainView}>
			<PanelHeader
				handleFocusableScrollbar={handleFocusableScrollbar}
				handleHeight={handleHeight}
				handleWidth={handleWidth}
				height={height}
				title="Scroller Native"
				type="compact"
				width={width}
			/>
			<div className={css.content}>
				<Scroller focusableScrollbar={focusableScrollbar}>
					<div style={{height: `${getScaledSize(height)}px`, width: `${getScaledSize(width)}px`}}>
						<ExpandableList
							closeOnSelect
							noneText="nothing selected"
							title="ExpandableList"
						>
							{['option1', 'option2', 'option3']}
						</ExpandableList>
						<ExpandableItem title="ExpandableItem">
							<Item>
								This can be any type of content you might want to
								render inside a labeled expandable container
							</Item>
							<Item>
								<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
							</Item>
						</ExpandableItem>
						<ExpandableList
							closeOnSelect
							noneText="nothing selected"
							title="ExpandableList"
						>
							{data}
						</ExpandableList>
						<ExpandableInput
							defaultValue="Initial value"
							title="Input with defaultValue"
						/>
						<Picker
							orientation="vertical"
							width="medium"
						>
							{airports}
						</Picker>
						<DatePicker
							noLabels={false}
							noneText="Nothing Selected"
							title="DatePicker"
						/>
						<RadioItem> FirstLongTextWithSpace FirstLongTextWithSpace FirstLongTextWithSpace FirstLongTextWithSpace </RadioItem>
						<RadioItem disabled> Default disabled Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text </RadioItem>
						<Group childComponent={Item}>
							{itemData}
						</Group>
						<TimePicker
							noLabels={false}
							noneText="Nothing Selected"
							title="TimePicker"
						/>
					</div>
				</Scroller>
			</div>
		</div>
	);
};

export default MainView;
