import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import MoonstoneDecorator from '../';

import css from '../MoonstoneDecorator.module.less';

describe('MoonstoneDecorator', () => {
	const AppRoot = (props) => <div data-app {...props} />;

	test('should add base moonstone classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = MoonstoneDecorator(config, AppRoot);
		render(<App data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');
		const expectedClass = 'moonstone';
		const expectedBgClass = css.bg;

		expect(appRoot).toHaveClass(expectedClass);
		expect(appRoot).toHaveClass(expectedBgClass);
	});

	test('should add author classes to wrapped component', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: false};
		const App = MoonstoneDecorator(config, AppRoot);
		render(<App className="author-class" data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');
		const expectedClass = 'author-class';

		expect(appRoot).toHaveClass(expectedClass);
	});

	test('should not add .moonstone class to wrapped component when float is enabled', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: true, overlay: false};
		const App = MoonstoneDecorator(config, AppRoot);
		render(<App data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');
		const notExpected = 'moonstone';

		expect(appRoot).not.toHaveClass(notExpected);
	});

	test('should not add .bg class to wrapped component when overlay is enabled', () => {
		const config = {ri: false, i18n: false, spotlight: false, float: false, overlay: true};
		const App = MoonstoneDecorator(config, AppRoot);
		render(<App data-testid="app" />);

		Spotlight.terminate();

		const appRoot = screen.getByTestId('app');
		const notExpected = css.bg;

		expect(appRoot).not.toHaveClass(notExpected);
	});
});
