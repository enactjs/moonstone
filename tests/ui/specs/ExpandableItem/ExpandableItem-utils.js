// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (item, title) {
	it('should have correct title', async function () {
		const match = await item.titleText === title;
		expect(match).to.be.true();
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
async function expectClosed (item) {
	expect(await item.isOpen()).to.be.false();
	expect(await getChevronRotation(item)).to.equal('down');
}

async function expectOpen (item) {
	expect(await item.isOpen()).to.be.true();
	expect(await getChevronRotation(item)).to.equal('up');
}

// Other utility functions
async function getChevronRotation (item) {
	const matrix = await item.chevron.getCSSProperty('transform');

	if (matrix.value === 'matrix(1, 0, 0, -1, 0, 0)') {
		return 'up';
	} else if (matrix.value === 'none') {
		return 'down';
	} else {
		return 'unknown';
	}
}

module.exports = {
	expectClosed,
	expectOpen,
	validateTitle,
	getChevronRotation
};
