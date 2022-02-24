// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (expandable, title) {
	it('should have correct title', async function () {
		expect(await expandable.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
async function expectClosed (expandable) {
	expect(await expandable.isOpen).to.be.false();
}

async function expectOpen (expandable) {
	expect(await expandable.isOpen).to.be.true();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
};
