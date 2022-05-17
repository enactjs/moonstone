import DatePicker from '@enact/moonstone/DatePicker';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import Heading from '@enact/moonstone/Heading';
import Picker from '@enact/moonstone/Picker';
import RangePicker from '@enact/moonstone/RangePicker';
import Scroller from '@enact/moonstone/Scroller';
import TimePicker from '@enact/moonstone/TimePicker';
import {useCallback, useState} from 'react';

const
	airports = [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	],
	emoticons = ['💥 boom', '😩🖐 facepalm', '🍩 doughnut', '👻 ghost', '💍 ring', '🎮 videogame', '🍌🍌 bananas'],
	subjects = ['English', 'Maths', 'Korean', 'Science', 'History'],
	subjectValue = ['80', '90', '100', '70', '50'];

const CustomPicker = ({children, ...props}) => {
	const [index, setIndex] = useState(0);

	const handleChange = useCallback((ev) => setIndex(ev.value), []);

	const valueText = `${children[index]} ${subjectValue[index]}`;

	return (
		<Picker aria-valuetext={valueText} onChange={handleChange} {...props}>{children}</Picker>
	);
};

const PickerView = () => (
	<Scroller focusableScrollbar>
		<h2>Default</h2>
		<Heading showLine>Picker</Heading>
		<Picker
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Picker With Accessibility Value</Heading>
		<CustomPicker
			orientation="horizontal"
			width="medium"
		>
			{subjects}
		</CustomPicker>

		<Heading showLine>Joined Picker</Heading>
		<Picker
			joined
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Vertical Picker</Heading>
		<Picker
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>
		<Picker
			joined
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>RangePicker</Heading>
		<RangePicker
			defaultValue={0}
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Joined RangePicker</Heading>
		<RangePicker
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Vertical RangePicker</Heading>
		<RangePicker
			defaultValue={0}
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>
		<RangePicker
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>

		<Heading showLine>ExpandablePicker</Heading>
		<ExpandablePicker
			title="Favorite Emoji"
			width="medium"
		>
			{emoticons}
		</ExpandablePicker>

		<Heading showLine>DatePicker</Heading>
		<DatePicker
			noLabels={false}
			noneText="Nothing Selected"
			title="Date"
		/>

		<Heading showLine>TimePicker</Heading>
		<TimePicker
			noLabels={false}
			noneText="Nothing Selected"
			title="Time"
		/>

		<h2>Customizable aria-labels</h2>
		<Heading showLine>Picker</Heading>
		<Picker
			decrementAriaLabel="Decrement"
			incrementAriaLabel="Increment"
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Picker With Accessibility Value</Heading>
		<CustomPicker
			decrementAriaLabel="Decrement"
			incrementAriaLabel="Increment"
			orientation="horizontal"
			width="medium"
		>
			{subjects}
		</CustomPicker>

		<Heading showLine>Joined Picker</Heading>
		<Picker
			aria-label="Joined Picker"
			joined
			orientation="horizontal"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>Vertical Picker</Heading>
		<Picker
			decrementAriaLabel="Decrement"
			incrementAriaLabel="Increment"
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>
		<Picker
			aria-label="Joined Picker"
			joined
			orientation="vertical"
			width="medium"
		>
			{airports}
		</Picker>

		<Heading showLine>RangePicker</Heading>
		<RangePicker
			decrementAriaLabel="Decrement"
			defaultValue={0}
			incrementAriaLabel="Increment"
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Joined RangePicker</Heading>
		<RangePicker
			aria-label="Joined range Picker"
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="horizontal"
			step={5}
			width="medium"
		/>

		<Heading showLine>Vertical RangePicker</Heading>
		<RangePicker
			decrementAriaLabel="Decrement"
			defaultValue={0}
			incrementAriaLabel="Increment"
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>
		<RangePicker
			aria-label="Joined range Picker"
			defaultValue={0}
			joined
			max={100}
			min={0}
			orientation="vertical"
			step={5}
			width="medium"
		/>

		<Heading showLine>ExpandablePicker</Heading>
		<ExpandablePicker
			checkButtonAriaLabel="Check"
			decrementAriaLabel="Decrement"
			incrementAriaLabel="Increment"
			title="Favorite Emoji"
			width="medium"
		>
			{emoticons}
		</ExpandablePicker>

		<Heading showLine>DatePicker</Heading>
		<DatePicker
			dayAriaLabel="Day picker"
			dayLabel="My Day"
			monthAriaLabel="Month picker"
			monthLabel="My Month"
			noLabels={false}
			noneText="Nothing Selected"
			title="Date"
			yearAriaLabel="Year picker"
			yearLabel="My Year"
		/>

		<Heading showLine>TimePicker</Heading>
		<TimePicker
			hourAriaLabel="Hour picker"
			hourLabel="HR"
			meridiemAriaLabel="Meridiem picker"
			minuteAriaLabel="Minute picker"
			minuteLabel="MIN"
			noLabels={false}
			noneText="Nothing Selected"
			title="Time"
		/>
	</Scroller>
);

export default PickerView;
