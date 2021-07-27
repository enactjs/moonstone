import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import DayPicker from '../DayPicker';

describe('DayPicker', () => {
	describe('#aria-label', () => {
		test(
			'should use title, selected long string when day is single selected',
			() => {
				render(
					<DayPicker title="Day Picker" selected={0} />
				);

				const expected = 'Day Picker Sunday';
				const actual = screen.getByRole('group');

				expect(actual).toHaveAttribute('aria-label', expected);
			}
		);

		test(
			'should use title, selected long string when day is multi selected',
			() => {
				render(
					<DayPicker title="Day Picker" selected={[0, 1]} />
				);

				const expected = 'Day Picker Sunday, Monday';
				const actual = screen.getByRole('group');

				expect(actual).toHaveAttribute('aria-label', expected);
			}
		);

		test('should be null when day is not selected', () => {
			render(
				<DayPicker title="Day Picker" />
			);

			const actual = screen.getByRole('group');

			expect(actual).not.toHaveAttribute('aria-label');
		});

		test('should use title, everyDayText when every day is selected', () => {
			render(
				<DayPicker title="Day Picker" everyDayText="every" selected={[0, 1, 2, 3, 4, 5, 6]} />
			);

			const expected = 'Day Picker every';
			const actual = screen.getByRole('group');

			expect(actual).toHaveAttribute('aria-label', expected);
		});

		test('should use title, everyWeekdayText when every weekday is selected', () => {
			render(
				<DayPicker title="Day Picker" everyWeekdayText="weekday" selected={[1, 2, 3, 4, 5]} />
			);

			const expected = 'Day Picker weekday';
			const actual = screen.getByRole('group');

			expect(actual).toHaveAttribute('aria-label', expected);
		});

		test('should use title, everyWeekendText when every weekend is selected', () => {
			render(
				<DayPicker title="Day Picker" everyWeekendText="weekend" selected={[0, 6]} />
			);

			const expected = 'Day Picker weekend';
			const actual = screen.getByRole('group');

			expect(actual).toHaveAttribute('aria-label', expected);
		});
	});
});
