import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import Button from '@enact/moonstone/Button';
import {storiesOf} from '@storybook/react';
import {useCallback, useState} from 'react';

const FormCheckboxItemView = () => {
	const [disabled, setDisabled] = useState(false);

	const handleClick = useCallback(() => {
		setDisabled(!disabled);
	}, [disabled]);

	return (
		<div>
			You can change the state by clicking the Button or FormCheckboxItem.
			<br />
			<Button onClick={handleClick} size="small">change state</Button>
			<FormCheckboxItem disabled={disabled} onClick={handleClick}>FormCheckbox Item</FormCheckboxItem>
		</div>
	);
};

storiesOf('FormCheckboxItem', module)
	.add(
		'that is focused and disabled',
		() => (
			<FormCheckboxItemView />
		)
	);
