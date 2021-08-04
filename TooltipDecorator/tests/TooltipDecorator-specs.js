import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import TooltipLabel from '../TooltipLabel';

describe('TooltipDecorator', () => {
	describe('TooltipLabel', () => {
		test('should render a tooltip label', () => {
			render(<TooltipLabel>Label</TooltipLabel>);

			const label = screen.getByText('Label');

			expect(label).toBeInTheDocument();
		});
	});
});
