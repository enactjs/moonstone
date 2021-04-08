import Button from '@enact/moonstone/Button';
import ExpandableList from '@enact/moonstone/ExpandableList';
import PropTypes from 'prop-types';
import {Component} from 'react';
import $L from '@enact/i18n/$L';
import Text, {TextDecorator} from '@enact/i18n/Text';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

const TextButton = TextDecorator(Button);

const locales = ['en-US', 'ko-KR'];

const AsyncILib = I18nContextDecorator(
	{localeProp: 'locale', updateLocaleProp: 'updateLocale'},

	// eslint-disable-next-line enact/display-name
	class extends Component {
		static propTypes = {
			locale: PropTypes.string,
			updateLocale: PropTypes.func
		};

		handleSelect = ({data: locale}) => this.props.updateLocale(locale);

		render () {
			const {locale, ...rest} = this.props;

			delete rest.updateLocale;

			return (
				<div {...rest}>
					<ExpandableList
						title={$L('locales')}
						noneText="none"
						selected={locales.indexOf(locale)}
						onSelect={this.handleSelect}
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
		}
	}
);

export default MoonstoneDecorator({i18n: {sync: false}}, AsyncILib);
