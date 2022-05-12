import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import IconButton from '@enact/moonstone/IconButton';
import Scroller from '@enact/moonstone/Scroller';
import ToggleButton from '@enact/moonstone/ToggleButton';
import TooltipDecorator from '@enact/moonstone/TooltipDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';

const
	StatefulButton = Toggleable({toggle: 'onClick', prop: 'selected'}, Button),
	StatefulIconButton = Toggleable({toggle: 'onClick', prop: 'selected'}, IconButton),
	StatefulToggleButton = Toggleable({toggle: 'onClick', prop: 'selected'}, ToggleButton),
	TooltipButton = TooltipDecorator(Button);

const ButtonView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<Button size="small" />
			<Button size="small">Button</Button>
			<StatefulButton size="small" color="red">Red Button</StatefulButton>
			<StatefulButton size="small" color="blue">Blue Button</StatefulButton>
			<StatefulButton size="small" disabled>Disabled Button</StatefulButton>
			<Heading showLine>Icon Buttons</Heading>
			<StatefulIconButton size="small">play</StatefulIconButton>
			<StatefulIconButton size="small">plus</StatefulIconButton>
			<Heading showLine>Buttons with Tooltip</Heading>
			<TooltipButton size="small" tooltipProps={{role: 'dialog'}} tooltipText="fruit">apple</TooltipButton>
			<TooltipButton size="small" aria-label="greetings!" tooltipProps={{role: 'dialog'}} tooltipText="bye!">hello!</TooltipButton>
			<IconButton size="small" aria-label="plus icon!" tooltipProps={{role: 'dialog'}} tooltipText="plus icon!">plus</IconButton>
			<Heading showLine>Toggle Buttons</Heading>
			<StatefulToggleButton size="small" >Toggle Button</StatefulToggleButton>
			<StatefulToggleButton size="small" disabled>Disabled Toggle Button</StatefulToggleButton>
			<StatefulToggleButton size="small" toggleOffLabel="Close" toggleOnLabel="Open" />
			<Heading showLine>Aria-labeled Buttons</Heading>
			<StatefulButton size="small" color="yellow" aria-label="color button">yellow Button</StatefulButton>
			<StatefulIconButton size="small" aria-label="plug icon button">plug</StatefulIconButton>
			<StatefulToggleButton size="small" toggleOffLabel="Off" toggleOnLabel="On" aria-label="Toggle button" />
		</Cell>
	</Layout>
);

export default ButtonView;
