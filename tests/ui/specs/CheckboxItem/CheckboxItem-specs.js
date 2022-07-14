const Page = require('./CheckboxItemPage'),
	{expectChecked, expectInline, expectUnchecked} = require('./CheckboxItem-utils.js'),
	{expectOrdering} = require('@enact/ui-test-utils/utils');

describe('CheckboxItem', function () {

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const checkboxItem = Page.components.checkboxDefault;

			it('should have focus on first item at start', async function () {
				expect(await checkboxItem.self.isFocused()).to.be.true();
			});

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).to.equal('Checkbox Item');
			});

			it('should not be checked', async function () {
				await expectUnchecked(checkboxItem);
			});

			it('should display icon before the text', async function () {
				expect(await checkboxItem.isBefore).to.be.true();
			});

			it('should have icon to the left of marquee text', async function () {
				await expectOrdering(checkboxItem.icon, checkboxItem.value);
			});

			describe('5-way', function () {
				it('should check the item when selected - [GT-21124]', function () {
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when selected twice', function () {
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should display check icon when selected', async function () {
					await Page.spotlightSelect();
					expect(await checkboxItem.iconSymbol).to.equal('✓');
				});

				it('should move focus down on SpotlightDown', async function () {
					await Page.spotlightDown();
					expect(await Page.components.checkboxDefaultSelected.self.isFocused()).to.be.true();
				});

				it('should move focus up on SpotlightUp', async function () {
					await Page.components.checkboxDefaultSelected.focus();
					await Page.spotlightUp();
					expect(await checkboxItem.self.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should check the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when clicked twice', async function () {
					await checkboxItem.self.click();
					await checkboxItem.self.click();
					await expectUnchecked(checkboxItem);
				});

				it('should display check icon when clicked', async  function () {
					await checkboxItem.self.click();
					expect(await checkboxItem.iconSymbol).to.equal('✓');
				});
			});
		});

		describe('selected', function () {
			const checkboxItem = Page.components.checkboxDefaultSelected;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).to.equal('Checkbox Item selected');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItem);
			});

			it('should display correct icon - [GT-21121]', async function () {
				expect(await checkboxItem.iconSymbol).to.equal('✓');
			});

			describe('5-way', async function () {
				it('should uncheck the item when selected', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', async function () {
					await checkboxItem.self.click();
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});
			});
		});

		describe('iconPosition after', function () {
			const checkboxItemIconAfter = Page.components.checkboxIconAfter;

			it('should have correct text', async function () {
				expect(await checkboxItemIconAfter.valueText).to.equal('Checkbox Item after');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItemIconAfter);
			});

			it('should display icon after the text', async function () {
				expect(await checkboxItemIconAfter.isAfter).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', async function () {
					await checkboxItemIconAfter.focus();
					await Page.spotlightSelect();
					await expectUnchecked(checkboxItemIconAfter);
				});

				it('should re-check the item when selected twice', async function () {
					await checkboxItemIconAfter.focus();
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectChecked(checkboxItemIconAfter);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', async function () {
					await checkboxItemIconAfter.self.click();
					await expectUnchecked(checkboxItemIconAfter);
				});

				it('should re-check the item when clicked twice', async function () {
					await checkboxItemIconAfter.self.click();
					await checkboxItemIconAfter.self.click();
					await expectChecked(checkboxItemIconAfter);
				});
			});
		});

		describe('inline', function () {
			const checkboxItem = Page.components.checkboxInline;

			it('should have two inlined checkboxes positioned inlined', async function () {
				const checkboxItem2 = await Page.components.checkboxInlineAfter.self;

				await expectInline(await checkboxItem.self, checkboxItem2);
			});

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).to.equal('Checkbox Item inline');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItem);
			});

			it('should display icon before the text', async function () {
				expect(await checkboxItem.isBefore).to.be.true();
			});

			it('should display item inline', async function () {
				expect(await checkboxItem.isInline).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', async function () {
					await checkboxItem.self.click();
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});
			});
		});

		describe('inline after', function () {
			const checkboxItem =  Page.components.checkboxInlineAfter;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).to.equal('Checkbox Item inline after');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItem);
			});

			it('should display icon after the text', async function () {
				expect(await checkboxItem.isAfter).to.be.true();
			});

			it('should display item inline', async function () {
				expect(await checkboxItem.isInline).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when selected twice', async function () {
					await checkboxItem.focus();
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectUnchecked(checkboxItem);
				});

				it('should re-check the item when clicked twice', async function () {
					await checkboxItem.self.click();
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});
			});
		});

		// Note, the disabled test below requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
		describe('disabled', function () {
			const checkboxItem = Page.components.checkboxDisabled;
			const prevCheckboxItem = Page.components.checkboxInlineAfter;

			it('should have correct text', async function () {
				expect(await checkboxItem.valueText).to.equal('Checkbox Item disabled');
			});

			it('should be checked', async function () {
				await expectChecked(checkboxItem);
			});

			it('should display icon before the text', async function () {
				expect(await checkboxItem.isBefore).to.be.true();
			});

			describe('5-way', function () {
				it('should be able to focus the item', async function () {
					await prevCheckboxItem.focus();
					await Page.spotlightDown();
					expect(await checkboxItem.self.isFocused()).to.be.true();
				});
				it('should not uncheck the item when selected', async function () {
					await Page.spotlightDown();
					await expectChecked(checkboxItem);
				});
			});

			describe('pointer', function () {
				it('should not uncheck the item when clicked', async function () {
					await checkboxItem.self.click();
					await expectChecked(checkboxItem);
				});
			});
		});
		// Note, the disabled test above requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
	});

	describe('RTL locale', function () {
		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', async function () {
			expect(await Page.components.checkboxDefault.self.isFocused()).to.be.true();
		});

		it('should have icon to the right of text when default', async function () {
			const checkboxItem = await Page.components.checkboxDefault;

			await expectOrdering(checkboxItem.value, checkboxItem.icon);
		});

		it('should have two inlined checkboxes positioned inlined', async function () {
			const checkboxItem1 = await Page.components.checkboxInline.self;
			const checkboxItem2 = await Page.components.checkboxInlineAfter.self;

			await expectInline(checkboxItem1, checkboxItem2);
		});
	});
});
