// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectInline,
	expectUnchecked
};

// Expect blocks
async function expectChecked (checkboxItem) {
	expect(await checkboxItem.isChecked).toBe(true);
	expect(await checkboxItem.icon.isDisplayed()).toBe(true);
}

async function expectUnchecked (checkboxItem) {
	expect(await checkboxItem.isChecked).toBe(false);
	expect(await checkboxItem.icon.isDisplayed()).toBe(false);
}

async function expectInline (checkboxItem1, checkboxItem2) {
	expect((await checkboxItem1.getLocation().x) === checkboxItem2.getLocation().x).toBe(false);
}
