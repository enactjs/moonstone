import EditableIntegerPicker from '@enact/moonstone/EditableIntegerPicker';
import Heading from '@enact/moonstone/Heading';
import Scroller from '@enact/moonstone/Scroller';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

const EditableIntegerPickerWithAriaText = ({unit, ...props}) => {
	const [value, setValue] = useState(0);

	const handleChange = useCallback((ev) => setValue(ev.value), []);

	const text = 'The current length is ' + value + unit;

	return (
		<EditableIntegerPicker {...props} aria-valuetext={text} onChange={handleChange} />
	);
};

EditableIntegerPickerWithAriaText.propTypes = {
	defaultValue: PropTypes.number,
	unit: PropTypes.string
};

const EditableIntegerPickerView = () => (
	<Scroller focusableScrollbar>
		<Heading showLine>Default</Heading>
		<EditableIntegerPicker
			min={0}
			max={10}
		/>

		<Heading showLine>Vertical/Horizontal</Heading>
		<EditableIntegerPicker
			defaultValue={10}
			min={0}
			max={50}
			orientation="vertical"
			step={5}
			unit="cm"
		/>
		<EditableIntegerPicker
			defaultValue={10}
			min={0}
			max={50}
			step={5}
			unit="cm"
		/>

		<Heading showLine>Customizable aria-valuetext</Heading>
		<EditableIntegerPickerWithAriaText
			defaultValue={10}
			min={0}
			max={50}
			step={5}
			unit="cm"
		/>
	</Scroller>
);

export default EditableIntegerPickerView;
