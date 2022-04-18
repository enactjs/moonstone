import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import RadioItem from '@enact/moonstone/RadioItem';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import {useCallback} from 'react';

const ContextualButton = Toggleable(
	{prop: 'open', toggle: 'onClick', deactivate: 'onClose'},
	ContextualPopupDecorator(
		Button
	)
);

const ContextualPopupDecoratorView = () => {

	const renderPopup1 = useCallback(() => (
		<div>
			<span>Item 1</span>
			<br />
			<span>Item 2</span>
			<br />
			<span>Item 3</span>
			<br />
		</div>
	), []);

	const renderPopup2 = useCallback(() => (
		<div>
			<Button size="small">Button</Button>
			<Button size="small">Button2</Button>
			<Button size="small">Button3</Button>
		</div>
	), []);

	const renderPopup3 = useCallback(() => (
		<Group
			childComponent={RadioItem}
			defaultSelected={0}
			itemProps={{inline: false}}
			select="radio"
			selectedProp="selected"
		>
			{['Creek', 'River', 'Ocean']}
		</Group>
	), []);

	return (
		<div>
			<div style={{position: 'absolute', left: '0'}}>
				<ContextualButton
					size="small"
					direction="right"
					popupComponent={renderPopup1}
				>
					Average
				</ContextualButton>
			</div>
			<div style={{position: 'absolute', bottom: '0'}}>
				<ContextualButton
					size="small"
					direction="up"
					popupComponent={renderPopup2}
					showCloseButton
					spotlightRestrict="self-only"
				>
					Spotlight Modal
				</ContextualButton>
			</div>

			<div style={{position: 'absolute', right: '0'}}>
				<ContextualButton
					size="small"
					direction="left"
					popupComponent={renderPopup3}
				>
					Nested Radio
				</ContextualButton>
			</div>
		</div>
	);
};

export default ContextualPopupDecoratorView;
