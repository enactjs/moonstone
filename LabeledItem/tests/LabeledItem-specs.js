import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import LabeledItem from '../LabeledItem';

describe('LabeledItem Specs', () => {
	test('should render a label `div` by default', () => {
		render(<LabeledItem label="The Label">I am a labeledItem</LabeledItem>);

		const expected = 'label';
		const actual = screen.getByText('The Label').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should not render a label if there is no \'label\' prop', () => {
		render(<LabeledItem>I am a labeledItem</LabeledItem>);

		const actual = screen.queryByLabelText('The Label');

		expect(actual).toBeNull();
	});

	test('should create a LabeledItem that is enabled by default', () => {
		render(<LabeledItem data-testid="enabled-item">I am a labeledItem</LabeledItem>);

		const expected = 'false';
		const actual = screen.getByTestId('enabled-item');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});

	test('should have \'disabled\' HTML attribute when \'disabled=true\'', () => {
		render(<LabeledItem data-testid="enabled-item" disabled>I am a disabled labeledItem</LabeledItem>);

		const expected = 'true';
		const actual = screen.getByTestId('enabled-item');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});
});
