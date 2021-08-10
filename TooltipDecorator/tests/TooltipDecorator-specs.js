import {FloatingLayerBase, FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Tooltip from '../Tooltip';
import TooltipLabel from '../TooltipLabel';

const Root = FloatingLayerDecorator('div');

describe('TooltipDecorator', () => {
	test('should render component into FloatingLayer if `open=true`', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase open>
					<Tooltip data-testis="tooltip">
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const actual = screen.getByText('This is a tooltip');

		expect(actual).toBeInTheDocument();
	});

	test('should not render component into FloatingLayer if `open=false`', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase open={false}>
					<Tooltip data-testis="tooltip">
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const actual = screen.queryByText('This is a tooltip');

		expect(actual).toBeNull();
	});

	test('should have above class when `direction=above`', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase open>
					<Tooltip data-testid="tooltip" direction="above">
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const expected = 'above';
		const actual = screen.getByTestId('tooltip');

		expect(actual).toHaveClass(expected);
	});

	test('should have below class when `direction=below`', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase open>
					<Tooltip data-testid="tooltip" direction="below">
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const expected = 'below';
		const actual = screen.getByTestId('tooltip');

		expect(actual).toHaveClass(expected);
	});

	test('should have left class when `direction=left`', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase open>
					<Tooltip data-testid="tooltip" direction="left">
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const expected = 'left';
		const actual = screen.getByTestId('tooltip');

		expect(actual).toHaveClass(expected);
	});

	test('should have right class when `direction=right`', () => {
		const tooltipText = 'This is a tooltip';
		render(
			<Root>
				<FloatingLayerBase open>
					<Tooltip data-testid="tooltip" direction="right">
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const expected = 'right';
		const actual = screen.getByTestId('tooltip');

		expect(actual).toHaveClass(expected);
	});

	describe('TooltipLabel', () => {
		test('should render a tooltip label', () => {
			render(<TooltipLabel>Label</TooltipLabel>);

			const label = screen.getByText('Label');

			expect(label).toBeInTheDocument();
		});
	});
});
