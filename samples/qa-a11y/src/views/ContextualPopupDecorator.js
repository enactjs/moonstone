import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import RadioItem from '@enact/moonstone/RadioItem';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import {useCallback} from 'react';

const ContextualButton = Toggleable(
	{deactivate: 'onClose', prop: 'open', toggle: 'onClick'},
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
			<div style={{left: '0', position: 'absolute'}}>
				<ContextualButton
					direction="right"
					popupComponent={renderPopup1}
					size="small"
				>
					Average
				</ContextualButton>
			</div>
			<div style={{bottom: '0', position: 'absolute'}}>
				<ContextualButton
					direction="up"
					popupComponent={renderPopup2}
					showCloseButton
					size="small"
					spotlightRestrict="self-only"
				>
					Spotlight Modal
				</ContextualButton>
			</div>

			<div style={{position: 'absolute', right: '0'}}>
				<ContextualButton
					direction="left"
					popupComponent={renderPopup3}
					size="small"
				>
					Nested Radio
				</ContextualButton>
			</div>
		</div>
	);
};

export default ContextualPopupDecoratorView;
