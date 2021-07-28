import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SwitchItem, {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem Specs', () => {
	test('should contain a Switch', () => {
		render(<SwitchItemBase />);

		const expected = 'switch';
		const actual = screen.getByRole('checkbox').children[2].children[0];

		expect(actual).toHaveClass(expected);
	});

	test('should pass disabled to Switch element', () => {
		render(<SwitchItemBase disabled />);

		const expected = 'true';
		const SwitchItemElement = screen.getByRole('checkbox');

		expect(SwitchItemElement).toHaveAttribute('aria-disabled', expected);
	});

	test('should toggle Switch', () => {
		const handleToggle = jest.fn();
		render(<SwitchItem onToggle={handleToggle} />);

		const actual = screen.getByRole('checkbox');

		userEvent.click(actual);

		expect(actual).toBeChecked();

		const expectedTimes = 1;
		expect(handleToggle).toBeCalledTimes(expectedTimes);
	});

	test('should render correct children', () => {
		render(<SwitchItem>Hello SwitchItem</SwitchItem>);
		const Child = screen.getByText(/Hello SwitchItem/i);

		expect(Child).toBeInTheDocument();
	});
});
