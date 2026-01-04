// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
async function expectSelected (selectableItem) {
	expect(await selectableItem.isSelected()).toBe(true);
	expect(await selectableItem.isToggled()).toBe(true);
}

async function expectUnselected (selectableItem) {
	expect(await selectableItem.isSelected()).toBe(false);
	expect(await selectableItem.isToggled()).toBe(false);
}
