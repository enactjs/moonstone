import MediaOverlay, {MediaOverlayBase, MediaOverlayDecorator} from '@enact/moonstone/MediaOverlay';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

const prop = {
	videoTitles: [
		'Sintel',
		'Big Buck Bunny',
		'VideoTest',
		'Bad Video Source'
	],
	videos: {
		'Sintel': 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		'Big Buck Bunny': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
		'VideoTest': 'http://media.w3.org/2010/05/video/movie_300.mp4',
		// Purposefully not a video to demonstrate source error state
		'Bad Video Source': 'https://github.com/mderrick/react-html5video'
	},
	imageNames: [
		'None',
		'Strawberries',
		'Tunnel',
		'Mountains',
		'Bad Image Source'
	],
	images: {
		'None': '',
		'Strawberries': 'https://picsum.photos/1280/720?image=1080',
		'Tunnel': 'https://picsum.photos/1280/720?image=1063',
		'Mountains': 'https://picsum.photos/1280/720?image=930',
		'Bad Image Source': 'imagenotfound.png'
	},
	text: [
		'',
		'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.',
		'Η γρήγορη καφέ αλεπού πήδηξε πάνω από το μεσημέρι. Το πουλί πετά σε φασολιών δύση του ηλίου.',
		'ਤੁਰੰਤ ਭੂਰਾ Fox ਆਲਸੀ ਕੁੱਤੇ ਨੂੰ ਵੱਧ ਗਈ. ਬੀਨ ਪੰਛੀ ਸੂਰਜ ਡੁੱਬਣ \'ਤੇ ਉਡਾਣ ਭਰਦੀ ਹੈ.',
		'速い茶色のキツネは、怠け者の犬を飛び越えた。豆の鳥は日没で飛ぶ。',
		'那只敏捷的棕色狐狸跃过那只懒狗。豆鸟飞日落。',
		'빠른 갈색 여우가 게으른 개를 뛰어 넘었다.콩 조류 일몰에 파리.',
		'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקיעה.',
		'قفز الثعلب البني السريع فوق الكلب الكسول. الطيور تطير في الفول عند غروب الشمس.',
		'فوری بھوری لومڑی سست کتے پر چھلانگ لگا. بین پرندوں سوریاست میں پرواز.'
	],
	placeholderNames: [
		'None',
		'SVG'
	],
	placeholder: {
		'None': '',
		'SVG': 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
		'9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
		'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
		'4NCg=='
	}
};

MediaOverlay.displayName = 'MediaOverlay';
const Config = mergeComponentMetadata(
	'MediaOverlay',
	MediaOverlay,
	MediaOverlayBase,
	MediaOverlayDecorator
);
Config.groupId = 'MediaOverlay';

export default {
	title: 'Moonstone/MediaOverlay',
	component: 'MediaOverlay'
};

export const _MediaOverlay = (args) => {
	const videoTitle = args['source'];
	const videoSource = prop.videos[videoTitle];
	const imageName = args['imageOverlay'];
	const imageSource = prop.images[imageName];
	const placeholderName = args['placeholder'];
	const placeholder = prop.placeholder[placeholderName];
	return (
		<MediaOverlay
			disabled={args['disabled']}
			imageOverlay={imageSource}
			placeholder={placeholder}
			text={args['text']}
			textAlign={args['textAlign']}
		>
			<source src={videoSource} />
		</MediaOverlay>
	);
};

boolean('disabled', _MediaOverlay, Config);
select('imageOverlay', _MediaOverlay, prop.imageNames, Config);
select('placeholder', _MediaOverlay, prop.placeholderNames, Config, 'None');
select('source', _MediaOverlay, prop.videoTitles, Config, 'Sintel');
select('text', _MediaOverlay, prop.text, Config, prop.text[0]);
select('textAlign', _MediaOverlay, ['start', 'center', 'end'], Config, 'center');

_MediaOverlay.storyName = 'MediaOverlay';
_MediaOverlay.parameters = {
	info: {
		text: 'The basic MediaOverlay'
	}
};
