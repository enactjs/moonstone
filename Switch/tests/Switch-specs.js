import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
    test('should have `animated` className', () => {
        render(<SwitchBase>Toggle me</SwitchBase>);

        const expected = 'animated';
        const actual = screen.getByText('Toggle me').parentElement;

        expect(actual).toHaveClass(expected);
    });

    test('should not have `animated` className', () => {
        render(<SwitchBase noAnimation>Toggle me</SwitchBase>);

        const unexpected = 'animated';
        const actual = screen.getByText('Toggle me').parentElement;

        expect(actual).not.toHaveClass(unexpected);
    });

    test('toggle Switch', () => {
        const handleToggle = jest.fn();
        render(<Switch onToggle={handleToggle}>Toggle me</Switch>);

        const actual = screen.getByText('Toggle me').parentElement;

        fireEvent.mouseDown(actual);
        fireEvent.mouseUp(actual);

        const expectedTimes = 1;
        expect(handleToggle).toBeCalledTimes(expectedTimes);
    });
});
