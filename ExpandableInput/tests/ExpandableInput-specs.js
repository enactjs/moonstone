import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import {ExpandableInput, ExpandableInputBase} from '../ExpandableInput';

describe('ExpandableInputBase', () => {
	const inputHint = ' Input field';
	describe('#aria-label', () => {
		test('should use title, value, and input hint', () => {
			render(<ExpandableInputBase data-testid="inputField" title="Item" value="value" />);
			const inputField = screen.getByTestId('inputField').firstElementChild;

			const expectedValue = 'Item value' + inputHint;
			const expectedAttribute = 'aria-label';

			expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should use title, noneText, and input hint when value is not set', () => {
			render(<ExpandableInputBase data-testid="inputField" noneText="noneText" title="Item" />);
			const inputField = screen.getByTestId('inputField').firstElementChild;

			const expectedValue = 'Item noneText' + inputHint;
			const expectedAttribute = 'aria-label';

			expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should use title and input hint when value and noneText are not set', () => {
			render(<ExpandableInputBase data-testid="inputField" title="Item" />);
			const inputField = screen.getByTestId('inputField').firstElementChild;

			const expectedValue = 'Item ' + inputHint;
			const expectedAttribute = 'aria-label';

			expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test('should use title, character count, and input hint when type is `password`', () => {
			render(<ExpandableInputBase data-testid="inputField" title="Item" type="password" value="long" />);
			const inputField = screen.getByTestId('inputField').firstElementChild;

			const expectedValue = 'Item 4 characters' + inputHint;
			const expectedAttribute = 'aria-label';

			expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
		});

		test(
			'should use title, single character count, and input hint when type=`password` and value length=1',
			() => {
				render(<ExpandableInputBase data-testid="inputField" title="Item" type="password" value="1" />);
				const inputField = screen.getByTestId('inputField').firstElementChild;

				const expectedValue = 'Item 1 character' + inputHint;
				const expectedAttribute = 'aria-label';

				expect(inputField).toHaveAttribute(expectedAttribute, expectedValue);
			}
		);
	});

	describe('#label', () => {
		test('should use value', () => {
			render(<ExpandableInputBase title="Item" value="value" />);
			const inputField = screen.getByText('value');

			expect(inputField).toBeInTheDocument();
		});

		test('should use noneText when value is not set', () => {
			render(<ExpandableInputBase noneText="noneText" title="Item" />);
			const inputField = screen.getByText('noneText');

			expect(inputField).toBeInTheDocument();
		});

		test('should be excluded when type is `password`', () => {
			render(<ExpandableInputBase title="Item" type="password" value="value" />);
			const inputField = screen.queryByText('value');

			expect(inputField).toBeNull();
		});
	});
});

describe('ExpandableInput', () => {
	test('should pass onChange callback to input', () => {
		const handleChange = jest.fn();
		const value = 'input string';
		render(<ExpandableInput onChange={handleChange} open title="Item" value="value" />);

		fireEvent.change(screen.getAllByText('value')[1].nextElementSibling, {target: {value: value}});

		const expected = value;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});
});
