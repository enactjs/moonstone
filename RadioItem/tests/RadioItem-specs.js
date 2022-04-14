import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import RadioItem from '../RadioItem';

describe('RadioItem Specs', () => {
	test('should render correct icon when not selected', () => {
		render(<RadioItem>Hello RadioItem</RadioItem>);

		const expected = 'false';
		const radioItem = screen.getByRole('checkbox');

		expect(radioItem).toHaveAttribute('aria-checked', expected);
	});

	test('should render correct icon when selected', () => {
		render(<RadioItem selected>Hello RadioItem</RadioItem>);

		const expected = 'true';
		const radioItem = screen.getByRole('checkbox');

		expect(radioItem).toHaveAttribute('aria-checked', expected);
	});

});
