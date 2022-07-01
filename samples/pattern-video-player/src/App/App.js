import IconButton from '@enact/moonstone/IconButton';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {AlwaysViewingPanels} from '@enact/moonstone/Panels';
import VideoPlayer, {MediaControls} from '@enact/moonstone/VideoPlayer';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

import css from './App.module.less';
import videos from './videos.js';

const getVideo = (index) => videos[index];

const App = ({className, panelIndex = 0, videoIndex = 0, ...rest}) => {
	const videoRef = useRef(null);
	const [panelsVisible, setPanelsVisible] = useState(false);
	const [statePanelIndex, setStatePanelIndex] = useState(panelIndex);
	const [stateVideoIndex, setStateVideoIndex] = useState(videoIndex);

	const {source, desc, ...restVideo} = getVideo(stateVideoIndex);

	useEffect(() => {
		if (panelsVisible) {
			Spotlight.focus('main-panel');
		}
	}, [panelsVisible]);

	const handleNextPanelClick = useCallback(() => setStatePanelIndex(prevState => setStatePanelIndex(prevState + 1)), []);

	const handleSelectBreadcrumb = useCallback(({index}) => setStatePanelIndex(index), []);

	const handleHidePanelsClick = useCallback(() => setPanelsVisible(false), []);

	const handleShowPanelsClick = useCallback(() => {
		videoRef.current.hideControls();
		setPanelsVisible(true);
	}, []);

	const setVideoIndex = useCallback((newVideoIndex) => setStateVideoIndex(newVideoIndex), []);

	const setVideoRef = (ref) => {
		videoRef.current = ref;
	};

	return (
		<div {...rest} className={className + ' ' + css.app}>
			<VideoPlayer ref={setVideoRef} spotlightDisabled={panelsVisible} {...restVideo} className={css.player + ' enact-fit'}>
				<source src={source} type="video/mp4" />
				<infoComponents>
					{desc}
				</infoComponents>
				<MediaControls>
					<rightComponents>
						<IconButton
							backgroundOpacity="translucent"
							onClick={handleShowPanelsClick}
							spotlightDisabled={panelsVisible}
						>
							list
						</IconButton>
					</rightComponents>
				</MediaControls>
			</VideoPlayer>
			{panelsVisible ?
				<AlwaysViewingPanels
					onSelectBreadcrumb={handleSelectBreadcrumb}
					index={statePanelIndex}
				>
					<MainPanel
						onVideoIndexChange={setVideoIndex}
						onHidePanels={handleHidePanelsClick}
						onNextPanel={handleNextPanelClick}
						spotlightId="main-panel"
						title="Videos"
						videoIndex={stateVideoIndex}
					/>
					<ItemPanel title="Second" />
				</AlwaysViewingPanels> :
				null}
		</div>
	);
};

App.propTypes = {
	/**
	 * Assign an alternate panel index to start on.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	panelIndex: PropTypes.number,

	/**
	 * Assign an alternate initial video to load first.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	videoIndex: PropTypes.number
};

export default MoonstoneDecorator(App);
