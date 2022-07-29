import Heading from '@enact/moonstone/Heading';
import LabeledItem from '@enact/moonstone/LabeledItem';
import Scroller from '@enact/moonstone/Scroller';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

LabeledItem.displayName = 'LabeledItem';

const inputData = {
	longLabel : 'label starts - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. = label ends',
	longChildren : 'children starts - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. - children ends',
	shortLabel : 'Label',
	shortChildren : 'Hello LabeledItem',
	mediumChildren : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. The End.'
};

export default {
	title: 'Moonstone/LabeledItem',
	component: 'LabeledItem'
};

export const WithDifferentTextLength = (args) => {
	return (
		<Scroller style={{height: '100%'}}>
			<div>
				<Heading showLine style={{paddingTop: '30px'}} >Long children and Short label</Heading>
				<LabeledItem
					disabled={args['disabled']}
					label={args['label']}
				>
					{args['children2']}
				</LabeledItem>

				<Heading showLine style={{paddingTop: '30px'}}>Short children and Long label</Heading>
				<LabeledItem
					disabled={args['disabled']}
					label={args['label2']}
				>
					{args['children']}
				</LabeledItem>

				<Heading showLine style={{paddingTop: '30px'}}>Long children and Long label</Heading>
				<LabeledItem
					disabled={args['disabled']}
					label={args['label2']}
				>
					{args['children2']}
				</LabeledItem>
			</div>
		</Scroller>
	);
};

text('children', WithDifferentTextLength, LabeledItem, inputData.shortChildren);
text('children2', WithDifferentTextLength, LabeledItem, inputData.longChildren);
boolean('disabled', WithDifferentTextLength, LabeledItem);
text('label', WithDifferentTextLength, LabeledItem, inputData.shortLabel);
text('label2', WithDifferentTextLength, LabeledItem, inputData.longLabel);

WithDifferentTextLength.storyName = 'with different text length';

export const WithSpotlightDisabled = (args) => {
	return (
		<div>
			<LabeledItem
				label={args['label']}
				marqueeOn={args['marqueeOn']}
				spotlightDisabled={args['spotlightDisabled']}
			>
				{args['children']}
			</LabeledItem>
		</div>
	);
};

text('children', WithSpotlightDisabled, LabeledItem, inputData.mediumChildren);
select('marqueeOn', WithSpotlightDisabled, ['render', 'hover'], LabeledItem, 'render');
text('label', WithSpotlightDisabled, LabeledItem, inputData.shortLabel);
boolean('spotlightDisabled', WithSpotlightDisabled, LabeledItem, true);

WithSpotlightDisabled.storyName = 'with spotlightDisabled';
