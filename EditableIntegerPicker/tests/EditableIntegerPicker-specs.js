import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {EditableIntegerPicker, EditableIntegerPickerBase} from '../EditableIntegerPicker';

const isPaused = () => Spotlight.isPaused() ? 'paused' : 'not paused';

const tap = (node) => {
	fireEvent.mouseDown(node);
	fireEvent.mouseUp(node);
};

const decrement = () => tap(screen.getByText('-'));
const increment = () => tap(screen.getByText('+'));

describe('EditableIntegerPicker', () => {
	test('should render a child with the current value', () => {
		render(
			<EditableIntegerPicker
				decrementIcon={'minus'}
				defaultValue={10}
				incrementIcon={'plus'}
				max={100}
				min={0}
				step={1}
			/>
		);
		const pickerItem = screen.getByText('10');

		expect(pickerItem).toBeInTheDocument();
	});

	test('should increase by step amount on increment press', () => {
		render(
			<EditableIntegerPicker
				decrementIcon={'minus'}
				defaultValue={10}
				incrementIcon={'plus'}
				max={100}
				min={0}
				noAnimation
				step={10}
			/>
		);

		increment();

		const actual = screen.getByText('20');

		expect(actual).toBeInTheDocument();
	});

	test('should decrease by step amount on decrement press', () => {
		render(
			<EditableIntegerPicker
				decrementIcon={'minus'}
				defaultValue={10}
				incrementIcon={'plus'}
				max={100}
				min={0}
				noAnimation
				step={10}
			/>
		);

		decrement();

		const actual = screen.getByText('0');

		expect(actual).toBeInTheDocument();
	});

	test('should enable input field on click', () => {
		render(<EditableIntegerPicker defaultValue={10} max={100} min={0} step={1} />);

		userEvent.click(screen.getByText('10'));

		const inputField = screen.getByLabelText('undefined change a value with left right button').children.item(1);

		const expected = 'input';
		const actual = inputField.firstElementChild.firstElementChild;

		expect(actual).toHaveClass(expected);
	});

	test('should disable input field when blurred', () => {
		render(<EditableIntegerPicker min={0} max={100} defaultValue={10} step={1} />);

		userEvent.click(screen.getByText('10'));

		const input = screen.getByLabelText('undefined change a value with left right button').children.item(1);
		const inputField = input.children.item(0).children.item(0);

		fireEvent.focus(inputField);
		fireEvent.blur(inputField);

		expect(inputField).not.toBeInTheDocument();
	});

	test('should take value inputted and navigate to the value on blur', () => {
		render(
			<EditableIntegerPicker
				decrementIcon={'minus'}
				defaultValue={10}
				incrementIcon={'plus'}
				max={100}
				min={0}
				noAnimation
				step={1}
			/>
		);

		userEvent.click(screen.getByText('10'));

		const input = screen.getByLabelText('undefined change a value with left right button').children.item(1);
		const inputField = input.children.item(0).children.item(0);

		fireEvent.focus(inputField);
		userEvent.type(inputField, '38');
		fireEvent.blur(inputField);

		const actual = screen.getByText('38');

		expect(actual).toBeInTheDocument();
	});

	test('should send change event with correct value on blur', () => {
		const handleChange = jest.fn();
		render(
			<EditableIntegerPicker
				defaultValue={10}
				max={100}
				min={0}
				noAnimation
				onChange={handleChange}
				step={1}
			/>
		);

		userEvent.click(screen.getByText('10'));

		const input = screen.getByLabelText('undefined change a value with left right button').children.item(1);
		const inputField = input.children.item(0).children.item(0);

		fireEvent.focus(inputField);
		userEvent.type(inputField, '45');
		fireEvent.blur(inputField);

		const expected = 45;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not send change event with invalid value on blur', () => {
		const handleChange = jest.fn();
		render(
			<EditableIntegerPicker
				defaultValue={12}
				max={100}
				min={0}
				noAnimation
				onChange={handleChange}
				step={1}
			/>
		);

		userEvent.click(screen.getByText('12'));

		const input = screen.getByLabelText('undefined change a value with left right button').children.item(1);
		const inputField = input.children.item(0).children.item(0);

		fireEvent.focus(inputField);
		userEvent.type(inputField, 'invalid');
		fireEvent.blur(inputField);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should not send two change event when incrementing from edit mode', () => {
		const handleChange = jest.fn();
		render(
			<EditableIntegerPicker
				defaultValue={15}
				max={100}
				min={0}
				noAnimation
				onChange={handleChange}
				step={1}
			/>
		);

		userEvent.click(screen.getByText('15'));

		const input = screen.getByLabelText('undefined change a value with left right button').children.item(1);
		const inputField = input.children.item(0).children.item(0);

		fireEvent.focus(inputField);
		userEvent.type(inputField, '12');
		fireEvent.blur(inputField);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should enable input field when some number is typed on the picker', () => {
		render(<EditableIntegerPicker defaultValue={10} max={100} min={0} step={1} />);
		const input = screen.getByText('10');

		fireEvent.keyDown(input, {keyCode: 50});

		const inputField = screen.getByLabelText('undefined change a value with left right button').children.item(1);

		const expected = 'input';
		const actual = inputField.firstElementChild.firstElementChild;

		expect(actual).toHaveClass(expected);
	});

	test('should pause the spotlight when input is focused', () => {
		render(<EditableIntegerPicker defaultValue={11} max={100} min={0} step={1} />);

		userEvent.click(screen.getByText('11'));

		const input = screen.getByLabelText('undefined change a value with left right button').children.item(1);
		const inputField = input.children.item(0).children.item(0);

		fireEvent.focus(inputField);

		const expected = 'paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should resume the spotlight when input is blurred', () => {
		render(<EditableIntegerPicker defaultValue={13} max={100} min={0} step={1} />);

		userEvent.click(screen.getByText('13'));

		const input = screen.getByLabelText('undefined change a value with left right button').children.item(1);
		const inputField = input.children.item(0).children.item(0);

		fireEvent.focus(inputField);
		fireEvent.blur(inputField);

		const expected = 'not paused';
		const actual = isPaused();

		expect(actual).toBe(expected);
	});

	test('should be disabled when limited to a single value', () => {
		render(<EditableIntegerPickerBase max={0} min={0} value={0} />);
		const picker = screen.getByLabelText('0 next item');

		const expectedAttribute = 'disabled';

		expect(picker).toHaveAttribute(expectedAttribute);
	});
});
