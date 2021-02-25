import SlotItem from '../../../../SlotItem';

// Will be tricky to test as we need to pass children to
// slotBefore and slotAfter

const SlotItemTests = [
	<SlotItem />,
	<SlotItem>Slot Item</SlotItem>
];
export default SlotItemTests;
