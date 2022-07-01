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
				height:<Input onChange={handleHeight} size="small" style={inputWidth} type="number" value={height} />
				width:<Input onChange={handleWidth} size="small" style={inputWidth} type="number" value={width} />
				<ToggleButton onToggle={handleFocusableScrollbar} size="small">Focusable Scrollbar</ToggleButton>
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
