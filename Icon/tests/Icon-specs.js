import {render, screen} from '@testing-library/react';

import {IconBase as Icon} from '../Icon';

describe('Icon Specs', () => {
	test('should return the correct Unicode value for named icon `star`', () => {
		render(<Icon data-testid="icon">star</Icon>);
		const icon = screen.getByTestId('icon');

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = icon.textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided `star` hex value', () => {
		render(<Icon data-testid="icon">0x0F0028</Icon>);
		const icon = screen.getByTestId('icon');

		const expected = 983080; // decimal converted charCode of character
		const actual = icon.textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided HTML entity as hex value', () => {
		render(<Icon data-testid="icon">&#x2605;</Icon>);
		const icon = screen.getByTestId('icon');

		const expected = 9733; // decimal converted charCode of character
		const actual = icon.textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided Unicode reference', () => {
		render(<Icon data-testid="icon">\u0F0028</Icon>);
		const icon = screen.getByTestId('icon');

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = icon.textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support high code point Unicode values', () => {
		render(<Icon data-testid="icon">{String.fromCodePoint(0x0F0028)}</Icon>);
		const icon = screen.getByTestId('icon');

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = icon.textContent.codePointAt();

		expect(actual).toBe(expected);
	});
});
