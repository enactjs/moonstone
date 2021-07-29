import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Popup from '../Popup';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Popup specs', () => {
	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByText('popup');

		expect(popup).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<Popup><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.queryByText('popup');

		expect(popup).toBeNull();
	});

	test('should set popup close button "aria-label" to closeButtonAriaLabel', () => {
		const label = 'custom close button label';
		render(
			<FloatingLayerController>
				<Popup closeButtonAriaLabel={label} open showCloseButton><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const expected = label;
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set role to alert by default', () => {
		render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByRole('alert');

		expect(popup).toBeInTheDocument();
	});

	test('should allow role to be overridden', () => {
		render(
			<FloatingLayerController>
				<Popup open role="dialog"><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByRole('dialog');

		expect(popup).toBeInTheDocument();
	});

	test('should set "data-webos-voice-exclusive" when popup is open', () => {
		render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByRole('alert');

		expect(popup).toHaveAttribute('data-webos-voice-exclusive');
	});

	test('should set "data-webos-voice-disabled" when voice control is disabled', () => {
		render(
			<FloatingLayerController>
				<Popup data-webos-voice-disabled open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByRole('alert');

		expect(popup).toHaveAttribute('data-webos-voice-disabled');
	});
});
