import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import ExpandablePicker from '../ExpandablePicker';

const tap = (node) => {
	fireEvent.mouseDown(node);
	fireEvent.mouseUp(node);
};

describe('ExpandablePicker Specs', () => {
	const children = ['option1', 'option2', 'option3'];

	test('should close onChange', () => {
		render(
			<ExpandablePicker data-testid="expandablePicker" defaultOpen title="Options">
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByText('✓');
		tap(checkButton);

		const expected = 'open';
		const actual = screen.getByTestId('expandablePicker');

		expect(actual).not.toHaveClass(expected);
	});

	test('should include value in onChange when value is specified', () => {
		const value = 2;
		const handleChange = jest.fn();
		render(
			<ExpandablePicker onChange={handleChange} open title="Options" value={value}>
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByText('✓');
		tap(checkButton);

		const expected = value;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should include default value in onChange when value is not specified', () => {
		const value = 0;
		const handleChange = jest.fn();
		render(
			<ExpandablePicker onChange={handleChange} open title="Options">
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByText('✓');
		tap(checkButton);

		const expected = value;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should set "checkButtonAriaLabel" to check button', () => {
		const label = 'custom check button aria-label';
		render(
			<ExpandablePicker checkButtonAriaLabel={label} open title="Options">
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByLabelText(label);

		const expected = '✓';

		expect(checkButton).toHaveTextContent(expected);
	});

	test('should set "decrementAriaLabel" to previous button', () => {
		const label = 'custom previous button aria-label';
		render(
			<ExpandablePicker decrementAriaLabel={label} open title="Options">
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByLabelText(label);

		const expected = 'button decrementer';

		expect(checkButton).toHaveClass(expected);
	});

	test('should set "incrementAriaLabel" to next button', () => {
		const label = 'custom next button aria-label';
		render(
			<ExpandablePicker incrementAriaLabel={label} open title="Options">
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByLabelText(label);

		const expected = 'button incrementer';

		expect(checkButton).toHaveClass(expected);
	});

	test('should set "pickerAriaLabel" to joined picker', () => {
		const label = 'custom joined picker aria-label';
		render(
			<ExpandablePicker joined open pickerAriaLabel={label} title="Options">
				{children}
			</ExpandablePicker>
		);
		const joinedPicker = screen.getByLabelText(label);

		const expected = 'picker joined';

		expect(joinedPicker).toHaveClass(expected);
	});

	test('should set "data-webos-voice-disabled" to decrement button when voice control is disabled', () => {
		render(
			<ExpandablePicker data-webos-voice-disabled decrementAriaLabel="decrementer" open title="Options">
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByLabelText('decrementer');

		const expectedAttribute = 'data-webos-voice-disabled';
		const expectedValue = 'true';

		expect(checkButton).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set "data-webos-voice-disabled" to increment button when voice control is disabled', () => {
		render(
			<ExpandablePicker data-webos-voice-disabled incrementAriaLabel="incrementer" open title="Options">
				{children}
			</ExpandablePicker>
		);
		const checkButton = screen.getByLabelText('incrementer');

		const expectedAttribute = 'data-webos-voice-disabled';
		const expectedValue = 'true';

		expect(checkButton).toHaveAttribute(expectedAttribute, expectedValue);
	});
});
