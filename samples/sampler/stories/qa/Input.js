import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

import {Input, InputBase} from '@enact/moonstone/Input';

import icons from '../helper/icons';

Input.displayName = 'Input';

const iconNames = ['', ...icons];

const divMargin = () => ({margin: ri.unit(12, 'rem')});

const inputData = {
	longText : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	longPlaceHolder : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Placeholder',
	tallText : ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'],
	extraSpaceText : 'This                                              Text                         has                           extra                                           space',
	initialNumericValue: 0,
	initialValue : 'Input field',
	rtlAndLtr: 'abcdeشلاؤيث',
	type: ['text', 'number', 'password']
};

export default {
	title: 'Moonstone/Input',
	component: 'Input'
};

export const WithLongText = (args) => {
	return (
		<Input
			autoFocus={args['autoFocus']}
			disabled={args['disabled']}
			iconAfter={args['iconAfter']}
			iconBefore={args['iconBefore']}
			invalid={args['invalid']}
			invalidMessage={args['invalidMessage']}
			onChange={action('onChange')}
			placeholder={args['placeholder']}
			size={args['size']}
			type={args['type']}
			defaultValue={inputData.longText}
		/>
	);
};

boolean('autoFocus', WithLongText, Input);
boolean('disabled', WithLongText, Input);
select('iconAfter', WithLongText, iconNames, Input);
select('iconBefore', WithLongText, iconNames, Input);
boolean('invalid', WithLongText, Input);
text('invalidMessage', WithLongText, Input, InputBase.defaultProps.invalidMessage);
text('placeholder', WithLongText, Input);
select('size', WithLongText, ['small', 'large'], Input);
select('type', WithLongText, inputData.type, Input, inputData.type[0]);

WithLongText.storyName = 'with long text';

export const WithLongPlaceholder = (args) => {
	return (
		<Input
			autoFocus={args['autoFocus']}
			onChange={action('onChange')}
			disabled={args['disabled']}
			iconAfter={args['iconAfter']}
			iconBefore={args['iconBefore']}
			invalid={args['invalid']}
			invalidMessage={args['invalidMessage']}
			placeholder={args['placeholder']}
			size={args['size']}
			type={args['type']}
		/>
	);
};

boolean('autoFocus', WithLongPlaceholder, Input);
boolean('disabled', WithLongPlaceholder, Input);
select('iconAfter', WithLongPlaceholder, iconNames, Input);
select('iconBefore', WithLongPlaceholder, iconNames, Input);
boolean('invalid', WithLongPlaceholder, Input);
text('invalidMessage', WithLongPlaceholder, Input, InputBase.defaultProps.invalidMessage);
text('placeholder', WithLongPlaceholder, Input, inputData.longPlaceHolder);
select('size', WithLongPlaceholder, ['small', 'large'], Input);
select('type', WithLongPlaceholder, inputData.type, Input, inputData.type[0]);

WithLongPlaceholder.storyName = 'with long placeholder';

export const WithTallCharacters = (args) => {
	return (
		<div>
			<Input
				autoFocus={args['autoFocus']}
				onChange={action('onChange')}
				disabled={args['disabled']}
				iconAfter={args['iconAfter']}
				iconBefore={args['iconBefore']}
				invalid={args['invalid']}
				invalidMessage={args['invalidMessage']}
				placeholder={args['placeholder']}
				size={args['size']}
				type={args['type']}
				defaultValue={inputData.tallText[0]}
			/>
			<Input
				autoFocus={args['autoFocus']}
				onChange={action('onChange')}
				disabled={args['disabled']}
				iconAfter={args['iconAfter']}
				iconBefore={args['iconBefore']}
				invalid={args['invalid']}
				invalidMessage={args['invalidMessage']}
				placeholder={args['placeholder']}
				size={args['size']}
				type={args['type']}
				defaultValue={inputData.tallText[1]}
			/>
			<Input
				autoFocus={args['autoFocus']}
				onChange={action('onChange')}
				disabled={args['disabled']}
				iconAfter={args['iconAfter']}
				iconBefore={args['iconBefore']}
				invalid={args['invalid']}
				invalidMessage={args['invalidMessage']}
				placeholder={args['placeholder']}
				size={args['size']}
				type={args['type']}
				defaultValue={inputData.tallText[2]}
			/>
		</div>
	);
};

boolean('autoFocus', WithTallCharacters, Input);
boolean('disabled', WithTallCharacters, Input);
select('iconAfter', WithTallCharacters, iconNames, Input);
select('iconBefore', WithTallCharacters, iconNames, Input);
boolean('invalid', WithTallCharacters, Input);
text('invalidMessage', WithTallCharacters, Input, InputBase.defaultProps.invalidMessage);
text('placeholder', WithTallCharacters, Input, 'Input some tall characters');
select('size', WithTallCharacters, ['small', 'large'], Input);
select('type', WithTallCharacters, inputData.type, Input, inputData.type[0]);

WithTallCharacters.storyName = 'with tall characters';

export const WithExtraSpacing = (args) => {
	return (
		<Input
			autoFocus={args['autoFocus']}
			onChange={action('onChange')}
			disabled={args['disabled']}
			iconAfter={args['iconAfter']}
			iconBefore={args['iconBefore']}
			invalid={args['invalid']}
			invalidMessage={args['invalidMessage']}
			placeholder={args['placeholder']}
			size={args['size']}
			type={args['type']}
			defaultValue={inputData.extraSpaceText}
		/>
	);
};

boolean('autoFocus', WithExtraSpacing, Input);
boolean('disabled', WithExtraSpacing, Input);
select('iconAfter', WithExtraSpacing, iconNames, Input);
select('iconBefore', WithExtraSpacing, iconNames, Input);
boolean('invalid', WithExtraSpacing, Input);
text('invalidMessage', WithExtraSpacing, Input, InputBase.defaultProps.invalidMessage);
text('placeholder', WithExtraSpacing, Input);
select('size', WithExtraSpacing, ['small', 'large'], Input);
select('type', WithExtraSpacing, inputData.type, Input, inputData.type[0]);

WithExtraSpacing.storyName = 'with extra spacing';

export const WithRTLAndLTRTextTogether = (args) => {
	return (
		<Input
			autoFocus={args['autoFocus']}
			onChange={action('onChange')}
			disabled={args['disabled']}
			iconAfter={args['iconAfter']}
			iconBefore={args['iconBefore']}
			invalid={args['invalid']}
			invalidMessage={args['invalidMessage']}
			placeholder={args['placeholder']}
			size={args['size']}
			type={args['type']}
			defaultValue={inputData.rtlAndLtr}
		/>
	);
};

boolean('autoFocus', WithRTLAndLTRTextTogether, Input);
boolean('disabled', WithRTLAndLTRTextTogether, Input);
select('iconAfter', WithRTLAndLTRTextTogether, iconNames, Input);
select('iconBefore', WithRTLAndLTRTextTogether, iconNames, Input);
boolean('invalid', WithRTLAndLTRTextTogether, Input);
text('invalidMessage', WithRTLAndLTRTextTogether, Input, InputBase.defaultProps.invalidMessage);
text('placeholder', WithRTLAndLTRTextTogether, Input, 'Input RTL and LTR text together');
select('size', WithRTLAndLTRTextTogether, ['small', 'large'], Input);
select('type', WithRTLAndLTRTextTogether, inputData.type, Input, inputData.type[0]);

WithRTLAndLTRTextTogether.storyName = 'with RTL and LTR text together';

export const FiveWayTest = (args) => {
	return (
		<div>
			<div style={divMargin()}>
				<Input
					autoFocus={args['autoFocus']}
					onChange={action('onChange')}
					disabled={args['disabled']}
					iconAfter={args['iconAfter']}
					iconBefore={args['iconBefore']}
					invalid={args['invalid']}
					invalidMessage={args['invalidMessage']}
					placeholder={args['placeholder']}
					size={args['size']}
					type={args['type']}
					defaultValue={inputData.initialValue + ' one'}
				/>
				<Input
					autoFocus={args['autoFocus']}
					onChange={action('onChange')}
					disabled={args['disabled']}
					iconAfter={args['iconAfter']}
					iconBefore={args['iconBefore']}
					invalid={args['invalid']}
					invalidMessage={args['invalidMessage']}
					placeholder={args['placeholder']}
					size={args['size']}
					type={args['type']}
					defaultValue={inputData.initialValue + ' two'}
				/>
			</div>
			<div style={divMargin()}>
				<Input
					autoFocus={args['autoFocus']}
					onChange={action('onChange')}
					disabled={args['disabled']}
					iconAfter={args['iconAfter']}
					iconBefore={args['iconBefore']}
					invalid={args['invalid']}
					invalidMessage={args['invalidMessage']}
					placeholder={args['placeholder']}
					size={args['size']}
					type={args['type']}
					defaultValue={inputData.initialValue + ' three'}
				/>
				<Input
					autoFocus={args['autoFocus']}
					onChange={action('onChange')}
					disabled={args['disabled']}
					iconAfter={args['iconAfter']}
					iconBefore={args['iconBefore']}
					invalid={args['invalid']}
					invalidMessage={args['invalidMessage']}
					placeholder={args['placeholder']}
					size={args['size']}
					type={args['type']}
					defaultValue={inputData.initialValue + ' four'}
				/>
			</div>
		</div>
	);
};

boolean('autoFocus', FiveWayTest, Input);
boolean('disabled', FiveWayTest, Input);
select('iconAfter', FiveWayTest, iconNames, Input);
select('iconBefore', FiveWayTest, iconNames, Input);
boolean('invalid', FiveWayTest, Input);
text('invalidMessage', FiveWayTest, Input, InputBase.defaultProps.invalidMessage);
text('placeholder', FiveWayTest, Input, 'Input RTL and LTR text together');
select('size', FiveWayTest, ['small', 'large'], Input);
select('type', FiveWayTest, inputData.type, Input, inputData.type[0]);

FiveWayTest.storyName = '5 way test';

export const WithRange = (args) => {
	return (
		<Input
			autoFocus={args['autoFocus']}
			onChange={action('onChange')}
			disabled={args['disabled']}
			iconAfter={args['iconAfter']}
			iconBefore={args['iconBefore']}
			invalid={args['invalid']}
			invalidMessage={args['invalidMessage']}
			placeholder={args['placeholder']}
			size={args['size']}
			type={inputData.type[1]}
			defaultValue={inputData.initialNumericValue}
		/>
	);
};

boolean('autoFocus', WithRange, Input);
boolean('disabled', WithRange, Input);
select('iconAfter', WithRange, iconNames, Input);
select('iconBefore', WithRange, iconNames, Input);
boolean('invalid', WithRange, Input);
text('invalidMessage', WithRange, Input, InputBase.defaultProps.invalidMessage);
text('placeholder', WithRange, Input);
select('size', WithRange, ['small', 'large'], Input);

WithRange.storyName = 'with a range';
