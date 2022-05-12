import kind from '@enact/core/kind';
import IconButton from '@enact/moonstone/IconButton';
import VideoPlayer, {MediaControls} from '@enact/moonstone/VideoPlayer';
import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';

import componentCss from './MainPanel.module.less';

const SelectableVideoPlayer = ({css, ...props}) => {
	const videoRef = useRef(null);
	const [selecting, setSelecting] = useState(false);
	const [selection, setSelection] = useState([]);

	const handleToggleSelection = useCallback(() => {
		const {currentTime} = videoRef.current.getMediaState();

		if (selection == null || selection.length === 2) {
			setSelecting(true);
			setSelection([currentTime]);
		} else {
			setSelecting(false);
			setSelection([selection[0], currentTime].sort((a, b) => a - b));
		}
	}, [selection]);

	const handleTimeUpdate = useCallback(() => {
		const {currentTime} = videoRef.current.getMediaState();

		if (selection != null) {
			const [selectionEnd] = selection;
			// const [selectionStart] = selection; // commented to suppress build warnings; uncomment for seek code below if necessary

			if (currentTime >= selectionEnd) {
				// seek to start
				// this.video.seek(selectionStart);

				// ... or pause() and lock at end
				videoRef.current.pause();
				// this.video.seek(selectionEnd);
			}
		}
	}, [selection]);

	const handleSeekOutsideSelection = useCallback((ev) => {
		// prevent the action and seek to the beginning or end
		const [selectionStart, selectionEnd] = selection;
		ev.preventDefault();

		if (ev.time < selectionStart) {
			videoRef.current.seek(selectionStart);
		} else if (ev.time > selectionStart) {
			// this.video.pause();
			videoRef.current.seek(selectionEnd);
		}
	}, [selection]);

	const setVideo = (video) => {
		videoRef.current = video;
	};

	return (
		<VideoPlayer
			{...props}
			loop
			onSeekOutsideSelection={handleSeekOutsideSelection}
			onTimeUpdate={handleTimeUpdate}
			ref={setVideo}
			selection={selection}
		>
			<MediaControls>
				<IconButton className={selecting ? css.selecting : ''} onTap={handleToggleSelection} slot="rightComponents">repeat</IconButton>
			</MediaControls>
			<source src="http://media.w3.org/2010/05/video/movie_300.mp4" />
		</VideoPlayer>
	);
};

SelectableVideoPlayer.propTypes = {
	css: PropTypes.object
};

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<SelectableVideoPlayer css={componentCss} />
	)
});

export default MainPanel;
