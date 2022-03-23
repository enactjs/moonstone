import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {DropdownBase} from '../Dropdown';
import DropdownList from '../DropdownList';

const FloatingLayerController = FloatingLayerDecorator('div');

const children = ['option1', 'option2', 'option3'];
const title = 'Dropdown select';

describe('Dropdown', () => {
	test('should have `title`', () => {
		render(
			<DropdownBase title={title}>
				{children}
			</DropdownBase>
		);

		const actual = within(screen.getByRole('button')).getByText(title);

		expect(actual).toBeInTheDocument();
	});

	test('should have `title` when `children` is invalid', () => {
		render(
			<DropdownBase title={title}>
				{null}
			</DropdownBase>
		);

		const actual = screen.getByText(title);

		expect(actual).toBeInTheDocument();
	});

	test('should have `title` that reflects `selected` option', () => {
		const selectedIndex = 1;
		render(
			<DropdownBase selected={selectedIndex} title={title}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(children[selectedIndex]);

		expect(actual).toBeInTheDocument();
	});

	test('should have `title` when `selected` is invalid', () => {
		render(
			<DropdownBase selected={-1} title={title}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(title);

		expect(actual).toBeInTheDocument();
	});

	test('should be disabled when `children` is omitted', () => {
		render(
			<DropdownBase title={title} />
		);

		const expected = 'true';
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});

	test('should be disabled when there are no `children`', () => {
		render(
			<DropdownBase title={title}>
				{[]}
			</DropdownBase>
		);

		const expected = 'true';
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});

	test('should update when children are removed or added', () => {
		const {rerender} = render(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{children}
				</DropdownBase>
			</FloatingLayerController>
		);

		const lessChildren = children.slice(0, -1);

		rerender(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{lessChildren}
				</DropdownBase>
			</FloatingLayerController>
		);

		const lessChildrenExpected = 2;
		const lessChildrenActual = screen.getByRole('group').children;

		expect(lessChildrenActual).toHaveLength(lessChildrenExpected);

		const moreChildren = children.concat('option3');

		rerender(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{moreChildren}
				</DropdownBase>
			</FloatingLayerController>
		);

		const moreChildrenExpected = 3;
		const moreChildrenActual = screen.getByRole('group').children;

		expect(moreChildrenActual).toHaveLength(moreChildrenExpected);
	});

	test('should set the `role` of items to "checkbox"', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{['item']}
				</DropdownBase>
			</FloatingLayerController>
		);

		const expected = 'item listItem';
		const actual = screen.getByRole('checkbox');

		expect(actual).toBeInTheDocument();
		expect(actual).toHaveClass(expected);
	});

	test('should set the `aria-checked` state of the `selected` item', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open selected={0} title={title}>
					{['item']}
				</DropdownBase>
			</FloatingLayerController>
		);

		const expected = 'true';
		const actual = screen.getByRole('checkbox');

		expect(actual).toHaveAttribute('aria-checked', expected);
	});

	test('should pass through members of child objects to props for each item', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{[{
						disabled: true,
						children: 'child',
						key: 'item-0'
					}]}
				</DropdownBase>
			</FloatingLayerController>
		);

		const expected = 'true';
		const actual = screen.getByRole('checkbox');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});

	test('should allow members in child object to override injected aria values', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open selected={0} title={title}>
					{[{
						disabled: true,
						children: 'child',
						key: 'item-0',
						role: 'button',
						'aria-checked': false
					}]}
				</DropdownBase>
			</FloatingLayerController>
		);

		const actual = within(screen.getByRole('group')).getByRole('button');

		expect(actual).toHaveAttribute('aria-checked', 'false');
	});

	describe('DropdownList', () => {
		test('should include `data` and `selected` in `onSelect` callback', () => {
			const handler = jest.fn();
			render(
				<DropdownList onSelect={handler}>
					{children}
				</DropdownList>
			);
			const firstItem = screen.getByRole('group').children[0].children[0];

			userEvent.click(firstItem);

			const expected = {data: 'option1', selected: 0};
			const actual = handler.mock.calls[0][0];

			expect(actual).toEqual(expected);
		});
	});
});
