import Button from '@enact/moonstone/Button';
import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
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

export default {
	title: 'Moonstone/FormCheckboxItem',
	component: 'FormCheckboxItem'
};

export const WithFocusAndDisabled = () => (
	<FormCheckboxItemView />
);

WithFocusAndDisabled.storyName = 'that is focused and disabled';
WithFocusAndDisabled.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
