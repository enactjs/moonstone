import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Header from '../Header';

describe('Header Specs', () => {
	test('should render with title text without changing case', () => {
		let msg = 'cRaZy-cased super Header';
		render(
			<Header><title>{msg}</title></Header>
		);

		const titleText = screen.getByText(msg)

		expect(titleText).toBeInTheDocument();
	});

	test('should have fullBleed class applied', () => {
		render(
			<Header fullBleed>
				<title>Header</title>
			</Header>
		);

		const headerElement = screen.getByLabelText('Header');

		expect(headerElement).toHaveClass('fullBleed');
	});

	test('should inject a custom component when headerInput is used', () => {
		const Input = () => <input data-testid="input" />;

		// This just uses an <input> tag for easy discoverability. It should behave the same way
		// as a moonstone/Input, the standard here, but that would require importing a diffenent
		// component than what we're testing here.
		render(
			<Header>
				<title>Header</title>
				<headerInput>
					<Input />
				</headerInput>
			</Header>
		);

		const inputElement = screen.getByTestId('input');

		expect(inputElement).toBeInTheDocument();
	});
});
