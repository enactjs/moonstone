import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import TooltipLabel from '../TooltipLabel';

describe('TooltipDecorator', () => {
	describe('TooltipLabel', () => {
		test('debug', () => {
			render(<TooltipLabel tooltipPosition="below">Label</TooltipLabel>);
			screen.debug();
		});

		test('should render a tooltip label', () => {
			render(<TooltipLabel>Label</TooltipLabel>);

			const label = screen.getByText('Label');

			expect(label).toBeInTheDocument();
		});

		// test('should apply alignment when `centered` and `marquee`', () => {
		// 	render(<TooltipLabel centered marquee>Label</TooltipLabel>);
		//
		// 	const expected = 'center';
		// 	const tooltip = screen.getByText('Label');
		//
		// 	expect(tooltip).toHaveStyle({'text-align': expected});
		// });
		//
		// test('should not apply alignment when `centered` but not `marquee`', () => {
		// 	render(<TooltipLabel centered>Label</TooltipLabel>);
		//
		// 	const unexpected = 'center';
		// 	const tooltip = screen.getByText('Label');
		//
		// 	expect(tooltip).not.toHaveStyle({'text-align': unexpected});
		// });
	});
});