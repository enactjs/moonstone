import VideoPlayer, {Video} from '@enact/moonstone/VideoPlayer';
import {select} from '@enact/storybook-utils/addons/controls';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

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

const videoPlayerOption =  [
	'',
	'Next Preload Video',
	'Non Preload Video',
	'Next Preload Video without changing preload',
	'Change Preload without changing video',
	'Reset Sources'
];

const lastIndex = playlist.length - 1;

const VideoSourceSwap = (props) => {
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

	function usePrevious (value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}

	const prevOption = usePrevious(props.args['videoPlayerOption']);

	useEffect(() => {
		const option = props.args['videoPlayerOption'];

		if (option !== prevOption) {
			if (option === 'Next Preload Video') {
				nextVideo();
			} else if (option === 'Non Preload Video') {
				differentVideo();
			} else if (option === 'Next Preload Video without changing preload') {
				nextVideoKeepPreload();
			} else if (option === 'Change Preload without changing video') {
				nextPreloadVideoKeepVideo();
			} else if (option === 'Reset Sources') {
				resetSources();
			}
		}
	}); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
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

VideoSourceSwap.propTypes = {
	args: PropTypes.object
};

export default {
	title: 'Moonstone/VideoPlayer',
	component: 'VideoPlayer'
};

export const PreloadVideos = (args) => {
	return (
		<VideoSourceSwap args={args} />
	);
};

select('videoPlayerOption', PreloadVideos, videoPlayerOption, videoTabLabel, '');

PreloadVideos.storyName = 'Preload Videos';
