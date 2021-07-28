import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {ItemBase} from '../Item';

describe('Item Specs', () => {
	test('should support adding text as a child', () => {
		const expected = 'Hello Item';
		render(<ItemBase>{expected}</ItemBase>);
		const actual = screen.getByText('Hello Item');

		expect(actual).toHaveTextContent(expected);
	});

	test('should apply `inline` class when inline', function () {
		render(<ItemBase inline>Hello Item</ItemBase>);

		const expected = 'inline';
		const actual = screen.getByText('Hello Item');

		expect(actual).toHaveClass(expected);
	});

	test('should have `aria-disabled=true` attribute when disabled', function () {
		render(<ItemBase disabled>Hello Item</ItemBase>);

		const expected = 'true';
		const actual = screen.getByText('Hello Item');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});
});
