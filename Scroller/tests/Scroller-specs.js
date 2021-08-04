import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';

import Scroller from '../Scroller';

describe('Scroller', () => {
	let contents;

	beforeEach(() => {
		contents = (
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
			</div>
		);
	});

	afterEach(() => {
		contents = null;
	});

	describe('Scrollbar visibility', () => {

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
	});

	// TODO: Left this as skipped because we can't check at this moment the onUpdate call with react-testing-library
	describe('ScrollerBase API', () => {
		test.skip('should call onUpdate when Scroller updates', async () => {
			const handleUpdate = jest.fn();
			const {rerender} = render(
				<Scroller
					onUpdate={handleUpdate}
				>
					{contents}
				</Scroller>
			);

			rerender(
				<Scroller>
					{''}
				</Scroller>
			);

			await waitFor(() => expect(handleUpdate).toHaveBeenCalled());
		});
	});
});
