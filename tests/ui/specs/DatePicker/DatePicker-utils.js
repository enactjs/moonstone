// Utility methods for testing

// adapted from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
const daysInMonth = ({month, year}) => new Date(year, month, 0).getDate();

const extractValues = async (picker) => {
	const day = parseInt(await picker.item(picker.day).getText());
	const month = parseInt(await picker.item(picker.month).getText());
	const year = parseInt(await picker.item(picker.year).getText());

	return {day, month, year};
};

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', async function () {
		expect(await picker.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
async function expectClosed (picker) {
	expect(await picker.isOpen, 'Picker open').to.be.false();
}

async function expectNoLabels (picker) {
	expect(await picker.monthLabel.isExisting()).to.be.false();
	expect(await picker.dayLabel.isExisting()).to.be.false();
	expect(await picker.yearLabel.isExisting()).to.be.false();
}

async function expectOpen (picker) {
	expect(await picker.isOpen, 'Picker open').to.be.true();
}

module.exports = {
	daysInMonth,
	expectClosed,
	expectNoLabels,
	expectOpen,
	extractValues,
	validateTitle
};
