import Heading from '@enact/moonstone/Heading';
import Input from '@enact/moonstone/Input';
import {Header} from '@enact/moonstone/Panels';
import ToggleButton from '@enact/moonstone/ToggleButton';
import PropTypes from 'prop-types';

import LocaleSwitch from '../LocaleSwitch';

const PanelHeader = ({handleFocusableScrollbar, handleHeight, handleWidth, height, width, ...rest}) => {
	const inputWidth = {width: '5em'};

	return (
		<div>
			<Header {...rest} />
			<div style={{direction: 'ltr'}}>
				height:<Input size="small" onChange={handleHeight} style={inputWidth} type="number" value={height} />
				width:<Input size="small" onChange={handleWidth} style={inputWidth} type="number" value={width} />
				<ToggleButton size="small" onToggle={handleFocusableScrollbar}>Focusable Scrollbar</ToggleButton>
				<LocaleSwitch size="small" />
				<Heading showLine />
			</div>
		</div>
	);
};

PanelHeader.propTypes = {
	handleFocusableScrollbar: PropTypes.func,
	handleHeight: PropTypes.func,
	handleWidth: PropTypes.func,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default PanelHeader;
