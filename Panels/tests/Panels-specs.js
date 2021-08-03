import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import {Panels, PanelsBase} from '../Panels';

describe('Panels Specs', () => {
	test('should render application close button when \'noCloseButton\' is not specified', () => {
		render(<Panels />);

		const applicationCloseButton = screen.getByRole('button');
		const applicationCloseIcon = screen.getByRole('button').lastElementChild.children.item(0);

		expect(applicationCloseButton).toBeInTheDocument();
		expect(applicationCloseIcon).toHaveClass('icon');
	});

	test('should not render application close button when \'noCloseButton\' is set to true', () => {
		render(<Panels noCloseButton />);

		const applicationCloseButton = screen.queryByRole('button');

		expect(applicationCloseButton).not.toBeInTheDocument();
	});

	test('should call onApplicationClose when application close button is clicked', () => {
		const handleAppClose = jest.fn();
		render(<Panels onApplicationClose={handleAppClose} />);

		const applicationCloseButton = screen.getByRole('button');
		fireEvent.click(applicationCloseButton);

		expect(handleAppClose).toHaveBeenCalled();
	});

	test('should set application close button "aria-label" to closeButtonAriaLabel', () => {
		const label = 'custom close button label';
		render(
			<Panels closeButtonAriaLabel={label} />
		);

		const applicationCloseButton = screen.getByRole('button');

		expect(applicationCloseButton).toHaveAttribute('aria-label', label);
	});

	test('should set {autoFocus} on child to "default-element" on first render', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		render(
			<Panels index={0}>
				<DivPanel />
			</Panels>
		);

		const expected = 'default-element';
		const actual = screen.getByTestId('panel').textContent;

		expect(actual).toBe(expected);
	});

	test('should set {autoFocus} on child to "default-element" when navigating to a higher index', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		const {rerender} = render(
			<Panels index={0}>
				<DivPanel />
				<DivPanel id="p2" />
			</Panels>
		);

		rerender(
			<Panels index={1}>
				<DivPanel />
				<DivPanel id="p2" />
			</Panels>
		);

		const expected = 'default-element';
		const actual = screen.getAllByTestId('panel')[0].textContent;

		expect(actual).toBe(expected);
	});

	test('should not set {autoFocus} on child when navigating to a higher index when it has an autoFocus prop set', () => {
		const DivPanel = ({autoFocus, id}) => <div data-testid="panel" id={id}>{autoFocus}</div>;
		const {rerender} = render(
			<Panels index={0}>
				<DivPanel />
				<DivPanel id="p2" autoFocus="last-focused" />
			</Panels>
		);

		rerender(
			<Panels index={1}>
				<DivPanel />
				<DivPanel id="p2" autoFocus="last-focused" />
			</Panels>
		);

		const expected = 'last-focused';
		const panel = screen.getAllByTestId('panel')[0];

		expect(panel.textContent).toBe(expected);
		expect(panel.id).toBe('p2');
	});

	describe('computed', () => {
		describe('childProps', () => {
			test('should not add aria-owns when noCloseButton is true and no controls', () => {
				const id = 'id';
				const childProps = {};
				const props = {
					childProps,
					noCloseButton: true,
					id
				};

				const expected = childProps;
				const actual = PanelsBase.computed.childProps(props);

				expect(actual).toBe(expected);
			});

			test('should not add aria-owns when id is not set', () => {
				const childProps = {};
				const props = {
					childProps,
					noCloseButton: false
				};

				const expected = childProps;
				const actual = PanelsBase.computed.childProps(props);

				expect(actual).toBe(expected);
			});

			test('should add aria-owns', () => {
				const id = 'id';
				const childProps = {};
				const props = {
					childProps,
					noCloseButton: false,
					id
				};

				const expected = `${id}-controls`;
				const actual = PanelsBase.computed.childProps(props)['aria-owns'];

				expect(actual).toBe(expected);
			});

			test('should append aria-owns', () => {
				const id = 'id';
				const ariaOwns = ':allthethings:';
				const childProps = {
					'aria-owns': ariaOwns
				};
				const props = {
					childProps,
					noCloseButton: false,
					id
				};

				const expected = `${ariaOwns} ${id}-controls`;
				const actual = PanelsBase.computed.childProps(props)['aria-owns'];

				expect(actual).toBe(expected);
			});

			test('should append aria-owns with noCloseButton and controls', () => {
				const id = 'id';
				const ariaOwns = ':allthethings:';
				const childProps = {
					'aria-owns': ariaOwns
				};
				const props = {
					childProps,
					controls: <div>Hello</div>,
					noCloseButton: true,
					id
				};

				const expected = `${ariaOwns} ${id}-controls`;
				const actual = PanelsBase.computed.childProps(props)['aria-owns'];

				expect(actual).toBe(expected);
			});
		});
	});
});
