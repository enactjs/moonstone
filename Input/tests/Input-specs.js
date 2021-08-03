import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../Input';

const isPaused = () => Spotlight.isPaused() ? 'paused' : 'not paused';

describe('Input Specs', () => {
	test('should have an input element', () => {
		render(<Input />);

		const expected = 'INPUT';
		const actual = screen.getByLabelText('Input field').lastElementChild.tagName;

		expect(actual).toBe(expected);
	});

	test('should include a placeholder if specified', () => {
		const placeholder = 'hello';
		render(<Input placeholder={placeholder} />);
		const input = screen.getByText('hello').nextElementSibling;

		const expectedAttribute = 'placeholder';

		expect(input).toHaveAttribute(expectedAttribute, placeholder);
	});

	test('should callback onChange when the text changes', () => {
		const handleChange = jest.fn();
		const value = 'blah';
		const evt = {target: {value: value}};
		render(<Input onChange={handleChange} />);
		const input = screen.getByLabelText('Input field').lastElementChild;

		fireEvent.change(input, evt);

		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(value);
	});

	test('should blur input on enter if dismissOnEnter', () => {
		const handleChange = jest.fn();
		render(<Input dismissOnEnter onBlur={handleChange} />);
		const input = screen.getByLabelText('Input field');

		userEvent.click(input);
		fireEvent.keyUp(input, {keyCode: 13, code:13});

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should be able to be disabled', () => {
		render(<Input disabled />);
		const input = screen.getByLabelText('Input field').lastElementChild;

		const expectedAttribute = 'disabled';

		expect(input).toHaveAttribute(expectedAttribute);
	});

	test('should reflect the value if specified', () => {
		render(<Input value="hello" />);
		const input = screen.getByText('hello').nextElementSibling;

		const expected = 'input';

		expect(input).toHaveClass(expected);
	});

	test('should have dir equal to rtl when there is rtl text', () => {
		render(<Input data-testid="input" value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />);
		const input = screen.getByTestId('input').lastElementChild;

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(input).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is ltr text', () => {
		render(<Input data-testid="input" value="content" />);
		const input = screen.getByTestId('input').lastElementChild;

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(input).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to rtl when there is rtl text in the placeholder', () => {
		render(<Input data-testid="input" placeholder="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי" />);
		const input = screen.getByTestId('input').lastElementChild;

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(input).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr when there is ltr text in the placeholder', () => {
		render(<Input data-testid="input" placeholder="content" />);
		const input = screen.getByTestId('input').lastElementChild;

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(input).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to rtl if ltr text in the placeholder, but rtl text in value', () => {
		render(
			<Input
				data-testid="input"
				placeholder="content"
				value="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי"
			/>
		);
		const input = screen.getByTestId('input').lastElementChild;

		const expectedAttribute = 'dir';
		const expectedValue = 'rtl';

		expect(input).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have dir equal to ltr if rtl text in the placeholder, but ltr text in value', () => {
		render(
			<Input
				data-testid="input"
				placeholder="שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקי"
				value="content"
			/>
		);
		const input = screen.getByTestId('input').lastElementChild;

		const expectedAttribute = 'dir';
		const expectedValue = 'ltr';

		expect(input).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should pause spotlight when input has focus', () => {
		render(<Input />);
		const input = screen.getByLabelText('Input field');

		fireEvent.mouseDown(input);

		const expected = 'paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should resume spotlight on unmount', () => {
		const {unmount} = render(<Input />);
		const input = screen.getByLabelText('Input field');

		fireEvent.mouseDown(input);
		unmount();

		const expected = 'not paused';
		const actual = isPaused();

		Spotlight.resume();

		expect(actual).toBe(expected);
	});

	test('should display invalid message if it invalid and invalid message exists', () => {
		render(<Input invalid invalidMessage="invalid message" />);
		const tooltip = screen.getByText('invalid message');

		const expected = 'tooltipLabel';

		expect(tooltip).toHaveClass(expected);
	});

	test('should not display invalid message if it is valid', () => {
		render(<Input invalidMessage="invalid message" />);
		const tooltip = screen.queryByText('invalid message');

		expect(tooltip).toBeNull();
	});

	test('should set voice intent if specified', () => {
		render(<Input data-webos-voice-intent="Select" />);
		const input = screen.getByLabelText('Input field').lastElementChild;

		const expectedAttribute = 'data-webos-voice-intent';
		const expectedValue = 'Select';

		expect(input).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set voice label if specified', () => {
		const label = 'input label';
		render(<Input data-webos-voice-label={label} />);
		const input = screen.getByLabelText('Input field').lastElementChild;

		const expectedAttribute = 'data-webos-voice-label';

		expect(input).toHaveAttribute(expectedAttribute, label);
	});
});
