import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import SelectableItem from '../SelectableItem';

describe('SelectableItem Specs', () => {
	test('should render no icon when not selected', () => {
		render(<SelectableItem>Hello SelectableItem</SelectableItem>);

		const expected = 'selected';
		const actual = screen.getByRole('checkbox').children[0].children[0];

		expect(actual).not.toHaveClass(expected);
	});

	test('should render correct icon when selected', () => {
		render(<SelectableItem selected>Hello SelectableItem</SelectableItem>);

		const expected = 'selected';
		const actual = screen.getByRole('checkbox').children[0].children[0];

		expect(actual).toHaveClass(expected);
	});

});
