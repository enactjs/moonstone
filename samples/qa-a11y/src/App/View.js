import {Header, Panel} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';

const View = ({debugProps = false, handleDebug, isAriaHidden = false, isDebugMode = false, isHeader = true, title, view: ComponentView}) => {
	const
		header = isHeader ? <Header aria-hidden={isAriaHidden} title={title} type="compact" /> : null,
		props = debugProps ? {handleDebug, isDebugMode} : null;

	return (
		<Panel aria-owns="floatLayer" style={{padding: 0}}>
			{header}
			<ComponentView {...props} />
		</Panel>
	);
};

View.propTypes = {
	debugProps: PropTypes.bool,
	handleDebug: PropTypes.func,
	isAriaHidden: PropTypes.bool,
	isDebugMode: PropTypes.bool,
	isHeader: PropTypes.bool,
	title: PropTypes.string,
	view: PropTypes.func
};

export default View;
