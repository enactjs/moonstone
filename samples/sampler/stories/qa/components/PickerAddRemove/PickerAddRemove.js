import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import Picker from '@enact/moonstone/Picker';

const PickerAddRemove = ({...props}) => {
	const [children, setChildren] = useState({0 : ''});
	const [inputIndex, setInputIndex] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const [value, setValue] = useState(0);

	const handleAddReplace = useCallback(() => {
		const newChild = {};

		newChild[inputIndex] = inputValue || 'sample ' + inputIndex;
		const newChildren = Object.assign({}, children, newChild);

		setChildren(newChildren);
		setInputIndex(inputIndex + 1);
		setInputValue('');
	}, [children, inputIndex, inputValue]);

	const handleRemove = useCallback(() => {
		const newChildren = Object.assign({}, children);
		delete newChildren[inputIndex];

		setChildren(newChildren);
		setValue(Math.max(value - 1, 0));
	}, [children, inputIndex, value]);

	const handleValueUpdate = useCallback(({value: newValue}) => {
		setValue(newValue);
	}, []);

	const handleIndexChange = useCallback(({value: newValue}) => {
		let index = parseInt(newValue);
		if (isNaN(index)) {
			index = 0;
		}
		setInputIndex(index);
	}, []);

	const handleValueChange = useCallback(({value: newValue}) => {
		setInputValue(newValue);
	}, []);

	const pickerChildren = Object.values(children);

	return (
		<div>
			<div>
				<Picker
					onChange={handleValueUpdate}
					value={value}
					{...props}
				>
					{pickerChildren}
				</Picker>
			</div>
			<div>
				Value:
				<Input
					onChange={handleValueChange}
					placeholder="value"
					value={inputValue}
				/>
			</div>
			<div>
				Index:
				<Input
					onChange={handleIndexChange}
					placeholder="index"
					value={inputIndex}
				/>
			</div>
			<Button onClick={handleAddReplace}>
				Add/Replace
			</Button>
			<Button onClick={handleRemove}>
				Remove
			</Button>
		</div>
	);
};

PickerAddRemove.propTypes = {
	disabled: PropTypes.bool,
	joined: PropTypes.bool,
	noAnimation: PropTypes.bool,
	orientation: PropTypes.string,
	width: PropTypes.string,
	wrap: PropTypes.bool
};

PickerAddRemove.defaultProps = {
	disabled: false,
	joined: false,
	noAnimation: false,
	orientation: 'horizontal',
	width: 'medium',
	wrap: false
};

export default PickerAddRemove;
