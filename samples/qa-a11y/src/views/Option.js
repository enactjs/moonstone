import {useI18nContext} from '@enact/i18n/I18nDecorator';
import Heading from '@enact/moonstone/Heading';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import ToggleButton from '@enact/moonstone/ToggleButton';

const Option = (props) => {
	const {handleDebug, isDebugMode} = props;
	const {rtl, updateLocale} = useI18nContext();
	const handleToggle = useCallback(() => {
		updateLocale(rtl ? 'en-US' : 'ar-SA');
	}, [rtl, updateLocale]);

	return (
		<div>
			<Heading showLine>Set a language direction</Heading>
			<ToggleButton size="small" onToggle={handleToggle} selected={rtl}>RTL</ToggleButton>
			<Heading showLine>Set an aria debug mode</Heading>
			<ToggleButton size="small" onToggle={handleDebug} selected={isDebugMode}>Debug aria</ToggleButton>
		</div>
	);
};

Option.propTypes = {
	handleDebug: PropTypes.func.isRequired,
	isDebugMode: PropTypes.bool.isRequired
};

export default Option;
