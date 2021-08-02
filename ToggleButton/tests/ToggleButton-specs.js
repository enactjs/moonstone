import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ToggleButton from '../ToggleButton';

describe('ToggleButton', () => {

	const toggleOnLabel = 'It\'s on!';
	const toggleOffLabel = 'It\'s off!';
	const textChild = 'Toggle Me';

	test(
		'should use \'toggleOffLabel\' if toggled off and label provided',
		() => {
			render(
				<ToggleButton toggleOffLabel={toggleOffLabel}>
					{textChild}
				</ToggleButton>
			);
			const button = screen.getByRole('button');

			const expected = toggleOffLabel;
			const actual = button.children[2].children[0].children[0];

			expect(actual).toHaveTextContent(expected);
		}
	);

	test(
		'should use \'toggleOnLabel\' if toggled on and label provided',
		() => {
			render(
				<ToggleButton toggleOnLabel={toggleOnLabel} selected>
					{textChild}
				</ToggleButton>
			);
			const button = screen.getByRole('button');

			const expected = toggleOnLabel;
			const actual = button.children[2].children[0].children[0];

			expect(actual).toHaveTextContent(expected);
		}
	);

	test(
		'should use child node for label when \'toggleOffLabel\' is missing',
		() => {
			render(
				<ToggleButton toggleOnLabel={toggleOnLabel}>
					{textChild}
				</ToggleButton>
			);
			const button = screen.getByRole('button');

			const expected = textChild;
			const actual = button.children[2].children[0].children[0];

			expect(actual).toHaveTextContent(expected);
		}
	);

	test(
		'should use child node for label when \'toggleOnLabel\' is missing',
		() => {
			render(
				<ToggleButton toggleOffLabel={toggleOffLabel} selected>
					{textChild}
				</ToggleButton>
			);
			const button = screen.getByRole('button');

			const expected = textChild;
			const actual = button.children[2].children[0].children[0];

			expect(actual).toHaveTextContent(expected);
		}
	);

	test('should set "aria-pressed" to the value of "selected"', () => {
		render(
			<ToggleButton toggleOffLabel={toggleOffLabel} selected={false}>
				{textChild}
			</ToggleButton>
		);

		const expected = 'false';
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('aria-pressed', expected);
	});
});
