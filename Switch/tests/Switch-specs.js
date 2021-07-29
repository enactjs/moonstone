import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should not have `selected` className by default', () => {
		render(<SwitchBase selected>Toggle me</SwitchBase>);

		const expected = 'selected';
		const actual = screen.getByText('Toggle me').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have `selected` className when selected is true', () => {
		render(<SwitchBase selected>Toggle me</SwitchBase>);

		const expected = 'selected';
		const actual = screen.getByText('Toggle me').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have `animated` className by default', () => {
		render(<SwitchBase>Toggle me</SwitchBase>);

		const expected = 'animated';
		const actual = screen.getByText('Toggle me').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should not have `animated` className when noAnimation is true', () => {
		render(<SwitchBase noAnimation>Toggle me</SwitchBase>);

		const unexpected = 'animated';
		const actual = screen.getByText('Toggle me').parentElement;

		expect(actual).not.toHaveClass(unexpected);
	});

	test('toggle Switch', () => {
		const handleToggle = jest.fn();
		render(<Switch onToggle={handleToggle}>Toggle me</Switch>);

		const actual = screen.getByText('Toggle me').parentElement;

		fireEvent.mouseDown(actual);
		fireEvent.mouseUp(actual);

		const expectedTimes = 1;
		expect(handleToggle).toBeCalledTimes(expectedTimes);
	});
});
