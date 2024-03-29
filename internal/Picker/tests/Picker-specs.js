import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Picker from '../Picker';
import PickerItem from '../PickerItem';

describe('Picker Specs', () => {
	test('should have a default \'value\' of 0', () => {
		render(<Picker index={0} max={0} min={0} />);
		const valueText = screen.getAllByRole('button')[0].nextElementSibling;

		const expectedValue = '0';
		const expectedAttribute = 'aria-valuetext';

		expect(valueText).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test(
		'should return an object {value: Number} that represents the next value of the Picker component when pressing the increment <span>',
		async () => {
			const handleChange = jest.fn();
			const user = userEvent.setup();
			render(<Picker index={0} max={1} min={-1} onChange={handleChange} value={0} />);
			const picker = screen.getByLabelText('0 next item').parentElement;

			await user.click(picker.firstElementChild);

			const expected = 1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should return an object {value: Number} that represents the next value of the Picker component when pressing the decrement <span>',
		async () => {
			const handleChange = jest.fn();
			const user = userEvent.setup();
			render(<Picker index={0} max={1} min={-1} onChange={handleChange} value={0} />);
			const picker = screen.getByLabelText('0 next item').parentElement;

			await user.click(picker.lastElementChild);

			const expected = -1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test('should not run the onChange handler when disabled', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker disabled index={0} max={0} min={0} onChange={handleChange} value={0} />);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.firstElementChild);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should wrap to the beginning of the value range if \'wrap\' is true', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={0} min={-1} onChange={handleChange} value={0} wrap />);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.firstElementChild);

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should wrap to the end of the value range if \'wrap\' is true', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={1} min={0} onChange={handleChange} value={0} wrap />);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.lastElementChild);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment by \'step\' value', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={6} min={0} onChange={handleChange} step={3} value={0} />);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.firstElementChild);

		const expected = 3;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={3} min={0} onChange={handleChange} step={3} value={3} />);
		const picker = screen.getByLabelText('3 next item').parentElement;

		await user.click(picker.lastElementChild);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment by \'step\' value and wrap successfully', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={3} min={0} onChange={handleChange} step={3} value={3} wrap />);
		const picker = screen.getByLabelText('3 next item').parentElement;

		await user.click(picker.firstElementChild);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value and wrap successfully', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={9} min={0} onChange={handleChange} step={3} value={0} wrap />);
		const picker = screen.getByLabelText('0 next item').parentElement;

		await user.click(picker.lastElementChild);

		const expected = 9;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should enable the increment button when there is a wrapped value to increment', () => {
		render(
			<Picker index={0} max={2} min={0} value={2} wrap />
		);

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'false';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should enable the decrement button when there is a wrapped value to decrement', () => {
		render(<Picker index={0} max={2} min={0} value={2} wrap />);

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'false';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should disable the increment button when there is no value to increment', () => {
		render(<Picker index={0} max={2} min={0} value={2} />);

		const expectedAttribute = 'disabled';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expectedAttribute);
	});

	test('should disable the decrement button when there is no value to decrement', () => {
		render(<Picker index={0} max={2} min={0} value={0} />);

		const expectedAttribute = 'disabled';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expectedAttribute);
	});

	test('should disable the increment and decrement buttons when wrapped and there is a single value', () => {
		render(<Picker index={0} max={0} min={0} value={0} wrap />);
		const incrementButton = screen.getAllByRole('button')[0];
		const decrementButton = screen.getAllByRole('button')[1];

		const expectedAttribute = 'disabled';

		expect(incrementButton).toHaveAttribute(expectedAttribute);
		expect(decrementButton).toHaveAttribute(expectedAttribute);
	});

	test('should allow keyboard decrement via left arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} value={0} />);
		const picker = screen.getByLabelText('0 change a value with left right button');

		const expected = -1;
		fireEvent.keyDown(picker, {keyCode: 37});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should allow keyboard increment via right arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} value={0} />);
		const picker = screen.getByLabelText('0 change a value with left right button');

		const expected = 1;
		fireEvent.keyDown(picker, {keyCode: 39});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should allow keyboard decrement via down arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />);
		const picker = screen.getByLabelText('0 change a value with up down button');

		const expected = -1;
		fireEvent.keyDown(picker, {keyCode: 40});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should allow keyboard decrement via up arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />);
		const picker = screen.getByLabelText('0 change a value with up down button');

		const expected = 1;
		fireEvent.keyDown(picker, {keyCode: 38});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard decrement via left arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />);
		const picker = screen.getByLabelText('0 change a value with up down button');

		const expected = 0;
		fireEvent.keyDown(picker, {keyCode: 37});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard increment via right arrow keys when \'joined\' and \'vertical\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="vertical" value={0} />);
		const picker = screen.getByLabelText('0 change a value with up down button');

		const expected = 0;
		fireEvent.keyDown(picker, {keyCode: 39});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard decrement via down arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0} />);
		const picker = screen.getByLabelText('0 change a value with left right button');

		const expected = 0;
		fireEvent.keyDown(picker, {keyCode: 40});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should not allow keyboard increment via up arrow keys when \'joined\' and \'horizontal\'', () => {
		const handleChange = jest.fn();
		render(<Picker index={0} joined max={1} min={-1} onChange={handleChange} orientation="horizontal" value={0} />);
		const picker = screen.getByLabelText('0 change a value with left right button');

		const expected = 0;
		fireEvent.keyDown(picker, {keyCode: 38});
		fireEvent.mouseDown(picker);
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	describe('accessibility', () => {
		test('should set the aria-label attribute properly in the next icon button', () => {
			render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const incrementButton = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';
			const expectedValue = '2 next item';

			expect(incrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-label attribute properly in the previous icon button', () => {
			render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const decrementButton = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';
			const expectedValue = '2 previous item';

			expect(decrementButton).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set the aria-valuetext attribute properly to read it when changing the value', () => {
			render(
				<Picker index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const pickerItem = screen.getByLabelText('2 next item').nextElementSibling;

			const expectedAttribute = 'aria-valuetext';
			const expectedValue = '2';

			expect(pickerItem).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should have aria-hidden=true when \'joined\' and not active', () => {
			render(
				<Picker index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getByRole('spinbutton', {hidden: true});

			const expectedAttribute = 'aria-hidden';
			const expectedValue = 'true';

			expect(picker).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should be aria-hidden=false when \'joined\' and active', () => {
			render(
				<Picker index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getByRole('spinbutton', {hidden: true});

			fireEvent.focus(picker);

			const expectedAttribute = 'aria-hidden';
			const expectedValue = 'false';

			expect(picker).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should set picker "decrementAriaLabel" to decrement button', () => {
			const label = 'custom decrement aria-label';
			render(
				<Picker decrementAriaLabel={label} index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getAllByRole('button')[1];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, label);
		});

		test('should set picker "incrementAriaLabel" to decrement button', () => {
			const label = 'custom increment aria-label';
			render(
				<Picker incrementAriaLabel={label} index={1} max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getAllByRole('button')[0];

			const expectedAttribute = 'aria-label';

			expect(picker).toHaveAttribute(expectedAttribute, label);
		});

		test('should set "aria-label" to joined picker', () => {
			const label = 'custom joined picker aria-label';
			render(
				<Picker aria-label={label} index={1} joined max={3} min={0} value={1}>
					<PickerItem>1</PickerItem>
					<PickerItem>2</PickerItem>
					<PickerItem>3</PickerItem>
					<PickerItem>4</PickerItem>
				</Picker>
			);
			const picker = screen.getByLabelText(label);

			expect(picker).toBeInTheDocument();
		});
	});
});
