import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {ExpandableList, ExpandableListBase} from '../ExpandableList';

describe('ExpandableList', () => {
	describe('#aria-multiselectable', () => {
		test('should be true when select is multiple', () => {
			render(
				<ExpandableListBase title="Item" select="multiple">
					{['option1', 'option2', 'option3']}
				</ExpandableListBase>
			);
			const expandableList = screen.getByRole('group');

			const expectedAttribute = 'aria-multiselectable';
			const expectedValue = 'true';

			expect(expandableList).toHaveAttribute(expectedAttribute, expectedValue);
		});
	});

	test('should update when children are updated', () => {
		const children = ['option1', 'option2', 'option3'];
		const {rerender} = render(
			<ExpandableList title="Item" open>
				{children}
			</ExpandableList>
		);

		const expectedFirst = 3;
		const actualFirst = screen.getAllByRole('checkbox');

		expect(actualFirst).toHaveLength(expectedFirst);

		const removedChildren = children.slice(1);

		rerender(
			<ExpandableList title="Item" open>
				{removedChildren}
			</ExpandableList>
		);

		const expectedSecond = 2;
		const actualSecond = screen.getAllByRole('checkbox');

		expect(actualSecond).toHaveLength(expectedSecond);

		const addedChildren = children.concat(['option4']);

		rerender(
			<ExpandableList title="Item" open>
				{addedChildren}
			</ExpandableList>
		);

		const expectedThird = 4;
		const actualThird = screen.getAllByRole('checkbox');

		expect(actualThird).toHaveLength(expectedThird);
	});

	test('should set "data-webos-voice-disabled" to LabeledItem when voice control is disabled', () => {
		const children = ['option1', 'option2', 'option3'];
		render(
			<ExpandableListBase data-webos-voice-disabled title="Item" open>
				{children}
			</ExpandableListBase>
		);
		const expandableList = screen.getByRole('group').firstElementChild;

		const expectedAttribute = 'data-webos-voice-disabled';
		const expectedValue = 'true';

		expect(expandableList).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set "data-webos-voice-disabled" to child item when voice control is disabled', () => {
		const children = ['option1', 'option2', 'option3'];
		render(
			<ExpandableList data-webos-voice-disabled title="Item" open>
				{children}
			</ExpandableList>
		);
		const expandableListItem = screen.getAllByRole('checkbox')[0];

		const expectedAttribute = 'data-webos-voice-disabled';
		const expectedValue = 'true';

		expect(expandableListItem).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should allow for selected as array when not multi-select', () => {
		const children = ['option1', 'option2', 'option3'];
		render(
			<ExpandableList selected={[0, 1]} title="Item">
				{children}
			</ExpandableList>
		);
		const expandableList = screen.getByRole('radiogroup');

		const expected = children[0];
		const actual = expandableList.textContent.slice(-1 * expected.length);

		expect(actual).toBe(expected);
	});

	test('should allow for selected as array when not multi-select with object', () => {
		const children = [{
			children: 'option1',
			key: 'a'
		}, {
			children: 'option2',
			key: 'b'
		}, {
			children: 'option3',
			key: 'c'
		}];
		render(
			<ExpandableList selected={[1, 2]} title="Item">
				{children}
			</ExpandableList>
		);
		const expandableList = screen.getByRole('radiogroup');

		const expected = children[1].children;
		const actual = expandableList.textContent.slice(-1 * expected.length);

		expect(actual).toBe(expected);
	});

	test('should show noneText when selected is empty array', () => {
		const children = [{
			children: 'option1',
			key: 'a'
		}, {
			children: 'option2',
			key: 'b'
		}, {
			children: 'option3',
			key: 'c'
		}];
		render(
			<ExpandableList selected={[]} title="Item" noneText="hello">
				{children}
			</ExpandableList>
		);
		const expandableList = screen.getByRole('radiogroup');

		const expected = 'hello';
		const actual = expandableList.textContent.slice(-1 * expected.length);

		expect(actual).toBe(expected);
	});
});
