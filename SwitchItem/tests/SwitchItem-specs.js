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

	test('should pass selected to Switch element', () => {
		render(<SwitchItemBase selected />);

		const expected = 'selected';
		const SwitchElement = screen.getByRole('checkbox').children[2].children[0];

		expect(SwitchElement).toHaveClass(expected);
	});

	test('should pass disabled to Switch element', () => {
		render(<SwitchItemBase disabled />);

		const expected = 'true';
		const SwitchItemElement = screen.getByRole('checkbox');

		expect(SwitchItemElement).toHaveAttribute('aria-disabled', expected);
	});

	test('should toggle Switch', async () => {
		const handleToggle = jest.fn();
		const user = userEvent.setup();

		render(<SwitchItem onToggle={handleToggle} />);

		const actual = screen.getByRole('checkbox');

		await user.click(actual);

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
