import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, {ButtonBase} from '../Button';

import css from '../Button.module.less';

describe('Button', () => {
	test('should have \'disabled\' HTML attribute when \'disabled\' prop is provided', () => {
		render(<Button disabled>I am a disabled Button</Button>);
		const button = screen.getByRole('button');

		// expect(button).toHaveAttribute('disabled');
		expect(true).toBe(false);
	});

	test('should have default `minWidth`', () => {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = css.minWidth;

		expect(button).toHaveClass(expected);
	});

	test('should have default `size` \'small\'', () => {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = css.small;

		expect(button).toHaveClass(expected);
	});

	describe('with no `minWidth`', function () {
		test('should not have \'minWidth\' class', () => {
			render(<ButtonBase minWidth={false} />);
			const button = screen.getByRole('button');

			const expected = css.minWidth;

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('with \'transparent\' `backgroundOpacity`', () => {
		test('should have \'transparent\' class', () => {
			render(<ButtonBase backgroundOpacity="transparent" />);
			const button = screen.getByRole('button');

			const expected = css.transparent;

			expect(button).toHaveClass(expected);
		});
	});

	describe('with icon', function () {
		test('should have \'check\' icon when specified', () => {
			render(<Button icon="check">abc</Button>);
			const icon = screen.getByText('✓');

			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass('icon');
		});

		test('should have \'iconAfter\' class with text and icon', () => {
			render(<Button icon="check" iconPosition="after">text</Button>);
			const button = screen.getByRole('button');

			const expected = css.iconAfter;

			expect(button).toHaveClass(expected);
		});

		test('should have \'iconBefore\' class with text and icon', () => {
			render(<Button icon="check" iconPosition="before">text</Button>);
			const button = screen.getByRole('button');

			const expected = css.iconBefore;

			expect(button).toHaveClass(expected);
		});
	});

	describe('with `color`', () => {
		test('should have \'hasColor\' class when a `color` is specified', () => {
			render(<Button color="red">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.hasColor;

			expect(button).toHaveClass(expected);
		});

		test('should not have not \'hasColor\' when no `color` is specified', () => {
			render(<Button>abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.hasColor;

			expect(button).not.toHaveClass(expected);
		});

		test('should have \'red\' class', () => {
			render(<Button color="red">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.red;

			expect(button).toHaveClass(expected);
		});

		test('should have \'blue\' class', () => {
			render(<Button color="blue">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.blue;

			expect(button).toHaveClass(expected);
		});

		test('should have \'yellow\' class', () => {
			render(<Button color="yellow">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.yellow;

			expect(button).toHaveClass(expected);
		});

		test('should have \'green\' class', () => {
			render(<Button color="green">abc</Button>);
			const button = screen.getByRole('button');

			const expected = css.green;

			expect(button).toHaveClass(expected);
		});
	});

	describe('events', () => {
		test('should call `onClick` when not disabled', () => {
			const handleClick = jest.fn();
			render(<Button onClick={handleClick}>I am not a disabled Button</Button>);
			const button = screen.getByText('I am not a disabled Button');

			userEvent.click(button);

			expect(handleClick).toBeCalled();
		});

		test('should not call `onClick` when disabled', () => {
			const handleClick = jest.fn();
			render(<Button disabled onClick={handleClick}>I am a disabled Button</Button>);
			const button = screen.getByText('I am a disabled Button');

			userEvent.click(button);

			expect(handleClick).not.toBeCalled();
		});

		test('should have "Select" voice intent in the node of "role=button"', () => {
			render(<Button>Hello</Button>);
			const button = screen.getByRole('button');

			expect(button).toHaveAttribute('data-webos-voice-intent', 'Select');
		});
	});
});
