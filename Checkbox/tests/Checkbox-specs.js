import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Checkbox, {CheckboxBase} from '../Checkbox';

describe('Checkbox Specs', () => {
	test('should not include the selected class when not selected', () => {
		render(<CheckboxBase data-testid="checkbox" />);

		const checkboxElement = screen.getByTestId('checkbox');

		expect(checkboxElement.className).not.toContain('selected');
	});

	test('should add the selected class when given the selected prop', () => {
		render(<CheckboxBase data-testid="checkbox" selected />);
		const checkboxElement = screen.getByTestId('checkbox');

		const expected = 'selected';

		expect(checkboxElement).toHaveClass(expected);
	});


	test('should check the checkbox with one click', () => {
		render(<Checkbox data-testid="checkbox" />);

		const checkboxItem = screen.getByTestId('checkbox');
		const expected = 'selected';

		fireEvent.click(checkboxItem);

		expect(checkboxItem).toHaveClass(expected);
	});

	test('should uncheck the checkbox with two clicks', () => {
		render(<Checkbox data-testid="checkbox" />);

		const actual = screen.getByTestId('checkbox');
		const expected = 'selected';

		fireEvent.click(actual);
		fireEvent.click(actual);

		expect(actual).not.toHaveClass(expected);
	});
});
