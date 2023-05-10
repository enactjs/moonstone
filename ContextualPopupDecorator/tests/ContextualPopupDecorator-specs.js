import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ContextualPopupDecorator} from '../ContextualPopupDecorator';
import Button from '../../Button';

const ContextualButton = ContextualPopupDecorator(Button);

describe('ContextualPopupDecorator Specs', () => {
	test('should emit onClose event when clicking on contextual button', async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualButton = screen.getByRole('button');

		await user.click(contextualButton);

		expect(handleClose).toHaveBeenCalled();
	});

	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = message;
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveTextContent(expected);
	});

	test('should not render into FloatingLayer if not open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);

		const popup = screen.queryByText(message);

		expect(popup).toBeNull();
	});

	test('should not emit onClose event when clicking outside if noAutoDismiss is true', async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root data-testid="outsideArea">
				<ContextualButton noAutoDismiss onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const outsideArea = screen.getByTestId('outsideArea');

		await user.click(outsideArea);

		expect(handleClose).not.toHaveBeenCalled();
	});

	test('should emit onClose event when clicking outside if noAutoDismiss is missing', async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root data-testid="outsideArea">
				<ContextualButton onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const outsideArea = screen.getByTestId('outsideArea');

		await user.click(outsideArea);

		expect(handleClose).toHaveBeenCalled();
	});

	test('direction attribute should have `right` value when direction is set to `right`', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="right" onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert').children.item(1);

		const expectedAttribute = 'direction';
		const expectedValue = 'right';

		expect(contextualPopup).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should have a close button when `showCloseButton` is set to true', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message} showCloseButton>
					Hello
				</ContextualButton>
			</Root>
		);
		const closeButton = within(screen.getByRole('alert')).getByRole('button');

		expect(closeButton).not.toBeNull();
	});

	test('should not have a close button when `showCloseButton` is not set', () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const closeButton = within(screen.getByRole('alert')).queryByRole('button');

		expect(closeButton).toBeNull();
	});

	test('should emit onClose event when clicking the closeButton', async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message} showCloseButton>
					Hello
				</ContextualButton>
			</Root>
		);
		const closeButton = within(screen.getByRole('alert')).getByRole('button');

		await user.click(closeButton);

		expect(handleClose).toHaveBeenCalled();
	});
});
