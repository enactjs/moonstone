import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import IconButton from '../IconButton';

describe('IconButton Specs', () => {
	test('should apply same `size` prop to both <Icon> and <Button> children', () => {
		render(<IconButton size="small">star</IconButton>);
		const button = screen.getByRole('button');
		const icon = button.lastElementChild.firstElementChild;

		const expected = 'small';

		expect(button).toHaveClass(expected);
		expect(icon).toHaveClass(expected);
	});

	test('should always maintain minWidth=false for its <Button> child', () => {
		render(<IconButton minWidth>star</IconButton>);
		const button = screen.getByRole('button');

		const notExpected = 'minWidth';

		expect(button).not.toHaveClass(notExpected);
	});
});
