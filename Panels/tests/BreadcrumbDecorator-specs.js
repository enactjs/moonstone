import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import BreadcrumbDecorator from '../BreadcrumbDecorator';
import Panels from '../Panels';

describe('BreadcrumbDecorator', () => {
	const Panel = () => <div />;

	test('should wrap primitive breadcrumbs with Breadcrumb', () => {
		const SingleBreadcrumbPanels = BreadcrumbDecorator({
			max: 1
		}, Panels);

		render(
			<SingleBreadcrumbPanels index={2} breadcrumbs={['1st', '2nd', '3rd']}>
				<Panel />
				<Panel />
				<Panel />
			</SingleBreadcrumbPanels>
		);

		const actual = screen.getByText('2nd');

		expect(actual).toBeInTheDocument();
	});

	test('should generate {config.max} breadcrumbs', () => {
		const ThreeBreadcrumbPanels = BreadcrumbDecorator({
			max: 3
		}, Panels);

		render(
			<ThreeBreadcrumbPanels data-testid="breadcrumbDecorator" index={3}>
				<Panel />
				<Panel />
				<Panel />
				<Panel />
			</ThreeBreadcrumbPanels>
		);

		const firstBreadcrumb = screen.getByText(/01/);
		const secondBreadcrumb = screen.getByText(/02/);
		const thirdBreadcrumb = screen.getByText(/03/);
		const forthBreadcrumb = screen.queryByText(/04/);

		expect(firstBreadcrumb).toBeInTheDocument();
		expect(secondBreadcrumb).toBeInTheDocument();
		expect(thirdBreadcrumb).toBeInTheDocument();
		expect(forthBreadcrumb).toBeNull();
	});

	test('should add {config.className} to the root node', () => {
		const className = 'root-node';
		const StyledBreadcrumbPanels = BreadcrumbDecorator({
			className
		}, Panels);

		render(
			<StyledBreadcrumbPanels data-testid="breadcrumb">
				<Panel />
			</StyledBreadcrumbPanels>
		);

		const expected = className;
		const rootNode = screen.getByTestId('breadcrumb').parentElement;

		expect(rootNode).toHaveClass(expected);
	});

	test('should not set aria-owns when no breadcrumbs are needed', () => {
		const ThreeBreadcrumbPanels = BreadcrumbDecorator({
			max: 3
		}, Panels);

		render(
			<ThreeBreadcrumbPanels index={0} noCloseButton>
				<Panel />
				<Panel />
				<Panel />
				<Panel />
			</ThreeBreadcrumbPanels>
		);

		// aria-owns is not visible in the DOM, so aria-label is used instead
		const actual = screen.queryByLabelText('aria-label');

		expect(actual).toBeNull();
	});

	test('should set aria-owns on each Panel for the breadcrumbs', () => {
		const ThreeBreadcrumbPanels = BreadcrumbDecorator({
			max: 3
		}, Panels);

		render(
			<ThreeBreadcrumbPanels index={3} noCloseButton>
				<Panel />
				<Panel />
				<Panel />
				<Panel />
			</ThreeBreadcrumbPanels>
		);

		const firstPanel = screen.getByText(/01/).parentElement;
		const secondPanel = screen.getByText(/02/).parentElement;
		const thirdPanel = screen.getByText(/03/).parentElement;

		// aria-owns is not visible in the DOM, so aria-label is used instead
		expect(firstPanel).toHaveAttribute('aria-label', 'GO TO PREVIOUS');
		expect(secondPanel).toHaveAttribute('aria-label', 'GO TO PREVIOUS');
		expect(thirdPanel).toHaveAttribute('aria-label', 'GO TO PREVIOUS');
	});

	test('should set aria-owns on each Panel for the `max` breadcrumbs', () => {
		const ThreeBreadcrumbPanels = BreadcrumbDecorator({
			max: 1
		}, Panels);

		render(
			<ThreeBreadcrumbPanels id="test" index={3} noCloseButton>
				<Panel />
				<Panel />
				<Panel />
				<Panel />
			</ThreeBreadcrumbPanels>
		);

		// tests for truncated {config.max} aria-owns entries in the format ${id}_bc_{$index}
		const expected = 'test_bc_2';
		const actual = screen.getByText(/03/).parentElement;

		expect(actual).toHaveAttribute('id', expected);
	});
});
