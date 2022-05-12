import VideoPlayer, {Video} from '@enact/moonstone/VideoPlayer';
import {button} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import {useCallback, useState} from 'react';

const videoTabLabel = 'VideoPlayer';

const videoTitles = [
	'Big Buck Bunny',
	'Sintel',
	'VideoTest'
];

const playlist = [
	'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov',
	'http://media.w3.org/2010/05/sintel/trailer.mp4',
	'http://media.w3.org/2010/05/video/movie_300.mp4'
];

const lastIndex = playlist.length - 1;

const VideoSourceSwap = () => {
	const [cursor, setCursor] = useState(0);
	const [preloadCursor, setPreloadCursor] = useState(1);

	const nextVideo = useCallback(() => {
		setCursor(cursor === lastIndex ? 0 : cursor + 1);
		setPreloadCursor(preloadCursor === lastIndex ? 0 : preloadCursor + 1);
	}, [cursor, preloadCursor]);

	const differentVideo = useCallback(() => {
		setCursor((cursor + 2) % playlist.length);
		setPreloadCursor((preloadCursor + 2) % playlist.length);
	}, [cursor, preloadCursor]);

	const nextVideoKeepPreload = useCallback(() => {
		setCursor(cursor === lastIndex ? 0 : cursor + 1);
	}, [cursor]);

	const nextPreloadVideoKeepVideo = useCallback(() => {
		setPreloadCursor(preloadCursor ===  lastIndex ? 0 : preloadCursor + 1);
	}, [preloadCursor]);

	const resetSources = useCallback(() => {
		setCursor(0);
		setPreloadCursor(1);
	}, []);

	return (
		<div>
			{button('Next Preload Video', nextVideo, videoTabLabel)}
			{button('Non Preload Video', differentVideo, videoTabLabel)}
			{button('Next Preload Video without changing preload', nextVideoKeepPreload, videoTabLabel)}
			{button('Change Preload without changing video', nextPreloadVideoKeepVideo, videoTabLabel)}
			{button('Reset Sources', resetSources, videoTabLabel)}
			<VideoPlayer
				muted
				onJumpBackward={differentVideo}
				onJumpForward={nextVideo}
				title={videoTitles[cursor]}
			>
				<Video>
					<source src={playlist[cursor]} />
					<source slot="preloadSource" src={playlist[preloadCursor]} />
				</Video>
				<infoComponents>A video about some things happening to and around some characters. Very exciting stuff.</infoComponents>
			</VideoPlayer>
		</div>

	);
};

storiesOf('VideoPlayer', module)
	.add(
		'Preload Videos',
		() => (
			<VideoSourceSwap />
		)
	);
