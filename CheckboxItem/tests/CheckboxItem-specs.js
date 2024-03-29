import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxItem, {CheckboxItemBase} from '../CheckboxItem';

describe('CheckboxItem Specs', () => {
	test('should support a custom icon', () => {
		render(<CheckboxItemBase data-testid="checkbox" icon="music">Hello CheckboxItem</CheckboxItemBase>);

		const checkboxItem = screen.getByRole('checkbox');

		const actual = checkboxItem.textContent.codePointAt();
		const expected = 983138; // decimal converted charCode of Unicode 'music' character

		expect(actual).toBe(expected);
	});

	test('should have correct text', () => {
		render(<CheckboxItemBase>Hello CheckboxItem</CheckboxItemBase>);

		const element = screen.getByText(/Hello CheckboxItem/i);

		expect(element).toBeInTheDocument();
	});

	test('should check with click', async () => {
		const user = userEvent.setup();

		render(<CheckboxItem>Hello CheckboxItem</CheckboxItem>);

		const checkboxItem = screen.getByRole('checkbox');
		const expected = 'true';

		await user.click(checkboxItem);

		expect(checkboxItem).toHaveAttribute('aria-checked', expected);

	});

	test('should uncheck with 2 click', async () => {
		const user = userEvent.setup();

		render(<CheckboxItem>Hello CheckboxItem</CheckboxItem>);

		const checkboxItem = screen.getByRole('checkbox');
		const expected = 'false';

		await user.click(checkboxItem);
		await user.click(checkboxItem);

		expect(checkboxItem).toHaveAttribute('aria-checked', expected);
	});
});
