import ilib from 'ilib';
import DateFmt from 'ilib/lib/DateFmt';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TimePicker from '../TimePicker';

const timeToLocaleString = (date) => new DateFmt({
	date: 'dmwy',
	length: 'full',
	timezone: 'local',
	type: 'time',
	useNative: false
}).format(date);

describe('TimePicker', () => {
	test('should not generate a label when value is undefined', () => {
		render(<TimePicker data-testid="timePicker" title="Time" />);

		const expected = 1;
		const actual = screen.getByTestId('timePicker').children.item(0).children;

		expect(actual).toHaveLength(expected);
	});

	test('should emit an onChange event when changing a component picker', () => {
		const handleChange = jest.fn();
		render(
			<TimePicker
				locale="en-US"
				onChange={handleChange}
				open
				title="Time"
				value={new Date(2000, 6, 15, 3, 30)}
			/>
		);

		const hourPickerUp = screen.getByLabelText('3 hour change a value with up down button').children.item(0);

		userEvent.click(hourPickerUp);

		const expected = 1;

		expect(handleChange).toBeCalledTimes(expected);
	});

	test('should omit labels when noLabels is true', () => {
		render(
			<TimePicker
				hour={1}
				meridiem={0}
				meridiems={['am', 'pm']}
				minute={1}
				noLabels
				open
				order={['h', 'm', 'a']}
				title="Time"
			/>
		);

		const hourLabel = screen.queryByText('hour');
		const minuteLabel = screen.queryByText('minute');
		const meridiemLabel = screen.queryByText('AM / PM');

		expect(hourLabel).toBeNull();
		expect(minuteLabel).toBeNull();
		expect(meridiemLabel).toBeNull();
	});

	test('should create pickers arranged by order', () => {
		render(
			<TimePicker
				hour={1}
				meridiem={0}
				meridiems={['am', 'pm']}
				minute={1}
				open
				order={['h', 'm', 'a']}
				title="Time"
			/>
		);
		const dateComponent = screen.getByText('minute').parentElement.parentElement;

		const expectedFirst = 'hourComponents';
		const actualFirst = dateComponent.children.item(0);
		const expectedSecond = 'minutesComponents';
		const actualSecond = dateComponent.children.item(1);
		const expectedThird = 'meridiemComponent';
		const actualThird = dateComponent.children.item(2);

		expect(actualFirst).toHaveClass(expectedFirst);
		expect(actualSecond).toHaveClass(expectedSecond);
		expect(actualThird).toHaveClass(expectedThird);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(
			<TimePicker
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const minutes = screen.getByText('30');

		const expected = 'item';

		expect(minutes).toBeInTheDocument();
		expect(minutes).toHaveClass(expected);
	});

	test('should set `hourAriaLabel` to hour picker', () => {
		const label = 'custom hour aria-label';
		render(
			<TimePicker
				hourAriaLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const hourPicker = screen.getByLabelText(label).parentElement;

		const expected = 'hourComponents';

		expect(hourPicker).toBeInTheDocument();
		expect(hourPicker).toHaveClass(expected);
	});

	test('should set `meridiemAriaLabel` to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		render(
			<TimePicker
				meridiemAriaLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const meridiemPicker = screen.getByLabelText(label).parentElement;

		const expected = 'meridiemComponent';

		expect(meridiemPicker).toBeInTheDocument();
		expect(meridiemPicker).toHaveClass(expected);
	});

	test('should set `minuteAriaLabel` to minute picker', () => {
		const label = 'custom minute aria-label';
		render(
			<TimePicker
				minuteAriaLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const minutePicker = screen.getByLabelText(label).parentElement;

		const expected = 'minutesComponents';

		expect(minutePicker).toBeInTheDocument();
		expect(minutePicker).toHaveClass(expected);
	});

	test('should set `hourLabel` to hour picker', () => {
		const label = 'custom hour label';
		render(
			<TimePicker
				hourLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const hourPicker = screen.getByText(label).parentElement;

		const expected = 'hourComponents';

		expect(hourPicker).toHaveClass(expected);
	});

	test('should set `meridiemLabel` to meridiem picker', () => {
		const label = 'custom meridiem label';
		render(
			<TimePicker
				meridiemLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const meridiemPicker = screen.getByText(label).parentElement;

		const expected = 'meridiemComponent';

		expect(meridiemPicker).toHaveClass(expected);
	});

	test('should set `minuteLabel` to minute picker', () => {
		const label = 'custom minute label';
		render(
			<TimePicker
				minuteLabel={label}
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const minutePicker = screen.getByText(label).parentElement;

		const expected = 'minutesComponents';

		expect(minutePicker).toHaveClass(expected);
	});

	test('should set `data-webos-voice-disabled` to hour picker when voice control is disabled', () => {
		render(
			<TimePicker
				data-webos-voice-disabled
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const hourPicker = screen.getByLabelText('12 hour change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(hourPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to merdiem picker when voice control is disabled', () => {
		render(
			<TimePicker
				data-webos-voice-disabled
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const merdiemPicker = screen.getByLabelText('PM change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(merdiemPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to minute picker when voice control is disabled', () => {
		render(
			<TimePicker
				data-webos-voice-disabled
				locale="en-US"
				open
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const minutePicker = screen.getByLabelText('30 minute change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(minutePicker).toHaveAttribute(expected);
	});

	test('should format the time label to locale `en-US`', () => {
		const date = new Date(2000, 0, 1, 12, 30);
		render(<TimePicker locale="en-US" open title="Date" value={date} />);
		const header = screen.getByText(timeToLocaleString(date)).parentElement.parentElement;

		const expected = 'label';

		expect(header).toHaveClass(expected);
	});

	test('should format the time label to locale `ar-SA`', () => {
		ilib.setLocale('ar-SA');
		const date = new Date(2000, 0, 1, 12, 30);
		render(<TimePicker locale="ar-SA" open title="Date" value={date} />);
		const header = screen.getByText(timeToLocaleString(date)).parentElement.parentElement;

		const expected = 'label';

		expect(header).toHaveClass(expected);
	});
});
