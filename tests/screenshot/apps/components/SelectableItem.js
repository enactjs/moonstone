import SelectableItem from '../../../../SelectableItem';

const SelectableItemTests = [
	<SelectableItem />,
	<SelectableItem>Selectable Item</SelectableItem>,
	<SelectableItem selected>Selectable Item</SelectableItem>,
	<SelectableItem defaultSelected>Selectable Item</SelectableItem>,
	<SelectableItem icon="star" selected>Selectable Item</SelectableItem>
];
export default SelectableItemTests;
