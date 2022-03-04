// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
async function expectSelected (selectableItem) {
	expect(await selectableItem.isSelected()).to.be.true();
	expect(await selectableItem.isToggled()).to.be.true();
}

async function expectUnselected (selectableItem) {
	expect(await selectableItem.isSelected()).to.be.false();
	expect(await selectableItem.isToggled()).to.be.false();
}
