import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import LabeledIconButton from '../LabeledIconButton';

describe('LabeledIconButton Voice Control Specs', () => {
	test('should not have `selected` className by default', () => {
		render(<LabeledIconButton>star</LabeledIconButton>);

		const expected = 'selected';
		const actual = screen.getByRole('button');

		expect(actual).not.toHaveClass(expected);
	});

	test('should have `selected` className when selected is true', () => {
		render(<LabeledIconButton selected>star</LabeledIconButton>);

		const expected = 'selected';
		const actual = screen.getByRole('button');

		expect(actual).toHaveClass(expected);
	});

	test('should have `flipHorizontal` className when "flip" is set to "horizontal"', () => {
		render(<LabeledIconButton flip="horizontal">star</LabeledIconButton>);

		const expected = 'flipHorizontal';
		const actual = screen.getByRole('button').children[1].children[0];

		expect(actual).toHaveClass(expected);
	});

	test('should set "data-webos-voice-disabled" to IconButton', () => {
		render(<LabeledIconButton data-webos-voice-disabled>star</LabeledIconButton>);

		const expected = 'data-webos-voice-disabled';
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-group-label" to IconButton', () => {
		const voiceGroupLabel = 'voice group label';
		render(<LabeledIconButton data-webos-voice-group-label={voiceGroupLabel}>star</LabeledIconButton>);

		const expected = voiceGroupLabel;
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('data-webos-voice-group-label', expected);
	});

	test('should set "data-webos-voice-label" to IconButton', () => {
		const voiceLabel = 'voice label';
		render(<LabeledIconButton data-webos-voice-label={voiceLabel}>star</LabeledIconButton>);

		const expected = voiceLabel;
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('data-webos-voice-label', expected);
	});

	test('should set "data-webos-voice-intent" to IconButton', () => {
		const voiceIntent = 'Select PlayContent';
		render(<LabeledIconButton data-webos-voice-intent={voiceIntent}>star</LabeledIconButton>);

		const expected = voiceIntent;
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('data-webos-voice-intent', expected);
	});
});
