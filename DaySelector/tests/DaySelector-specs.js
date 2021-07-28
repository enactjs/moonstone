import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import DaySelector from '../DaySelector';

const tap = (node) => {
	fireEvent.mouseDown(node);
	fireEvent.mouseUp(node);
	fireEvent.click(node);
};

describe('DaySelector', () => {

	test('should set selected prop to true for the item that is selected by default', () => {
		render(<DaySelector defaultSelected={0} />);
		const daySelector = screen.getAllByRole('checkbox')[0].children.item(0).children.item(0);

		const expectedAttribute = 'selected';

		expect(daySelector).toHaveClass(expectedAttribute);
	});

	test('should fire onSelect when a day is selected', () => {
		const handleSelect = jest.fn();
		render(<DaySelector onSelect={handleSelect} />);
		const item = screen.getAllByRole('checkbox')[0];

		tap(item);

		expect(handleSelect).toHaveBeenCalled();
	});

	test('should fire onSelect with the correct content when a day is selected', () => {
		const handleSelect = jest.fn();
		render(
			<DaySelector onSelect={handleSelect} />
		);
		const item = screen.getAllByRole('checkbox')[6];

		tap(item);

		const expected = 'Sat';
		const actual = handleSelect.mock.calls[0][0].content;

		expect(actual).toBe(expected);
	});

	test('should use the full string format when dayNameLength is `full`', () => {
		const handleSelect = jest.fn();
		render(
			<DaySelector dayNameLength="full" onSelect={handleSelect} />
		);
		const item = screen.getAllByRole('checkbox')[6];

		tap(item);

		const expected = 'Saturday';
		const actual = handleSelect.mock.calls[0][0].content;

		expect(actual).toBe(expected);
	});

	test('should set selected content as Every Day when every day is selected', () => {
		const handleSelect = jest.fn();
		render(
			<DaySelector
				defaultSelected={[0, 1, 2, 3, 4, 5]}
				onSelect={handleSelect}
			/>
		);
		const item = screen.getAllByRole('checkbox')[6];

		tap(item);

		const expected = 'Every Day';
		const actual = handleSelect.mock.calls[0][0].content;

		expect(actual).toBe(expected);
	});

	test('should set selected content as Every Weekday when every weekday is selected', () => {
		const handleSelect = jest.fn();
		render(
			<DaySelector
				defaultSelected={[1, 2, 3, 4]}
				onSelect={handleSelect}
			/>
		);
		const item = screen.getAllByRole('checkbox')[5];

		tap(item);

		const expected = 'Every Weekday';
		const actual = handleSelect.mock.calls[0][0].content;

		expect(actual).toBe(expected);
	});

	test('should set selected content as Every Weekend when every weekend is selected', () => {
		const handleSelect = jest.fn();
		render(
			<DaySelector defaultSelected={[0]} onSelect={handleSelect} />
		);
		const item = screen.getAllByRole('checkbox')[6];

		tap(item);

		const expected = 'Every Weekend';
		const actual = handleSelect.mock.calls[0][0].content;

		expect(actual).toBe(expected);
	});

	test('should render updated day name length', () => {
		const {rerender} = render(<DaySelector dayNameLength={'full'} />);

		rerender(<DaySelector dayNameLength={'short'} />);

		const expected = '✓S✓M✓T✓W✓T✓F✓S';
		const actual = screen.getByRole('group').textContent;

		expect(actual).toBe(expected);
	});

	test('should have prop disabled when `disable` is true.', () => {
		render(<DaySelector disabled />);
		const daySelector = screen.getByRole('group');

		const expectedAttribute = 'disabled';

		expect(daySelector).toHaveAttribute(expectedAttribute);
	});
});
