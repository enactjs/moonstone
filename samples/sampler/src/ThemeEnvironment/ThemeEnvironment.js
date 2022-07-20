// Moonstone Environment

import classnames from 'classnames';
import kind from '@enact/core/kind';
import platform from '@enact/core/platform';
import PropTypes from 'prop-types';
import {Column, Cell} from '@enact/ui/Layout';

import BodyText from '@enact/moonstone/BodyText';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels, Panel, Header} from '@enact/moonstone/Panels';

import css from './ThemeEnvironment.less';

const reloadPage = () => {
	const {protocol, host, pathname} = window.parent.location;
	window.parent.location.href = protocol + '//' + host + pathname;
};

const PanelsBase = kind({
	name: 'MoonstoneEnvironmentPanels',

	propTypes: {
		description: PropTypes.string,
		noHeader: PropTypes.bool,
		noPanel: PropTypes.bool,
		noPanels: PropTypes.bool,
		title: PropTypes.string
	},

	styles: {
		css,
		className: 'moonstoneEnvironmentPanels'
	},

	render: ({children, className, description, noHeader, noPanel, noPanels, title, ...rest}) => {
		// eslint-disable-next-line
		const android = platform.platformName.includes('android') && screen.availHeight < screen.availWidth;
		const panelsClassName = `${className} ${android ? css.panelsAndroid : ''}`;

		return (
			!noPanels ? <Panels {...rest} className={panelsClassName} onApplicationClose={reloadPage}>
				{!noPanel ? <Panel className={css.panel}>
					{!noHeader ? [<Header type="compact" title={title} key="header" />,
						<Column key="body">
							{description ? (
								<Cell shrink component={BodyText} className={css.description}>{description}</Cell>
							) : null}
							<Cell className={css.storyCell}>{children}</Cell>
						</Column>] : children
					}
				</Panel> : children}
			</Panels> : <div {...rest}>{children}</div>
		);
	}
});

const Theme = MoonstoneDecorator({overlay: false}, PanelsBase);

const StorybookDecorator = (story, config = {}) => {
	// Executing `story` here allows the story controls to register and render before the global variable below.
	const sample = story();

	const {globals} = config;

	if (sample && sample.props && sample.props.info) {
		config.description = sample.props.info;
	}

	const componentName = config.kind.replace(/^([^/]+)\//, '');

	// NOTE: 'config' object is not extensible.
	const hasInfoText = config.parameters && config.parameters.info && config.parameters.info.text;
	const hasProps = config.parameters && config.parameters.props;

	const classes = {
		aria: JSON.parse(globals['debug aria']),
		layout: JSON.parse(globals['debug layout']),
		spotlight: JSON.parse(globals['debug spotlight']),
		sprites: JSON.parse(globals['debug sprites'])
	};
	if (Object.keys(classes).length > 0) {
		classes.debug = true;
	}

	return (
		<Theme
			className={classnames(classes)}
			title={componentName === config.name ? `${config.kind}`.replace(/\//g, ' ').trim() : `${componentName} ${config.name}`}
			description={hasInfoText ? config.parameters.info.text : null}
			locale={globals.locale}
			textSize={globals.largeText ? 'large' : 'normal'}
			highContrast={globals.highContrast}
			style={{
				'--moon-env-background': globals.background === 'default' ? '' : globals.background
			}}
			skin={globals.skin}
			{...hasProps ? config.parameters.props : null}
			noHeader={config.noHeader}
			noPanel={config.noPanel}
			noPanels={config.noPanels}
		>
			{sample}
		</Theme>
	);
};

export default StorybookDecorator;
export {StorybookDecorator as Theme};
