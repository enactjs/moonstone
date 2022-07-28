import kind from '@enact/core/kind';
import BodyText from '@enact/moonstone/BodyText';
import Button from '@enact/moonstone/Button';
import TooltipDecorator from '@enact/moonstone/TooltipDecorator';
import Input from '@enact/moonstone/Input';
import IconButton from '@enact/moonstone/IconButton';
import Scroller from '@enact/moonstone/Scroller';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, object, select, text} from '@enact/storybook-utils/addons/controls';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

const Config = mergeComponentMetadata('TooltipDecorator', TooltipDecorator);
const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const prop = {
	tooltipPosition: {
		'above': 'above',
		'above center': 'above center',
		'above left': 'above left',
		'above right': 'above right',
		'below': 'below',
		'below center': 'below center',
		'below left': 'below left',
		'below right': 'below right',
		'left bottom': 'left bottom',
		'left middle': 'left middle',
		'left top': 'left top',
		'right bottom': 'right bottom',
		'right middle': 'right middle',
		'right top': 'right top'
	},
	ariaObject: {
		'aria-hidden': false,
		'aria-label': 'Tooltip Label',
		'role': 'alert'
	}
};

const TooltipTest = () => {
	const [showButton, setShowButton] = useState(true);

	const handleClick = useCallback(() => {
		setShowButton(false);
	}, []);

	return (
		<div>
			Focus the button and click it before 5s has elapsed, and observe the console for errors
			{showButton ? (
				<TooltipButton
					onClick={handleClick}
					tooltipDelay={5000}
					tooltipText="Tooltip position!"
					tooltipRelative
				>
					Click me
				</TooltipButton>
			) : null}
		</div>
	);
};

const ChangeableTooltip = ({tooltipPosition}) => {
	const [left, setLeft] = useState(0);
	const [changeableText, setChangeableText] = useState('short');
	const [top, setTop] = useState(0);

	const style = {
		position: 'absolute',
		width: ri.unit(390, 'rem'),
		left: '50%',
		transform: 'translateX(-50%)'
	};

	const changeTooltipText = useCallback(() => {
		if (changeableText === 'short') {
			setChangeableText('long text');
		} else if (changeableText === 'long text') {
			setChangeableText('very loooooooooooong text');
		} else if (changeableText === 'very loooooooooooong text') {
			setChangeableText( '');
		} else {
			setChangeableText('short');
		}
	}, [changeableText]);

	const handleChangeLeft = useCallback(({value}) => {
		setLeft(value);
	}, []);

	const handleChangeTop = useCallback(({value}) => {
		setTop(value);
	}, []);

	return (
		<div>
			<div style={style}>
				<div>LEFT : </div>
				<Input id="left" onChange={handleChangeLeft} size="small" type="number" value={left} />
				<div>TOP : </div>
				<Input id="top" onChange={handleChangeTop} size="small" type="number" value={top} />
				<Button onClick={changeTooltipText}>Change Text</Button>
			</div>
			<IconButton
				onClick={changeTooltipText}
				style={{
					position: 'absolute',
					left: parseInt(left || 0),
					top: parseInt(top || 0)
				}}
				tooltipPosition={tooltipPosition}
				tooltipText={changeableText}
			>
				drawer
			</IconButton>
		</div>
	);
};

ChangeableTooltip.propTypes = {
	tooltipPosition: PropTypes.text
};

const IconButtonItem = kind({
	name: 'IconButtonItem',
	render: ({...rest}) => {
		return (
			<div style={{height: 100, border: 'solid 3px yellow'}}>
				<IconButton
					size="small"
					tooltipText="tooltip"
					{...rest}
				>
					plus
				</IconButton>
				<IconButton
					size="small"
					style={{marginLeft: '450px'}}
					tooltipText="tooltip"
					{...rest}
				>
					plus
				</IconButton>
			</div>
		);
	}
});

const TooltipFollow = () => {
	const [left, setLeft] = useState(0);
	const [widthMinus, setWidthMinus] = useState(180);
	const [widthPlus, setWidthPlus] = useState(30);

	const handleWidthMinusClick = useCallback(() => {
		setWidthMinus(widthMinus - 30);
	}, [widthMinus]);

	const handleWidthPlusClick = useCallback(() => {
		setWidthPlus(widthPlus + 30);
	}, [widthPlus]);

	const handlePositionClick = useCallback(() => {
		setLeft(left + 30);
	}, [left]);

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<BodyText>Click icon buttons to resize or move</BodyText>
				<IconButton
					onClick={handleWidthMinusClick}
					size="small"
					style={{width: `${widthMinus}px`}}
					tooltipText="tooltip"
				>
					minus
				</IconButton>
				<IconButton
					onClick={handleWidthPlusClick}
					size="small"
					style={{width: `${widthPlus}px`}}
					tooltipText="tooltip"
				>
					plus
				</IconButton>
				<IconButton
					onClick={handlePositionClick}
					size="small"
					style={{left: `${left}px`}}
					tooltipText="tooltip"
				>
					plus
				</IconButton>
			</Cell>
			<Cell component={Scroller}>
				<IconButtonItem tooltipPosition="above" />
				<IconButtonItem tooltipPosition="above center" />
				<IconButtonItem tooltipPosition="above left" />
				<IconButtonItem tooltipPosition="above right" />
				<IconButtonItem tooltipPosition="below" />
				<IconButtonItem tooltipPosition="below center" />
				<IconButtonItem tooltipPosition="below left" />
				<IconButtonItem tooltipPosition="below right" />
				<IconButtonItem tooltipPosition="left bottom" />
				<IconButtonItem tooltipPosition="left middle" />
				<IconButtonItem tooltipPosition="left top" />
				<IconButtonItem tooltipPosition="right bottom" />
				<IconButtonItem tooltipPosition="right middle" />
				<IconButtonItem tooltipPosition="right top" />
				<IconButtonItem />
			</Cell>
			<Cell shrink component={BodyText} centered>
				<em>This space left intentionally blank for bottom margin below scroller</em>
			</Cell>
		</Layout>
	);
};

export default {
	title: 'Moonstone/Tooltip',
	component: 'Tooltip'
};

export const ShowAfterButtonUnmounted = () => (
	<TooltipTest />
);

ShowAfterButtonUnmounted.storyName = 'that shows after Button is unmounted (ENYO-3809)';
ShowAfterButtonUnmounted.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const ChangeableTooltipText = (args) => (
	<ChangeableTooltip tooltipPosition={args['tooltipPosition']} />
);

select('tooltipPosition', ChangeableTooltipText, prop.tooltipPosition, Config, 'above');

ChangeableTooltipText.storyName = 'tooltipDecorator with changeable tooltipText';

export const FollowComponent = () => (
	<TooltipFollow />
);

FollowComponent.storyName = 'tooltip to follow component when changed';
FollowComponent.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const TooltipOverflow = (args) => {
	const buttonAlignment = args['button alignment'];
	const tooltipDelay = args['tooltipDelay'];
	const tooltipText = args['tooltipText'];
	const tooltipPosition = args['tooltipPosition'];
	const tooltipProps = args['tooltipProps'];
	const tooltipRelative = args['tooltipRelative'];
	return (
		<Layout align={buttonAlignment + ' space-between'} className="enact-fit" orientation="vertical" style={{position: 'fixed', padding: `${ri.unit(ri.scale(18), 'rem')} ${ri.unit(ri.scale(12), 'rem')}`}}>
			<Cell shrink>
				<Layout align="center space-between">
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Top Left
						</TooltipButton>
					</Cell>
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Top
						</TooltipButton>
					</Cell>
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Top Right
						</TooltipButton>
					</Cell>
				</Layout>
			</Cell>
			<Cell shrink>
				<Layout align="center space-between">
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Left
						</TooltipButton>
					</Cell>
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Center
						</TooltipButton>
					</Cell>
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Right
						</TooltipButton>
					</Cell>
				</Layout>
			</Cell>
			<Cell shrink>
				<Layout align="center space-between">
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Bottom Left
						</TooltipButton>
					</Cell>
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Bottom
						</TooltipButton>
					</Cell>
					<Cell shrink>
						<TooltipButton
							tooltipDelay={tooltipDelay}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
							tooltipText={tooltipText}
						>
							Bottom Right
						</TooltipButton>
					</Cell>
				</Layout>
			</Cell>
		</Layout>
	);
};

select('button alignment', TooltipOverflow, {'': null, start: 'start', end: 'end'}, Config);
number('tooltipDelay', TooltipOverflow, Config, 500);
select('tooltipPosition', TooltipOverflow, prop.tooltipPosition, Config, 'above');
object('tooltipProps', TooltipOverflow, Config, prop.ariaObject);
boolean('tooltipRelative', TooltipOverflow, Config);
text('tooltipText', TooltipOverflow, Config, 'tooltip position!');

TooltipOverflow.storyName = 'tooltip overflows';
