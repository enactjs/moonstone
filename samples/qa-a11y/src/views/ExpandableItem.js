import Heading from '@enact/moonstone/Heading';
import ExpandableItem from '@enact/moonstone/ExpandableItem';
import Icon from '@enact/moonstone/Icon';
import Item from '@enact/moonstone/Item';
import Scroller from '@enact/moonstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';

const ExpandableItemView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<ExpandableItem
				title="title"
			>
				<Item>
					This can be any type of content you might want to
					render inside a labeled expandable container
				</Item>
				<Item>
					<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
				</Item>
			</ExpandableItem>
			<Heading showLine>Customizable aria-labels</Heading>
			<ExpandableItem
				title="title"
			>
				<Item aria-label="first item">
					This can be any type of content you might want to
					render inside a labeled expandable container
				</Item>
				<Item aria-label="second item">
					<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
				</Item>
			</ExpandableItem>
		</Cell>
	</Layout>
);

export default ExpandableItemView;
