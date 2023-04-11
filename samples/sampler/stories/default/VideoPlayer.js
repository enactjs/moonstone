import Button from '@enact/moonstone/Button';
import IconButton from '@enact/moonstone/IconButton';
import VideoPlayer, {MediaControls, VideoPlayerBase} from '@enact/moonstone/VideoPlayer';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';

import icons from '../helper/icons';

// Set up some defaults for info and controls
const prop = {
	moreButtonColor: [
		'',
		'red',
		'green',
		'yellow',
		'blue'
	],
	videoTitles: [
		'Sintel',
		'Big Buck Bunny',
		'VideoTest',
		'Bad Video Source'
	],
	videos: {
		'Sintel': 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		'Big Buck Bunny': 'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov',
		'VideoTest': 'http://media.w3.org/2010/05/video/movie_300.mp4',
		// Purposefully not a video to demonstrate source error state
		'Bad Video Source': 'https://github.com/mderrick/react-html5video'
	},
	posters: {
		'Sintel': 'http://media.w3.org/2010/05/sintel/poster.png',
		'Big Buck Bunny': 'http://media.w3.org/2010/05/bunny/poster.png',
		'VideoTest': 'http://media.w3.org/2010/05/video/poster.png',
		'Bad Video Source': 'http://media.w3.org/2010/05/video/poster.png'
	},
	events: [
		'onAbort',
		'onCanPlay',
		'onCanPlayThrough',
		'onControlsAvailable',
		'onDurationChange',
		'onEmptied',
		'onEncrypted',
		'onEnded',
		'onError',
		'onFastForward',
		'onJumpBackward',
		'onJumpForward',
		'onLoadedData',
		'onLoadedMetadata',
		'onLoadStart',
		'onPause',
		'onPlay',
		'onPlaying',
		'onProgress',
		'onRateChange',
		'onRewind',
		'onSeeked',
		'onSeekFailed',
		'onSeeking',
		'onStalled',
		'onSuspend',
		// 'onTimeUpdate',	// Disabled due to Storybook Actions-reporting having an adverse effect on VideoPlayer performance. Uncomment to view this event.
		'onVolumeChange',
		'onWaiting'
	]
};

prop.eventActions = {};
prop.events.forEach( (ev) => {
	prop.eventActions[ev] = action(ev);
});

MediaControls.displayName = 'MediaControls';
const MediaControlsConfig = mergeComponentMetadata(
	'MediaControls',
	MediaControls
);

VideoPlayer.displayName = 'VideoPlayer';
const Config = mergeComponentMetadata(
	'VideoPlayer',
	VideoPlayer,
	VideoPlayerBase
);

export default {
	title: 'Moonstone/VideoPlayer',
	component: 'VideoPlayer'
};

export const _VideoPlayer = (args) => {
	const videoTitle = args['source'];
	const videoSource = prop.videos[videoTitle];
	const poster = prop.posters[videoTitle];
	return (
		<div
			style={{
				height: '70vh',
				outline: 'teal dashed 1px',
				transform: 'scale(' + args['video scale'] + ')',
				transformOrigin: 'top'
			}}
		>
			<label
				style={{
					backgroundColor: 'rgba(0, 128, 128, 0.5)',
					borderBottomWidth: 0,
					color: '#0bb',
					fontSize: '16px',
					fontStyle: 'italic',
					fontWeight: 100,
					outline: 'teal dashed 1px',
					padding: '0.1em 1em',
					position: 'absolute',
					transform: 'translateY(-100%)'
				}}
			>
				VideoPlayer Edge
			</label>
			<VideoPlayer
				autoCloseTimeout={args['autoCloseTimeout']}
				disabled={args['disabled']}
				feedbackHideDelay={args['feedbackHideDelay']}
				loop={args['loop']}
				miniFeedbackHideDelay={args['miniFeedbackHideDelay']}
				muted={args['muted']}
				noAutoPlay={args['noAutoPlay']}
				noAutoShowMediaControls={args['noAutoShowMediaControls']}
				noMediaSliderFeedback={args['noMediaSliderFeedback']}
				noMiniFeedback={args['noMiniFeedback']}
				noSlider={args['noSlider']}
				pauseAtEnd={args['pauseAtEnd']}
				poster={poster}
				seekDisabled={args['seekDisabled']}
				spotlightDisabled={args['spotlightDisabled']}
				thumbnailSrc={poster}
				thumbnailUnavailable={args['thumbnailUnavailable']}
				title={args['title']}
				titleHideDelay={args['titleHideDelay']}
				{...prop.eventActions}
			>
				<source src={videoSource} type="video/mp4" />
				<infoComponents>A video about some things happening to and around some characters. Very exciting stuff.</infoComponents>
				<MediaControls
					backwardIcon={args['backwardIcon']}
					forwardIcon={args['forwardIcon']}
					initialJumpDelay={args['initialJumpDelay']}
					jumpBackwardIcon={args['jumpBackwardIcon']}
					jumpButtonsDisabled={args['jumpButtonsDisabled']}
					jumpDelay={args['jumpDelay']}
					jumpForwardIcon={args['jumpForwardIcon']}
					moreButtonCloseLabel={args['moreButtonCloseLabel']}
					moreButtonColor={args['moreButtonColor']}
					moreButtonDisabled={args['moreButtonDisabled']}
					moreButtonLabel={args['moreButtonLabel']}
					no5WayJump={args['no5WayJump']}
					noJumpButtons={args['noJumpButtons']}
					noRateButtons={args['noRateButtons']}
					pauseIcon={args['pauseIcon']}
					playIcon={args['playIcon']}
					playPauseButtonDisabled={args['playPauseButtonDisabled']}
					rateButtonsDisabled={args['rateButtonsDisabled']}
				>
					<leftComponents>
						<IconButton backgroundOpacity="translucent" size="large">fullscreen</IconButton>
					</leftComponents>
					<rightComponents>
						<IconButton backgroundOpacity="translucent" size="large">flag</IconButton>
					</rightComponents>
					<Button backgroundOpacity="translucent" size="large">Add To Favorites</Button>
					<IconButton backgroundOpacity="translucent" size="large">star</IconButton>
				</MediaControls>
			</VideoPlayer>
		</div>
	);
};

boolean('disabled', _VideoPlayer, Config);
boolean('jumpButtonsDisabled', _VideoPlayer, MediaControlsConfig);
boolean('loop', _VideoPlayer, Config, true);
boolean('moreButtonDisabled', _VideoPlayer, MediaControlsConfig);
boolean('muted', _VideoPlayer, Config, true);
boolean('no5WayJump', _VideoPlayer, MediaControlsConfig);
boolean('noAutoPlay', _VideoPlayer, Config);
boolean('noAutoShowMediaControls', _VideoPlayer, Config);
boolean('noJumpButtons', _VideoPlayer, MediaControlsConfig);
boolean('noMediaSliderFeedback', _VideoPlayer, Config, false);
boolean('noMiniFeedback', _VideoPlayer, Config);
boolean('noRateButtons', _VideoPlayer, MediaControlsConfig);
boolean('noSlider', _VideoPlayer, Config);
boolean('pauseAtEnd', _VideoPlayer, Config);
boolean('playPauseButtonDisabled', _VideoPlayer, MediaControlsConfig);
boolean('rateButtonsDisabled', _VideoPlayer, MediaControlsConfig);
boolean('seekDisabled', _VideoPlayer, Config);
boolean('spotlightDisabled', _VideoPlayer, Config);
boolean('thumbnailUnavailable', _VideoPlayer, Config);
number('autoCloseTimeout', _VideoPlayer, Config, 7000);
number('feedbackHideDelay', _VideoPlayer, Config, 3000);
number('initialJumpDelay', _VideoPlayer, MediaControlsConfig, 400);
number('jumpDelay', _VideoPlayer, MediaControlsConfig, 200);
number('miniFeedbackHideDelay', _VideoPlayer, Config, 2000);
number('titleHideDelay', _VideoPlayer, Config, 4000);
number('video scale', _VideoPlayer, Config, {range: true, min: 0.05, max: 1, step: 0.01}, 1);
select('backwardIcon', _VideoPlayer, icons, MediaControlsConfig, 'backward');
select('forwardIcon', _VideoPlayer, icons, MediaControlsConfig, 'forward');
select('jumpBackwardIcon', _VideoPlayer, icons, MediaControlsConfig, 'jumpbackward');
select('jumpForwardIcon', _VideoPlayer, icons, MediaControlsConfig, 'jumpforward');
select('moreButtonColor', _VideoPlayer, prop.moreButtonColor, MediaControlsConfig, '');
select('pauseIcon', _VideoPlayer, icons, MediaControlsConfig, 'pause');
select('playIcon', _VideoPlayer, icons, MediaControlsConfig, 'play');
select('source', _VideoPlayer, prop.videoTitles, Config, 'Sintel');
text('moreButtonCloseLabel', _VideoPlayer, MediaControlsConfig);
text('moreButtonLabel', _VideoPlayer, MediaControlsConfig);
text('title', _VideoPlayer, Config, 'Moonstone VideoPlayer Sample Video');

_VideoPlayer.storyName = 'VideoPlayer';
_VideoPlayer.parameters = {
	info: {
		text: 'The basic VideoPlayer'
	}
};
