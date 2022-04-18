import {useI18nContext} from '@enact/i18n/I18nDecorator';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {useCallback} from 'react';

const LocaleSwitch = (props) => {
	const {rtl, updateLocale} = useI18nContext();
	const onToggle = useCallback(() => {
		updateLocale(!rtl ? 'ar-SA' : 'en-US');
	}, [rtl, updateLocale]);

	return (
		<ToggleButton onToggle={onToggle} {...props}>RTL</ToggleButton>
	);
};

export default LocaleSwitch;
