import classnames from 'classnames/bind';
import {generateDate, urlParamsToObject} from '@enact/ui-test-utils/utils';
import spotlight from '@enact/spotlight';
import {cloneElement, Component as ReactComponent} from 'react';

import MoonstoneDecorator from '../../../MoonstoneDecorator';

import {components, testMetadata} from './MoonstoneComponents';
import imports from './importer';

import css from './Moonstone-View.less';

const url = new URL(window.location.href);

// Bind our classnames against css modules
const cx = classnames.bind(css);

const LoremString =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat.';

// NOTE: Forcing pointer mode on to prevent spotlight focusing of components, which leads to marquee
spotlight.setPointerMode(true);

const parsed = urlParamsToObject();

function getWrapperClasses ({wrapper}) {
	return cx('wrapper', wrapper, parsed.skin);
}

// TODO: Show error on screen if bad test ID or props
function prepareTest (componentName, testId) {
	const ElementProps = {
		'data-ui-test-id': 'test',
		style: {outlineColor: 'lime'},
		className: css.outline
	};

	if (!components[componentName] || !components[componentName][testId]) {
		return {
			testElement: <div>INVALID COMPONENT OR TEST ID</div>,
			wrapperClasses: css.error
		};
	}

	let component = components[componentName][testId];

	// If this is a complex test (not a bare component), extract component for cloning
	if (component.component) {
		component = component.component;
	}

	let children = component.props.children;
	if (children === '-Lorem') {
		children = LoremString;
	}

	return {
		testElement: cloneElement(component, ElementProps, children),
		wrapperClasses: getWrapperClasses(components[componentName][testId])
	};
}

function prepareFromUrl () {
	// Naively, assuming parsed in the form of: {component: 'ComponentName', props: {}}
	const Component = imports[parsed.component];
	const componentProps = parsed.props || {};
	const wrapperProps = parsed.wrapper || {};

	if (componentProps.children === '-Lorem') {
		componentProps.children = LoremString;
	}

	if (componentProps.defaultValue && /\d{4}-\d{2}-\d{2}/.test(componentProps.defaultValue)) {
		componentProps.defaultValue = generateDate(componentProps.defaultValue);
	}
	return {
		testElement: <Component {...componentProps} />,
		wrapperClasses: getWrapperClasses({skin: parsed.skin, wrapper: wrapperProps})
	};
}

class App extends ReactComponent {
	static getDerivedStateFromError () {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	constructor (props) {
		super(props);
		this.state = {hasError: false};
	}

	render () {
		const {component, testId, ...props} = this.props;
		let testElement;
		let wrapperClasses;

		if (this.state.hasError) {
			return (
				<div {...props}>
					<div className={css.error}>
						ERROR IN {component} test {testId}
					</div>
				</div>
			);
		}

		if (testId >= 0) {
			({testElement, wrapperClasses} = prepareTest(component, testId));
		} else {
			({testElement, wrapperClasses} = prepareFromUrl());
		}

		return (
			<div {...props}>
				<div className={wrapperClasses}>{testElement}</div>
			</div>
		);
	}
}

const WrappedApp = MoonstoneDecorator({noAutoFocus: true}, App);

const ExportedApp = (props) => {

	// Common test parameters
	const skin = url.searchParams.get('skin');
	const highContrast = url.searchParams.get('highContrast') === 'true';

	// Legacy test parameters
	let locale = url.searchParams.get('locale');
	let textSize = url.searchParams.get('textSize') === 'large' ? 'large' : 'normal';

	if (props.testId >= 0 && components[props.component] && components[props.component][props.testId]) {
		locale = components[props.component][props.testId].locale;
		textSize = components[props.component][props.testId].textSize;
	}

	return (
		<WrappedApp {...props} skin={skin} highContrast={highContrast} locale={locale} textSize={textSize} />
	);
};

export default ExportedApp;
export {
	components,
	testMetadata
};
