import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IndexedBreadcrumbs from '../IndexedBreadcrumbs';

describe('IndexedBreadcrumbs', () => {
	// Suite-wide setup

	test('should generate {index} breadcrumbs when {index} <= {max}', () => {
		const index = 3;
		const max = 5;
		const breadcrumbs = IndexedBreadcrumbs('id', index, max);

		const expected = index;
		const actual = breadcrumbs.length;

		expect(actual).toBe(expected);
	});

	test('should generate {max} breadcrumbs when {index} > {max}', () => {
		const index = 6;
		const max = 1;
		const breadcrumbs = IndexedBreadcrumbs('id', index, max);

		const expected = max;
		const actual = breadcrumbs.length;

		expect(actual).toBe(expected);
	});

	test('should pad indices less than 10 with 0', () => {
		const breadcrumbs = IndexedBreadcrumbs('id', 1, 5);

		const expected = '01';
		// React creates two children, one for '<' and one for the index label
		const actual = breadcrumbs[0].props.children[1];

		expect(actual).toBe(expected);
	});

	test.skip('should call {onBreadcrumbClick} once when breadcrumb is clicked', () => {
		const handleClick = jest.fn();
		render(
			<nav>
				{IndexedBreadcrumbs('id', 1, 1, handleClick)}
			</nav>
		);

		const breadcrumb = screen.getByLabelText('GO TO PREVIOUS');
		userEvent.click(breadcrumb);

		expect(handleClick).toHaveBeenCalled();
	});
});
