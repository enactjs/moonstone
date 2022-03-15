// Utility methods for testing

async function validateTitle (popup, title) {
	expect(await popup.title).to.equal(title);
}

async function expectClosed (popup) {
	expect(await popup.isPopupExist).to.be.false();
	expect(await popup.isScrimExist).to.be.false();
}

async function expectOpen (popup) {
	expect(await popup.isPopupExist).to.be.true();
	expect(await popup.isScrimExist).to.be.true();
}

async function expectNoneScrimOpen (popup) {
	expect(await popup.isPopupExist).to.be.true();
	expect(await popup.isScrimExist).to.be.false();
}

async function expectCloseButton (popup) {
	expect(await popup.isCloseButton()).to.be.true();
	expect(await popup.closeSymbol).to.equal('󯿵');
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen,
	expectNoneScrimOpen,
	expectCloseButton
};
