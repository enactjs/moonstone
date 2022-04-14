import $L from '@enact/i18n/$L';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Text, {TextDecorator} from '@enact/i18n/Text';
import Button from '@enact/moonstone/Button';
import ExpandableList from '@enact/moonstone/ExpandableList';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

const TextButton = TextDecorator(Button);

const locales = ['en-US', 'ko-KR'];

const Component = ({locale, updateLocale, ...rest}) => {
	const handleSelect = useCallback(({data: callbackLocale}) => updateLocale(callbackLocale), [updateLocale]);

	return (
		<div {...rest}>
			<ExpandableList
				title={$L('locales')}
				noneText="none"
				selected={locales.indexOf(locale)}
				onSelect={handleSelect}
			>
				{locales}
			</ExpandableList>
			<Button>
				<Text>hi</Text>
			</Button>
			<TextButton>hi</TextButton>
			<Button>{$L('hi')}</Button>
		</div>
	);
};

Component.propTypes = {
	locale: PropTypes.string,
	updateLocale: PropTypes.func
};

const AsyncILib = I18nContextDecorator(
	{localeProp: 'locale', updateLocaleProp: 'updateLocale'},
	Component
);

export default MoonstoneDecorator({i18n: {sync: false}}, AsyncILib);
