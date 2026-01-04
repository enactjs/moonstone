// Utility methods for testing
const extractValues = async (picker) => {
	const hour = parseInt(await picker.item(picker.hour).getText());
	const minute = parseInt(await picker.item(picker.minute).getText());
	const meridiem = await picker.meridiem.isExisting() ? await picker.item(picker.meridiem).getText() : null;

	return {hour, minute, meridiem};
};

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', async function () {
		expect(await picker.titleText).toBe(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
async function expectClosed (picker) {
	expect(await picker.isOpen()).toBe(false);
}

async function expectNoLabels (picker) {
	expect(await picker.hourLabel.isExisting()).toBe(false);
	expect(await picker.minuteLabel.isExisting()).toBe(false);
	expect(await picker.meridiemLabel.isExisting()).toBe(false);
}

async function expectOpen (picker) {
	expect(await picker.isOpen()).toBe(true);
}

module.exports = {
	expectClosed,
	expectNoLabels,
	expectOpen,
	extractValues,
	validateTitle
};
