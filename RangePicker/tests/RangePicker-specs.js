import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {RangePicker, RangePickerBase} from '../RangePicker';

describe('RangePicker Specs', () => {
	test('should render a single child with the current value', () => {
		render(<RangePicker min={-10} max={20} value={10} />);
		const textField = screen.getByText('10');

		const expected = 'item';

		expect(textField).toBeInTheDocument();
		expect(textField).toHaveClass(expected);
	});

	test('should increase by step amount on increment press', async () => {
		const user = userEvent.setup();

		render(<RangePicker min={0} max={100} defaultValue={10} step={1} noAnimation />);
		const incrementButton = screen.getByLabelText('10 next item');

		await user.click(incrementButton);

		const textField = screen.getByText('11');
		const expected = 'item';

		expect(textField).toBeInTheDocument();
		expect(textField).toHaveClass(expected);
	});

	test('should decrease by step amount on decrement press', async () => {
		const user = userEvent.setup();

		render(<RangePicker min={0} max={100} defaultValue={10} step={1} noAnimation />);
		const decrementButton = screen.getByLabelText('10 previous item');

		await user.click(decrementButton);

		const textField = screen.getByText('9');
		const expected = 'item';

		expect(textField).toBeInTheDocument();
		expect(textField).toHaveClass(expected);
	});

	test('should pad the value', () => {
		render(<RangePicker min={0} max={100} value={10} step={1} padded />);
		const textField = screen.getByText('010');

		const expected = 'item';

		expect(textField).toBeInTheDocument();
		expect(textField).toHaveClass(expected);
	});

	test('should pad the value when min has more digits than max', () => {
		render(<RangePicker min={-1000} max={100} value={10} step={1} padded />);
		const textField = screen.getByText('0010');

		const expected = 'item';

		expect(textField).toBeInTheDocument();
		expect(textField).toHaveClass(expected);
	});

	test('should be disabled when limited to a single value', () => {
		render(<RangePickerBase data-testid="rangePicker" min={0} max={0} value={0} />);
		const rangePicker = screen.getByTestId('rangePicker');

		const expectedAttribute = 'aria-disabled';
		const expectedValue = 'true';

		expect(rangePicker).toHaveAttribute(expectedAttribute, expectedValue);
	});
});
