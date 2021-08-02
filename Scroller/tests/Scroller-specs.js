import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Scroller, {ScrollerBase} from '../Scroller';

describe('Scroller', () => {
	let contents;

	beforeEach(() => {
		contents = (
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
			</div>
		);
	});

	afterEach(() => {
		contents = null;
	});

	describe('Scrollbar visibility', () => {
		// test('debug', () => {
		// 	const handleUpdate = jest.fn();
		// 	const spyStart = jest.fn();
		// 	const spyStop = jest.fn();
		// 	render(
		// 		<Scroller
		// 			data-testid="scroller"
		// 			onUpdate={handleUpdate}
		// 			horizontalScrollbar="visible"
		// 			verticalScrollbar="visible"
		// 			onScrollStart={spyStart}
		// 			onScrollStop={spyStop}
		// 		>
		// 			{contents}
		// 		</Scroller>
		// 	);
		// 	screen.debug();
		// });

		test(
			'should render both horizontal and vertical scrollbars when \'horizontalScrollbar\' and \'verticalScrollbar\' are "visible"',
			() => {
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const upScrollbarButton = screen.getByLabelText('scroll up');
				const downScrollbarButton = screen.getByLabelText('scroll down');
				const leftScrollbarButton = screen.getByLabelText('scroll left');
				const rightScrollbarButton = screen.getByLabelText('scroll right');

				expect(upScrollbarButton && downScrollbarButton).toBeInTheDocument();
				expect(leftScrollbarButton && rightScrollbarButton).toBeInTheDocument();
			}
		);

		// test(
		// 	'should render both horizontal and vertical scrollbars when \'horizontalScrollbar\' and \'verticalScrollbar\' are "visible"',
		// 	() => {
		// 		const subject = mount(
		// 			<Scroller
		// 				horizontalScrollbar="visible"
		// 				verticalScrollbar="visible"
		// 			>
		// 				{contents}
		// 			</Scroller>
		// 		);
		//
		// 		const expected = 2;
		// 		const actual = subject.find('Scrollbar').length;
		//
		// 		expect(actual).toBe(expected);
		// 	}
		// );

		test(
			'should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is "hidden"',
			() => {
				render(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const upScrollbarButton = screen.getByLabelText('scroll up');
				const downScrollbarButton = screen.getByLabelText('scroll down');
				const leftScrollbarButton = screen.queryByLabelText('scroll left');
				const rightScrollbarButton = screen.queryByLabelText('scroll right');

				expect(upScrollbarButton && downScrollbarButton).toBeInTheDocument();
				expect(leftScrollbarButton && rightScrollbarButton).toBeNull();
			}
		);

		//
		// test(
		// 	'should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is "hidden"',
		// 	() => {
		// 		const subject = mount(
		// 			<Scroller
		// 				horizontalScrollbar="hidden"
		// 				verticalScrollbar="visible"
		// 			>
		// 				{contents}
		// 			</Scroller>
		// 		);
		//
		// 		const expected = 1;
		// 		const actual = subject.find('Scrollbar').length;
		//
		// 		expect(actual).toBe(expected);
		// 	}
		// );

		test(
			'should not render any scrollbar when when \'horizontalScrollbar\' and \'verticalScrollbar\' are "hidden"',
			() => {
				render(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						{contents}
					</Scroller>
				);

				const upScrollbarButton = screen.queryByLabelText('scroll up');
				const downScrollbarButton = screen.queryByLabelText('scroll down');
				const leftScrollbarButton = screen.queryByLabelText('scroll left');
				const rightScrollbarButton = screen.queryByLabelText('scroll right');

				expect(upScrollbarButton && downScrollbarButton).toBeNull();
				expect(leftScrollbarButton && rightScrollbarButton).toBeNull();
			}
		);
		//
		// test(
		// 	'should not render any scrollbar when when \'horizontalScrollbar\' and \'verticalScrollbar\' are "hidden"',
		// 	() => {
		// 		const subject = mount(
		// 			<Scroller
		// 				horizontalScrollbar="hidden"
		// 				verticalScrollbar="hidden"
		// 			>
		// 				{contents}
		// 			</Scroller>
		// 		);
		//
		// 		const expected = 0;
		// 		const actual = subject.find('Scrollbar').length;
		//
		// 		expect(actual).toBe(expected);
		// 	}
		// );
	});

	describe('Scrollbar accessibility', () => {

		test(
			'should set "aria-label" to previous scroll button in the horizontal scroll bar',
			() => {
				const label = 'custom button aria label';
				render(
					<Scroller
						horizontalScrollbar="visible"
						scrollLeftAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const previousScrollbarButtonLabel = screen.getByLabelText(label);
				const previousScrollbarButton = screen.getByLabelText(label).parentElement;

				expect(previousScrollbarButtonLabel).toBeInTheDocument();
				expect(previousScrollbarButton).toHaveClass('horizontal');
			});

		// test(
		// 	'should set "aria-label" to previous scroll button in the horizontal scroll bar',
		// 	() => {
		// 		const label = 'custom button aria label';
		// 		const subject = mount(
		// 			<Scroller
		// 				horizontalScrollbar="visible"
		// 				scrollLeftAriaLabel={label}
		// 				verticalScrollbar="visible"
		// 			>
		// 				{contents}
		// 			</Scroller>
		// 		);
		//
		// 		const expected = label;
		// 		const actual = subject.find('ScrollButton').at(2).prop('aria-label');
		//
		// 		expect(actual).toBe(expected);
		// 	}
		// );

		test(
			'should set "aria-label" to next scroll button in the horizontal scroll bar',
			() => {
				const label = 'custom button aria label';
				render(
					<Scroller
						horizontalScrollbar="visible"
						scrollRightAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const nextScrollbarButtonLabel = screen.getByLabelText(label);
				const nextScrollbarButton = screen.getByLabelText(label).parentElement;

				expect(nextScrollbarButtonLabel).toBeInTheDocument();
				expect(nextScrollbarButton).toHaveClass('horizontal');
			}
		);

		//
		// test(
		// 	'should set "aria-label" to next scroll button in the horizontal scroll bar',
		// 	() => {
		// 		const label = 'custom button aria label';
		// 		const subject = mount(
		// 			<Scroller
		// 				horizontalScrollbar="visible"
		// 				scrollRightAriaLabel={label}
		// 				verticalScrollbar="visible"
		// 			>
		// 				{contents}
		// 			</Scroller>
		// 		);
		//
		// 		const expected = label;
		// 		const actual = subject.find('ScrollButton').at(3).prop('aria-label');
		//
		// 		expect(actual).toBe(expected);
		// 	}
		// );

		test(
			'should set "aria-label" to previous scroll button in the vertical scroll bar',
			() => {
				const label = 'custom button aria label';
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollbar="visible"
						scrollUpAriaLabel={label}
					>
						{contents}
					</Scroller>
				);

				const previousScrollbarButtonLabel = screen.getByLabelText(label);
				const previousScrollbarButton = screen.getByLabelText(label).parentElement;

				expect(previousScrollbarButtonLabel).toBeInTheDocument();
				expect(previousScrollbarButton).toHaveClass('vertical');
			}
		);

		//
		// test(
		// 	'should set "aria-label" to previous scroll button in the vertical scroll bar',
		// 	() => {
		// 		const label = 'custom button aria label';
		// 		const subject = mount(
		// 			<Scroller
		// 				horizontalScrollbar="visible"
		// 				verticalScrollbar="visible"
		// 				scrollUpAriaLabel={label}
		// 			>
		// 				{contents}
		// 			</Scroller>
		// 		);
		//
		// 		const expected = label;
		// 		const actual = subject.find('ScrollButton').at(0).prop('aria-label');
		//
		// 		expect(actual).toBe(expected);
		// 	}
		// );

		test(
			'should set "aria-label" to next scroll button in the vertical scroll bar',
			() => {
				const label = 'custom button aria label';
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollbar="visible"
						scrollDownAriaLabel={label}
					>
						{contents}
					</Scroller>
				);

				const nextScrollbarButtonLabel = screen.getByLabelText(label);
				const nextScrollbarButton = screen.getByLabelText(label).parentElement;

				expect(nextScrollbarButtonLabel).toBeInTheDocument();
				expect(nextScrollbarButton).toHaveClass('vertical');
			}
		);

		//
		// test(
		// 	'should set "aria-label" to next scroll button in the vertical scroll bar',
		// 	() => {
		// 		const label = 'custom button aria label';
		// 		const subject = mount(
		// 			<Scroller
		// 				horizontalScrollbar="visible"
		// 				verticalScrollbar="visible"
		// 				scrollDownAriaLabel={label}
		// 			>
		// 				{contents}
		// 			</Scroller>
		// 		);
		//
		// 		const expected = label;
		// 		const actual = subject.find('ScrollButton').at(1).prop('aria-label');
		//
		// 		expect(actual).toBe(expected);
		// 	}
		// );
	});

	describe('ScrollerBase API', () => {
		test('should call onUpdate when Scroller updates', () => {
			const handleUpdate = jest.fn();
			const spyStart = jest.fn();
			const spyStop = jest.fn();
			render(
				<Scroller
					data-testid="scroller"
					onUpdate={handleUpdate}
					horizontalScrollbar="visible"
					verticalScrollbar="visible"
					onScrollStart={spyStart}
					onScrollStop={spyStop}
				>
					{contents}
				</Scroller>
			);

			const scrollerContent = screen.getByTestId('scroller').children.item(0);
			// const scrollerDown = screen.getByLabelText('scroll down');
			//
			// userEvent.click(scrollerDown);
			fireEvent.transitionEnd(scrollerContent);

			expect(spyStart).toHaveBeenCalled();

			// const actual = spyStart.scrollTop;
			// const expected = 0;
			//
			// expect(actual).toBe(expected);

			// rerender(
			// 	<Scroller
			// 		onUpdate={handleUpdate}
			// 	>
			// 		{''}
			// 	</Scroller>
			// );

			// const expected = 1;
			// const actual = handleUpdate.mock.calls;
			//
			// expect(actual).toHaveBeenCalled();
		});

		// test('should call onUpdate when Scroller updates', () => {
		// 	const handleUpdate = jest.fn();
		// 	const subject = shallow(
		// 		<ScrollerBase
		// 			onUpdate={handleUpdate}
		// 		>
		// 			{contents}
		// 		</ScrollerBase>
		// 	);
		//
		// 	subject.setProps({children: ''});
		//
		// 	const expected = 1;
		// 	const actual = handleUpdate.mock.calls.length;
		//
		// 	expect(expected).toBe(actual);
		// });
	});
});
