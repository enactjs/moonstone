import ExpandableInput from '@enact/moonstone/ExpandableInput';
import Heading from '@enact/moonstone/Heading';
import Input from '@enact/moonstone/Input';
import Scroller from '@enact/moonstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';

const InputView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<Input size="small" />
			<Input size="small" placeholder="Disabled input" disabled />
			<Input size="small" iconAfter="lock" />
			<Input size="small" placeholder="Enter number" type="number" />
			<Input size="small" placeholder="Enter password" type="password" />
			<Input size="small" placeholder="Dismiss on Enter" dismissOnEnter />
			<Input size="small" defaultValue="Initial value" />
			<Input size="small" placeholder="Placeholder" />
			<Heading showLine>Expandable Input</Heading>
			<ExpandableInput title="No noneText" />
			<ExpandableInput title="Disabled Input" noneText="I am disabled." disabled />
			<ExpandableInput title="Input with noneText" noneText="Nothing inputted" />
			<ExpandableInput title="Input with defaultValue" defaultValue="Initial value" />
			<ExpandableInput title="Input with Placeholder" noneText="No input" placeholder="Placeholder" />
			<ExpandableInput title="Input with Password" type="password" />
			<Heading showLine>Customizable aria-labels</Heading>
			<Input size="small" iconBefore="plus" aria-label="add input" />
			<ExpandableInput title="Expandable Input" aria-label="expandable input" />
		</Cell>
	</Layout>
);

export default InputView;
