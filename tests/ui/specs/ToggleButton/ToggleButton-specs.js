const Page = require('./ToggleButtonPage');

describe('ToggleButton', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.toggleDefault.self.isFocused()).toBe(true);
	});

	// Note, the 5-way up/down tests require the next component to be known.  If you add components
	// before or after this test, please update the links
	describe('default', function () {
		const toggleButton = Page.components.toggleDefault;
		const nextButton = Page.components.toggleWithLabels;

		it('should have correct text', async function () {
			expect((await toggleButton.valueText).toLowerCase()).toBe('MISSING TOGGLE LABEL'.toLowerCase());
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).toBe(false);
		});

		describe('5-way', function () {
			it('should select the button when selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				expect(await toggleButton.isSelected).toBe(true);
			});

			it('should deselect the button when selected and deselected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await toggleButton.isSelected).toBe(false);
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await nextButton.self.isFocused()).toBe(true);
			});

			it('should move focus Up on SpotlightUp', async function () {
				await nextButton.focus();
				await Page.spotlightUp();
				expect(await toggleButton.self.isFocused()).toBe(true);
			});

		});

		describe('pointer', function () {
			it('should select the toggleButton when clicked', async function () {
				await toggleButton.self.click();
				expect(await toggleButton.isSelected).toBe(true);
			});

			it('should re-unselect the item when clicked twice', async function () {
				await toggleButton.self.click();
				await toggleButton.self.click();
				expect(await toggleButton.isSelected).toBe(false);
			});
		});
	});
	// Note, the 5-way up/down tests above require the next component to be known.  If you add
	// components before or after this test, please update the links

	describe('labelled', function () {
		const toggleButton = Page.components.toggleWithLabels;

		it('should have correct text', async function () {
			expect((await toggleButton.valueText).toLowerCase()).toBe('OFF'.toLowerCase());
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).toBe(false);
		});

		describe('5-way', function () {
			it('should have correct text when selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				expect((await toggleButton.valueText).toLowerCase()).toBe('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect((await toggleButton.valueText).toLowerCase()).toBe('OFF'.toLowerCase());
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', async function () {
				await toggleButton.self.click();
				expect((await toggleButton.valueText).toLowerCase()).toBe('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', async function () {
				await toggleButton.self.click();
				await toggleButton.self.click();
				expect((await toggleButton.valueText).toLowerCase()).toBe('OFF'.toLowerCase());
			});
		});
	});

	describe('missed off label', function () {
		const toggleButton = Page.components.toggleWithOnlyOnLabel;

		it('should have correct text', async function () {
			expect((await toggleButton.valueText).toLowerCase()).toBe('MISSING TOGGLE OFF LABEL'.toLowerCase());
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).toBe(false);
		});

		describe('5-way', function () {
			it('should have correct text when selected - [GT-21950]', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				expect((await toggleButton.valueText).toLowerCase()).toBe('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect((await toggleButton.valueText).toLowerCase()).toBe('MISSING TOGGLE OFF LABEL'.toLowerCase());
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', async function () {
				await toggleButton.self.click();
				expect((await toggleButton.valueText).toLowerCase()).toBe('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', async function () {
				await toggleButton.self.click();
				await toggleButton.self.click();
				expect((await toggleButton.valueText).toLowerCase()).toBe('MISSING TOGGLE OFF LABEL'.toLowerCase());
			});
		});
	});

	describe('missed on label', function () {
		const toggleButton = Page.components.toggleWithOnlyOffLabel;

		it('should have correct text - [GT-21951]', async function () {
			expect((await toggleButton.valueText).toLowerCase()).toBe('OFF'.toLowerCase());
		});

		it('should be unselected', async function () {
			expect(await toggleButton.isSelected).toBe(false);
		});

		describe('5-way', function () {
			it('should have correct text when selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				expect((await toggleButton.valueText).toLowerCase()).toBe('MISSING TOGGLE ON LABEL'.toLowerCase());
			});

			it('should have correct text when un-selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect((await toggleButton.valueText).toLowerCase()).toBe('OFF'.toLowerCase());
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', async function () {
				await toggleButton.self.click();
				expect((await toggleButton.valueText).toLowerCase()).toBe('MISSING TOGGLE ON LABEL'.toLowerCase());
			});

			it('should have correct text when un-selected', async function () {
				await toggleButton.self.click();
				await toggleButton.self.click();
				expect((await toggleButton.valueText).toLowerCase()).toBe('OFF'.toLowerCase());
			});
		});
	});

	describe('default selected', function () {
		const toggleButton = Page.components.toggleDefaultSelected;

		it('should have correct text', async function () {
			expect((await toggleButton.valueText).toLowerCase()).toBe('ON'.toLowerCase());
		});

		it('should be selected by default', async function () {
			expect(await toggleButton.isSelected).toBe(true);
		});

		describe('5-way', function () {
			it('should unselect the toggleButton when selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				expect(await toggleButton.isSelected).toBe(false);
			});

			it('should re-select the toggleButton when selected twice', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await toggleButton.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should unselect the toggleButton when selected', async function () {
				await toggleButton.self.click();
				expect(await toggleButton.isSelected).toBe(false);
			});

			it('should re-select the toggleButton when selected twice', async function () {
				await toggleButton.self.click();
				await toggleButton.self.click();
				expect(await toggleButton.isSelected).toBe(true);
			});
		});
	});

	// Note, the disabled test requires the previous and next component to be known for 5-way
	// navigation.  If you add components before or after this test, please update the links
	describe('disabled', function () {
		const toggleButton = Page.components.toggleDisabled;
		const previousToggle = Page.components.toggleDefaultSelected;

		it('should have correct text', async function () {
			expect((await toggleButton.valueText).toLowerCase()).toBe('ON'.toLowerCase());
		});

		it('should be selected by default', async function () {
			expect(await toggleButton.isSelected).toBe(true);
		});

		describe('5-way', function () {
			it('should be able to focus the toggleButton', async function () {
				await previousToggle.focus();
				await Page.spotlightDown();
				expect(await toggleButton.self.isFocused()).toBe(true);
			});
			it('should not unselect the item when selected - [GT-21952]', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				expect(await toggleButton.isSelected).toBe(true);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked - [GT-21952]', async function () {
				await toggleButton.self.click();
				expect(await toggleButton.isSelected).toBe(true);
			});
		});
	});
	// Note, the disabled test above requires the previous and next component to be known for 5-way
	// navigation.  If you add components before or after this test, please update the links

	describe('small', function () {
		const toggleButton = Page.components.toggleSmall;

		it('should have correct text', async function () {
			expect((await toggleButton.valueText).toLowerCase()).toBe('SMALL OFF'.toLowerCase());
		});

		it('should be unselected by default', async function () {
			expect(await toggleButton.isSelected).toBe(false);
		});

		it('should be small sized - [GT-22374]', async function () {
			expect(await toggleButton.isSmall).toBe(true);
		});

		describe('5-way', function () {
			it('should select the toggleButton when selected', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				expect(await toggleButton.isSelected).toBe(true);
			});

			it('should un-select the toggleButton when selected twice', async function () {
				await toggleButton.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await toggleButton.isSelected).toBe(false);
			});
		});

		describe('pointer', function () {
			it('should select the toggleButton when selected', async function () {
				await toggleButton.self.click();
				expect(await toggleButton.isSelected).toBe(true);
			});

			it('should un-select the toggleButton when selected twice', async function () {
				await toggleButton.self.click();
				await toggleButton.self.click();
				expect(await toggleButton.isSelected).toBe(false);
			});
		});
	});
});
