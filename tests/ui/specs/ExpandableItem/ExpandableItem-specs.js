const Page = require('./ExpandableItemPage');
const {expectClosed, expectOpen, validateTitle, getChevronRotation} = require('./ExpandableItem-utils');

describe('ExpandableItem', function () {
	beforeEach(async function () {
		await Page.open();
		await Page.waitForExist('#expandableItemDisabledWithNoneText');
	});

	it('should have focus on start', async function () {
		expect(await Page.components.expandableItemDefaultClosedWithoutNoneText.title.isFocused()).to.be.true();
	});

	describe('default', function () {
		const expandableItem = Page.components.expandableItemDefaultClosedWithoutNoneText;

		validateTitle(expandableItem, 'ExpandableItem Default');

		it('should be initially closed', async function () {
			await expectClosed(expandableItem);
		});

		describe('5-way', function () {
			it('should open and spot expanded item on select - [GT-21494]', async function () {
				await Page.spotlightSelect();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd

				await expectOpen(expandableItem);
				expect(await expandableItem.item.isFocused()).to.be.true();
			});

			it('should close when pressing select on label', async function () {
				await Page.spotlightUp();
				await Page.spotlightSelect();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd

				await expectOpen(expandableItem);
				await Page.spotlightUp();
				await Page.spotlightSelect();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd

				await expectClosed(expandableItem);
			});

			it('should allow 5-way navigation beyond the last item', async function () {
				await expandableItem.focus();
				await Page.spotlightSelect();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd

				await expectOpen(expandableItem);
				expect(await expandableItem.item.isFocused()).to.be.true();
				await Page.spotlightDown();
				expect(await Page.components.expandableItemDefaultClosedWithNoneText.title.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', async function () {
				await expandableItem.title.click();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd
				await expectOpen(expandableItem);
			});

			it('should close on title click when open', async function () {
				await expandableItem.title.click();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd
				await expectOpen(expandableItem);
				await expandableItem.title.click();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd
				await expectClosed(expandableItem);
			});
		});
	});

	describe('default with noneText', function () {
		const expandableItem = Page.components.expandableItemDefaultClosedWithNoneText;

		it('should have correct noneText', async function () {
			expect(await expandableItem.valueText).to.equal('Nothing Selected');
		});
	});

	describe('default open', function () {
		const expandableItem = Page.components.expandableItemDefaultOpenWithNoneText;

		it('should be initially open', async function () {
			await expectOpen(expandableItem);
		});

		describe('5-way', function () {
			it('should close when pressing select', async function () {
				await expandableItem.focus();
				await Page.spotlightSelect();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd

				await expectClosed(expandableItem);
				expect(await expandableItem.title.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click when open', async function () {
				await expandableItem.title.click();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd
				await expectClosed(expandableItem);
			});

			it('should open on title click when closed', async function () {
				await expandableItem.title.click();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd
				await expectClosed(expandableItem);
				await expandableItem.title.click();
				await browser.pause(500); // needed to pass instead of waitTransitionEnd
				await expectOpen(expandableItem);
			});
		});
	});

	describe('autoClose', function () {
		const expandableItem = Page.components.expandableItemWithAutoClose;

		it('should close when 5-way focus returns to title', async function () {
			await expandableItem.focus();
			await Page.spotlightSelect();
			await browser.pause(500); // needed to pass instead of waitTransitionEnd

			await expectOpen(expandableItem);
			expect(await expandableItem.item.isFocused()).to.be.true();
			await Page.spotlightUp();
			await browser.pause(500); // needed to pass instead of waitTransitionEnd
			await expectClosed(expandableItem);
		});
	});

	describe('lockBottom', function () {
		const expandableItem = Page.components.expandableItemWithLockBottom;

		it('should not allow 5-way navigation beyond the last item', async function () {
			await expandableItem.focus();
			await Page.spotlightSelect();
			await browser.pause(500); // needed to pass instead of waitTransitionEnd

			await expectOpen(expandableItem);
			expect(await expandableItem.item.isFocused()).to.be.true();
			await Page.spotlightDown();
			expect(await expandableItem.item.isFocused()).to.be.true();
		});
	});

	describe('with no children', function () {
		const expandableItem = Page.components.expandableItemWithoutChildren;

		describe('5-way', function () {
			// TODO: skip until ENYO-5367 (regression from ENYO-5013) is resolved
			it.skip('should allow navigation after opening', function () {
				Page.components.expandableItemWithLockBottom.focus();
				Page.spotlightDown();
				expect(expandableItem.title.isFocused()).to.be.true();
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandableItem.title.isFocused()).to.be.false();
			});
		});

		describe('pointer', function () {
			// Note: We can't use waitTransitionEnd here because the transition does not (currently)
			// happen when empty
			it('should open on title click when closed', async function () {
				await expandableItem.title.click();
				await browser.pause(500);
				expect(await getChevronRotation(expandableItem)).to.equal('up');
			});

			it('should close on title click when open', async function () {
				await expandableItem.title.click();
				await browser.pause(500);
				expect(await getChevronRotation(expandableItem)).to.equal('up');
				await expandableItem.title.click();
				await browser.pause(500);
				expect(await getChevronRotation(expandableItem)).to.equal('down');
			});
		});
	});

	describe('labeled item', function () {
		// supplied label is "Labeled Item"

		describe('with \'auto\' showLabel', async function () {
			const expandableItem = Page.components.expandableItemAutoLabel;

			it('should override noneText', async function () {
				expect(await expandableItem.valueText).to.equal('Labeled Item');
			});

			it('should display label when closed', async function () {
				await expectClosed(expandableItem);
				expect(await expandableItem.hasLabel).to.be.true();
			});

			it('should not display label when open', async function () {
				await expandableItem.title.click();
				await expectOpen(expandableItem);
				expect(await expandableItem.hasLabel).to.be.false();
			});
		});

		describe('with \'always\' showLabel', function () {
			const expandableItem = Page.components.expandableItemAlwaysLabel;

			it('should display label when closed', async function () {
				await expandableItem.title.click();
				await expectOpen(expandableItem);
				expect(await expandableItem.hasLabel).to.be.true();
			});

			it('should display label when open - [GT-21495]', async function () {
				await expandableItem.title.click();
				await expectOpen(expandableItem);
				expect(await expandableItem.hasLabel).to.be.true();
			});
		});

		describe('with \'never\' showLabel', function () {
			const expandableItem = Page.components.expandableItemNeverLabel;

			it('should not display label when closed', async function () {
				await expandableItem.title.click();
				await expectOpen(expandableItem);
				expect(await expandableItem.hasLabel).to.be.false();
			});

			it('should not display label when open', async function () {
				await expandableItem.title.click();
				await expectOpen(expandableItem);
				expect(await expandableItem.hasLabel).to.be.false();
			});
		});
	});

	describe('disabled', function () {
		const expandableItem = Page.components.expandableItemDisabledWithNoneText;

		it('should be initially closed', async function () {
			await expectClosed(expandableItem);
		});

		it('should have correct none text', async function () {
			expect(await expandableItem.valueText).to.equal('Nothing Selected');
		});

		describe('5-way', function () {
			it('should be able to receive focus', async function () {
				await Page.components.expandableItemNeverLabel.focus();
				await Page.spotlightDown();
				expect(await expandableItem.title.isFocused()).to.be.true();
			});
			it('should not open when selected', async function () {
				await Page.spotlightSelect();
				await expectClosed(expandableItem);
			});
		});

		describe('pointer', function () {
			it('should not open when clicked', async function () {
				await expandableItem.title.click();
				await expectClosed(expandableItem);
			});
		});
	});
});
