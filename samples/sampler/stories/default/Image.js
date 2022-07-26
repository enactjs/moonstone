import Image, {ImageBase, ImageDecorator} from '@enact/moonstone/Image';
import {action} from '@enact/storybook-utils/addons/actions';
import {select} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';

const src = {
	'hd':  'http://via.placeholder.com/200x200',
	'fhd': 'http://via.placeholder.com/400x400',
	'uhd': 'http://via.placeholder.com/600x600'
};

const Config = mergeComponentMetadata('Image', Image, ImageBase, ImageDecorator);
Image.displayName = 'Image';

export default {
	title: 'Moonstone/Image',
	component: 'Image'
};

export const _Image = (args) => (
	<Image
		onError={action('error')}
		onLoad={action('loaded')}
		sizing={args['sizing']}
		src={args['src']}
		style={{
			border: '#ffa500 dashed 1px'
		}}
	>
		<label
			style={{
				border: '#ffa500 dashed 1px',
				borderBottomWidth: 0,
				borderRadius: '6px 6px 0 0',
				backgroundColor: 'rgba(255, 165, 0, 0.5)',
				color: '#fff',
				position: 'absolute',
				transform: 'translateX(-1px) translateY(-100%)',
				padding: '0.1em 1em',
				fontWeight: 100,
				fontStyle: 'italic',
				fontSize: '16px'
			}}
		>
			Image Boundry
		</label>
	</Image>
);

select('sizing', _Image, ['fill', 'fit', 'none'], Config, 'fill');
select('src', _Image, src, Config);

_Image.storyName = 'Image';
_Image.parameters = {
	info: {
		text: 'The basic Image'
	}
};
