import ilib from 'ilib';
import DateFmt from 'ilib/lib/DateFmt';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker from '../DatePicker';

const dateToLocaleString = (date) => new DateFmt({
	date: 'dmwy',
	length: 'full',
	timezone: 'local',
	useNative: false
}).format(date);

describe('DatePicker', () => {
	test('should not generate a label when value is undefined', () => {
		render(<DatePicker data-testid="datePicker" title="Date" />);

		const expected = 1;
		const actual = screen.getByTestId('datePicker').children.item(0).children;

		expect(actual).toHaveLength(expected);
	});

	test('should emit an onChange event when changing a component picker', () => {
		const handleChange = jest.fn();
		render(
			<DatePicker
				locale="en-US"
				onChange={handleChange}
				open
				title="Date"
				value={new Date(2000, 6, 15)}
			/>
		);
		const monthPickerUp = screen.getByLabelText('7 month change a value with up down button').children.item(0);

		userEvent.click(monthPickerUp);

		const expected = 1;

		expect(handleChange).toBeCalledTimes(expected);
	});

	test('should omit labels when noLabels is true', () => {
		render(
			<DatePicker
				data-testid="datePicker"
				day={1}
				maxDays={31}
				maxMonths={12}
				month={1}
				noLabels
				open
				order={['m', 'd', 'y']}
				title="Date"
				year={2000}
			/>
		);

		const dayLabel = screen.queryByText('day');
		const monthLabel = screen.queryByText('month');
		const yearLabel = screen.queryByText('year');

		expect(dayLabel).toBeNull();
		expect(monthLabel).toBeNull();
		expect(yearLabel).toBeNull();
	});

	test('should create pickers arranged by order', () => {
		render(
			<DatePicker
				day={1}
				maxDays={31}
				month={1}
				maxMonths={12}
				year={2000}
				order={['m', 'd', 'y']}
				open
				title="Date"
			/>
		);
		const dateComponent = screen.getByText('day').parentElement.parentElement;

		const expectedFirst = 'month';
		const actualFirst = dateComponent.children.item(0);
		const expectedSecond = 'day';
		const actualSecond = dateComponent.children.item(1);
		const expectedThird = 'year';
		const actualThird = dateComponent.children.item(2);

		expect(actualFirst).toHaveClass(expectedFirst);
		expect(actualSecond).toHaveClass(expectedSecond);
		expect(actualThird).toHaveClass(expectedThird);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(<DatePicker locale="en-US" open title="Date" value={new Date(2000, 8, 12)} />);
		const year = screen.getByText('2000');

		const expected = 'item';

		expect(year).toBeInTheDocument();
		expect(year).toHaveClass(expected);
	});

	test('should set "dayAriaLabel" to day picker', () => {
		const label = 'custom day aria-label';
		render(
			<DatePicker
				dayAriaLabel={label}
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 8, 12)}
			/>
		);
		const dayPicker = screen.getByLabelText(label).parentElement;

		const expected = 'day';

		expect(dayPicker).toBeInTheDocument();
		expect(dayPicker).toHaveClass(expected);
	});

	test('should set "monthAriaLabel" to month picker', () => {
		const label = 'custom month aria-label';
		render(
			<DatePicker
				locale="en-US"
				monthAriaLabel={label}
				open
				title="Date"
				value={new Date(2000, 8, 12)}
			/>
		);
		const monthPicker = screen.getByLabelText(label).parentElement;

		const expected = 'month';

		expect(monthPicker).toBeInTheDocument();
		expect(monthPicker).toHaveClass(expected);
	});

	test('should set "yearAriaLabel" to year picker', () => {
		const label = 'custom year aria-label';
		render(
			<DatePicker
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 8, 12)}
				yearAriaLabel={label}
			/>
		);
		const yearPicker = screen.getByLabelText(label).parentElement;

		const expected = 'year';

		expect(yearPicker).toBeInTheDocument();
		expect(yearPicker).toHaveClass(expected);
	});

	test('should set "dayLabel" to day picker', () => {
		const label = 'custom day label';
		render(
			<DatePicker
				dayLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1)}
			/>
		);
		const dayPicker = screen.getByText(label).parentElement;

		const expected = 'day';

		expect(dayPicker).toHaveClass(expected);
	});

	test('should set "monthLabel" to month picker', () => {
		const label = 'custom month label';
		render(
			<DatePicker
				monthLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1)}
			/>
		);
		const monthPicker = screen.getByText(label).parentElement;

		const expected = 'month';

		expect(monthPicker).toHaveClass(expected);
	});

	test('should set "yearLabel" to year picker', () => {
		const label = 'custom year label';
		render(
			<DatePicker
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 0, 1)}
				yearLabel={label}
			/>
		);
		const yearPicker = screen.getByText(label).parentElement;

		const expected = 'year';

		expect(yearPicker).toHaveClass(expected);
	});

	test('should set "data-webos-voice-disabled" to day picker when voice control is disabled', () => {
		render(
			<DatePicker
				data-webos-voice-disabled
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 1, 1)}
			/>
		);
		const dayPicker = screen.getByLabelText('1 day change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(dayPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to month picker when voice control is disabled', () => {
		render(
			<DatePicker
				data-webos-voice-disabled
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 0, 1)}
			/>
		);
		const monthPicker = screen.getByLabelText('1 month change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(monthPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to year picker when voice control is disabled', () => {
		render(
			<DatePicker
				data-webos-voice-disabled
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 1, 1)}
			/>
		);
		const yearPicker = screen.getByLabelText('2000 year change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(yearPicker).toHaveAttribute(expected);
	});

	test('should format the date label to locale `en-US`', () => {
		const date = new Date(2000, 0, 1);
		render(<DatePicker locale="en-US" open title="Date" value={date} />);
		const header = screen.getByText(dateToLocaleString(date)).parentElement.parentElement;

		const expected = 'label';

		expect(header).toHaveClass(expected);
	});

	test('should format the date label to locale `ar-SA`', () => {
		ilib.setLocale('ar-SA');
		const date = new Date(2000, 0, 1);
		render(<DatePicker locale="ar-SA" open title="Date" value={date} />);
		const header = screen.getByText(dateToLocaleString(date)).parentElement.parentElement;

		const expected = 'label';

		expect(header).toHaveClass(expected);
	});
});
