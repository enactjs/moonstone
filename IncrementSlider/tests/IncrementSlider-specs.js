import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IncrementSlider from '../IncrementSlider';

const tap = (node) => {
	fireEvent.mouseDown(node);
	fireEvent.mouseUp(node);
};

const decrement = () => userEvent.click(screen.getAllByRole('button')[0]);
const increment = () => userEvent.click(screen.getAllByRole('button')[1]);
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);
const upKeyDown = keyDown(38);
const downKeyDown = keyDown(40);

describe('IncrementSlider Specs', () => {
	test('should decrement value', () => {
		const handleChange = jest.fn();
		const value = 50;
		render(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);

		decrement();

		const expected = value - 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment value', () => {
		const handleChange = jest.fn();
		const value = 50;
		render(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);

		increment();

		const expected = value + 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should only call onChange once', () => {
		const handleChange = jest.fn();
		const value = 50;
		render(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);
		const incrementButton = screen.getAllByRole('button')[1];

		tap(incrementButton);

		const expected = 1;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should not call onChange on prop change', () => {
		const handleChange = jest.fn();
		const value = 50;
		const {rerender} = render(
			<IncrementSlider
				onChange={handleChange}
				value={value}
			/>
		);

		rerender(
			<IncrementSlider
				onChange={handleChange}
				value={value + 1}
			/>
		);

		const expected = 0;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});

	test('should disable decrement button when value === min', () => {
		render(
			<IncrementSlider
				value={0}
				min={0}
			/>
		);

		const expected = 'disabled';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expected);
	});

	test('should disable increment button when value === max', () => {
		render(
			<IncrementSlider
				value={10}
				max={10}
			/>
		);

		const expected = 'disabled';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expected);
	});

	test('should use custom incrementIcon', () => {
		const icon = 'plus';
		render(
			<IncrementSlider incrementIcon={icon} />
		);

		const expected = '+';
		const actual = screen.getAllByRole('button')[1].children[1].children[0];

		expect(actual).toHaveTextContent(expected);
	});

	test('should use custom decrementIcon', () => {
		const icon = 'minus';
		render(
			<IncrementSlider decrementIcon={icon} />
		);

		const expected = '-';
		const actual = screen.getAllByRole('button')[0].children[1].children[0];

		expect(actual).toHaveTextContent(expected);
	});

	test(
		'should set decrementButton "aria-label" to value and hint string',
		() => {
			render(
				<IncrementSlider value={10} />
			);

			const expected = '10 press ok button to decrease the value';
			const actual = screen.getAllByRole('button')[0];

			expect(actual).toHaveAttribute('aria-label', expected);
		}
	);

	test(
		'should set decrementButton "aria-label" to decrementAriaLabel',
		() => {
			const label = 'decrement aria label';
			render(
				<IncrementSlider value={10} decrementAriaLabel={label} />
			);

			const expected = `10 ${label}`;
			const actual = screen.getAllByRole('button')[0];

			expect(actual).toHaveAttribute('aria-label', expected);
		}
	);

	test(
		'should set decrementButton "aria-label" when decrementButton is disabled',
		() => {
			render(
				<IncrementSlider disabled value={10} />
			);

			const expected = '10 press ok button to decrease the value';
			const actual = screen.getAllByRole('button')[0];

			expect(actual).toHaveAttribute('aria-label', expected);
		}
	);

	test(
		'should set incrementButton "aria-label" to value and hint string',
		() => {
			render(
				<IncrementSlider value={10} />
			);

			const expected = '10 press ok button to increase the value';
			const actual = screen.getAllByRole('button')[1];

			expect(actual).toHaveAttribute('aria-label', expected);
		}
	);

	test(
		'should set incrementButton "aria-label" to incrementAriaLabel',
		() => {
			const label = 'increment aria label';
			render(
				<IncrementSlider value={10} incrementAriaLabel={label} />
			);

			const expected = `10 ${label}`;
			const actual = screen.getAllByRole('button')[1];

			expect(actual).toHaveAttribute('aria-label', expected);
		}
	);

	test(
		'should set incrementButton "aria-label" when incrementButton is disabled',
		() => {
			render(
				<IncrementSlider disabled value={10} />
			);

			const expected = '10 press ok button to increase the value';
			const actual = screen.getAllByRole('button')[1];

			expect(actual).toHaveAttribute('aria-label', expected);
		}
	);

	// test directional events from IncrementSliderButtons

	test('should call onSpotlightLeft from the decrement button of horizontal IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider onSpotlightLeft={handleSpotlight} />
		);

		leftKeyDown(screen.getAllByRole('button')[0]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightLeft from the decrement button of vertical IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider orientation="vertical" onSpotlightLeft={handleSpotlight} />
		);

		leftKeyDown(screen.getAllByRole('button')[0]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightLeft from the increment button of vertical IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider orientation="vertical" onSpotlightLeft={handleSpotlight} />
		);

		leftKeyDown(screen.getAllByRole('button')[1]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightRight from the increment button of horizontal IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider onSpotlightRight={handleSpotlight} />
		);

		rightKeyDown(screen.getAllByRole('button')[1]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightRight from the increment button of vertical IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider orientation="vertical" onSpotlightRight={handleSpotlight} />
		);

		rightKeyDown(screen.getAllByRole('button')[1]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightRight from the decrement button of vertical IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider orientation="vertical" onSpotlightRight={handleSpotlight} />
		);

		rightKeyDown(screen.getAllByRole('button')[0]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightUp from the decrement button of horizontal IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider onSpotlightUp={handleSpotlight} />
		);

		upKeyDown(screen.getAllByRole('button')[0]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightUp from the increment button of horizontal IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider onSpotlightUp={handleSpotlight} />
		);

		upKeyDown(screen.getAllByRole('button')[1]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightUp from the increment button of vertical IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider orientation="vertical" onSpotlightUp={handleSpotlight} />
		);

		upKeyDown(screen.getAllByRole('button')[1]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightDown from the increment button of horizontal IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider onSpotlightDown={handleSpotlight} />
		);

		downKeyDown(screen.getAllByRole('button')[1]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightDown from the decrement button of horizontal IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider orientation="vertical" onSpotlightDown={handleSpotlight} />
		);

		downKeyDown(screen.getAllByRole('button')[0]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightDown from the decrement button of vertical IncrementSlider', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider orientation="vertical" onSpotlightDown={handleSpotlight} />
		);

		downKeyDown(screen.getAllByRole('button')[0]);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	// test directional events at bounds of slider

	test('should call onSpotlightLeft from slider of horizontal IncrementSlider when value is at min', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider min={0} value={0} onSpotlightLeft={handleSpotlight} />
		);

		leftKeyDown(screen.getByRole('slider'));

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightRight from slider of horizontal IncrementSlider when value is at max', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider max={100} value={100} onSpotlightRight={handleSpotlight} />
		);

		rightKeyDown(screen.getByRole('slider'));

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightDown from slider of vertical IncrementSlider when value is at min', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider min={0} value={0} orientation="vertical" onSpotlightDown={handleSpotlight} />
		);

		downKeyDown(screen.getByRole('slider'));

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightUp from slider of horizontal IncrementSlider when value is at max', () => {
		const handleSpotlight = jest.fn();
		render(
			<IncrementSlider max={100} value={100} orientation="vertical" onSpotlightUp={handleSpotlight} />
		);

		upKeyDown(screen.getByRole('slider'));

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should set "data-webos-voice-disabled" to increment button when voice control is disabled', () => {
		render(
			<IncrementSlider data-webos-voice-disabled value={10} />
		);

		const expected = 'data-webos-voice-disabled';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to decrement button when voice control is disabled', () => {
		render(
			<IncrementSlider data-webos-voice-disabled value={10} />
		);

		const expected = 'data-webos-voice-disabled';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-group-label" to increment button when voice group label is set', () => {
		const label = 'voice control group label';
		render(
			<IncrementSlider data-webos-voice-group-label={label} value={10} />
		);

		const expected = 'data-webos-voice-group-label';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expected, label);
	});

	test('should set "data-webos-voice-group-label" to decrement button when voice group label is set', () => {
		const label = 'voice control group label';
		render(
			<IncrementSlider data-webos-voice-group-label={label} value={10} />
		);

		const expected = 'data-webos-voice-group-label';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expected, label);
	});
});
