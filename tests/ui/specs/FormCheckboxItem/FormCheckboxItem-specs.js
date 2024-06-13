const Page = require('./FormCheckboxItemPage'),
	{expectChecked, expectUnchecked} = require('./FormCheckboxItem-utils.js');

describe('FormCheckboxItem', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.formCheckboxDefault.self.isFocused()).toBe(true);
	});

	describe('default', function () {
		const FormCheckboxItem = Page.components.formCheckboxDefault;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item');
		});

		it('should not be checked', async function () {
			await expectUnchecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.isBefore).toBe(true);
		});

		describe('5-way', function () {
			it('should check the item when selected', async function () {
				await Page.spotlightSelect();
				await expectChecked(FormCheckboxItem);
			});

			it('should re-uncheck the item when selected twice', async function () {
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should display check icon when selected', async function () {
				await Page.spotlightSelect();
				expect(await FormCheckboxItem.iconSymbol).toBe('✓');
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await Page.components.formCheckboxDefaultSelected.self.isFocused()).toBe(true);
			});

			it('should move focus up on SpotlightUp', async function () {
				await Page.components.formCheckboxDefaultSelected.focus();
				await Page.spotlightUp();
				expect(await FormCheckboxItem.self.isFocused()).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should check the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				await expectChecked(FormCheckboxItem);
			});

			it('should re-uncheck the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should display check icon when clicked', async function () {
				await FormCheckboxItem.self.click();
				expect(await FormCheckboxItem.iconSymbol).toBe('✓');
			});
		});
	});

	describe('default selected', function () {
		const FormCheckboxItem = Page.components.formCheckboxDefaultSelected;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item selected');
		});

		it('should be checked', async function () {
			await expectChecked(FormCheckboxItem);
		});

		it('should display correct icon', async function () {
			expect(await FormCheckboxItem.iconSymbol).toBe('✓');
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				await expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				await expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('iconPosition after', function () {
		const FormCheckboxItem = Page.components.formCheckboxIconAfter;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item after');
		});

		it('should be checked', async function () {
			await expectChecked(FormCheckboxItem);
		});

		it('should display icon after the text', async function () {
			expect(await FormCheckboxItem.isAfter).toBe(true);
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				await expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				await expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('inline', function () {
		const FormCheckboxItem = Page.components.formCheckboxInline;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item inline');
		});

		it('should be checked', async function () {
			await expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.isBefore).toBe(true);
		});

		it('should display item inline', async function () {
			expect(await FormCheckboxItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				await expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				await expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('inline after', function () {
		const FormCheckboxItem = Page.components.formCheckboxInlineAfter;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item inline after');
		});

		it('should be checked', async function () {
			await expectChecked(FormCheckboxItem);
		});

		it('should display icon after the text', async function () {
			expect(await FormCheckboxItem.isAfter).toBe(true);
		});

		it('should display item inline', async function () {
			expect(await FormCheckboxItem.isInline).toBe(true);
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				await expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				await expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', async function () {
				await FormCheckboxItem.self.click();
				await FormCheckboxItem.self.click();
				await expectChecked(FormCheckboxItem);
			});
		});
	});

	// Note, the disabled test requires the previous component to be known for 5-way navigation and
	// assumes there's no next component.  If you add components before or after this test, please
	// update the links.
	describe('disabled', function () {
		const FormCheckboxItem = Page.components.formCheckboxDisabled;
		const prevFormCheckboxItem = Page.components.formCheckboxInlineAfter;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item disabled');
		});

		it('should be checked', async function () {
			await expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.isBefore).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await prevFormCheckboxItem.focus();
				await Page.spotlightDown();
				expect(await FormCheckboxItem.self.isFocused()).toBe(true);
			});

			it('should not uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				await expectChecked(FormCheckboxItem);
			});
		});
	});

	// Note, the disabled test requires the previous component to be known for 5-way navigation and
	// assumes there's no next component.  If you add components before or after this test, please
	// update the links.
	describe('inline disabled', function () {
		const FormCheckboxItem = Page.components.formCheckboxInlineDisabled;
		const formCheckboxInlineDisabled = Page.components.formCheckboxInlineDisabled;

		it('should have correct text', async function () {
			expect(await FormCheckboxItem.valueText).toBe('FormCheckbox Item inline disabled');
		});

		it('should be checked', async function () {
			await expectChecked(FormCheckboxItem);
		});

		it('should display item inline', async function () {
			expect(await FormCheckboxItem.isInline).toBe(true);
		});

		it('should display icon before the text', async function () {
			expect(await FormCheckboxItem.isBefore).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightDown();
				expect( await formCheckboxInlineDisabled.self.isFocused()).toBe(true);
			});
			it('should not uncheck the item when selected', async function () {
				await FormCheckboxItem.focus();
				await Page.spotlightSelect();
				await expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', async function () {
				await FormCheckboxItem.self.click();
				await expectChecked(FormCheckboxItem);
			});
		});
		// Note, the disabled test above requires the previous component to be known for 5-way
		// navigation and assumes there's no next component.  If you add components before or after
		// this test, please update the links.
	});
});
