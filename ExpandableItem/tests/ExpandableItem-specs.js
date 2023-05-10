import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ExpandableItemBase} from '../ExpandableItem';

describe('ExpandableItem', () => {
	const children = ['option1', 'option2', 'option3'];

	describe('computed', () => {
		describe('label', () => {
			test('should use noneText when label is not set', () => {
				const expected = 'noneText';
				const actual = ExpandableItemBase.computed.label({
					noneText: 'noneText'
				});

				expect(actual).toBe(expected);
			});

			test('should use label when set', () => {
				const expected = 'label';
				const actual = ExpandableItemBase.computed.label({
					label: 'label',
					noneText: 'noneText'
				});

				expect(actual).toBe(expected);
			});
		});

		describe('open', () => {
			test('should be false when disabled', () => {
				const expected = false;
				const actual = ExpandableItemBase.computed.open({
					disabled: true,
					open: true
				});

				expect(actual).toBe(expected);
			});
		});

		describe('handlers', () => {
			test('should call onClose when there is a prop onClose', async () => {
				const handleClose = jest.fn();
				const user = userEvent.setup();

				render(
					<ExpandableItemBase noneText="hello" onClose={handleClose} open title="Item">
						{children}
					</ExpandableItemBase>
				);
				const item = screen.getByText('Item');

				await user.click(item);

				const expected = 1;

				expect(handleClose).toHaveBeenCalledTimes(expected);
			});

			test('should call onOpen when there is a prop onOpen', async () => {
				const handleOpen = jest.fn();
				const user = userEvent.setup();

				render(
					<ExpandableItemBase noneText="hello" onOpen={handleOpen} title="Item">
						{children}
					</ExpandableItemBase>
				);
				const item = screen.getByText('Item');

				await user.click(item);

				const expected = 1;

				expect(handleOpen).toHaveBeenCalledTimes(expected);
			});
		});
	});

	describe('Voice Control', () => {
		test('should set "data-webos-voice-disabled" to LabeledItem when voice control is disabled', () => {
			render(
				<ExpandableItemBase data-testid="Item" data-webos-voice-disabled title="Item">
					{children}
				</ExpandableItemBase>
			);
			const item = screen.getByTestId('Item').firstElementChild;

			const expectedAttribute = 'data-webos-voice-disabled';
			const expectedValue = 'true';

			expect(item).toHaveAttribute(expectedAttribute, expectedValue);
		});
	});
});
