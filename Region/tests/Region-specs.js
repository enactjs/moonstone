import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Region from '../Region';

describe('Region', () => {
	describe('computed property', () => {
		describe('aria-label', () => {
			const ariaLabel = 'LABEL';
			const title = 'TITLE';

			test('should use aria-label when set', () => {
				render(<Region title={title} aria-label={ariaLabel} />);
				const region = screen.getByRole('region');

				expect(region).toHaveAttribute('aria-label', ariaLabel);
			});

			test('should use title when aria-label is not set', () => {
				render(<Region title={title} />);
				const region = screen.getByRole('region');

				expect(region).toHaveAttribute('aria-label', title);
			});
		});
	});
});
