const Page = require('./SelectableItemPage'),
	{expectSelected, expectUnselected} = require('./SelectableItem-utils.js');

describe('SelectableItem', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first item at start', async function () {
		expect(await Page.components.selectableDefault.self.isFocused()).to.be.true();
	});

	describe('default', function () {
		const selectableItem = Page.components.selectableDefault;

		it('should have correct text', async function () {
			expect(await selectableItem.valueText).to.equal('Selectable Item1');
		});

		it('should not be selected', async function () {
			expectUnselected(selectableItem);
		});

		describe('5-way', function () {
			it('should select the item when selected', async function () {
				await Page.spotlightSelect();
				expectSelected(selectableItem);
			});

			it('should re-unselect the item when selected twice', async function () {
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should move focus down on SpotlightDown', async function () {
				await Page.spotlightDown();
				expect(await Page.components.selectableDefaultSelected.self.isFocused()).to.be.true();
			});

			it('should move focus up on SpotlightUp', async function () {
				await Page.components.selectableDefaultSelected.focus();
				await Page.spotlightUp();
				expect(await selectableItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', async function () {
				await selectableItem.self.click();
				expectSelected(selectableItem);
			});

			it('should re-unselect the item when clicked twice', async function () {
				await selectableItem.self.click();
				await selectableItem.self.click();
				expectUnselected(selectableItem);
			});
		});
	});

	describe('default selected', function () {
		const selectableItem = Page.components.selectableDefaultSelected;

		it('should have correct text', async function () {
			expect(await selectableItem.valueText).to.equal('Selectable Item selected');
		});

		it('should be selected', async function () {
			expectSelected(selectableItem);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await selectableItem.focus();
				await Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when selected twice', async function () {
				await selectableItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await selectableItem.self.click();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when clicked twice', async function () {
				await selectableItem.self.click();
				await selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});

	describe('inline', function () {
		const selectableItem = Page.components.selectableInline;

		it('should have correct text', async function () {
			expect(await selectableItem.valueText).to.equal('Selectable Item inline');
		});

		it('should be selected', async function () {
			expectSelected(selectableItem);
		});

		it('should display item inline', async function () {
			expect(await selectableItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', async function () {
				await selectableItem.focus();
				await Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when selected twice', async function () {
				await selectableItem.focus();
				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', async function () {
				await selectableItem.self.click();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when clicked twice', async function () {
				await selectableItem.self.click();
				await selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});

	// Note, the disabled test below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
	describe('disabled', function () {
		const selectableItem = Page.components.selectableDisabled;
		const prevSelectableItem = Page.components.selectableInline;

		it('should have correct text', async function () {
			expect(await selectableItem.valueText).to.equal('Selectable Item disabled');
		});

		it('should be selected', async function () {
			expectSelected(selectableItem);
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await prevSelectableItem.focus();
				await Page.spotlightDown();
				expect(await selectableItem.self.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});
	// Note, the disabled test above/below requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.

	describe('inline disabled', function () {
		const selectableItem = Page.components.selectableInlineDisabled;
		const selectableDisabled = Page.components.selectableDisabled;

		it('should have correct text', async function () {
			expect(await selectableItem.valueText).to.equal('Selectable Item inline disabled');
		});

		it('should be selected', async function () {
			expectSelected(selectableItem);
		});

		it('should display item inline', async function () {
			expect(await selectableItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the item', async function () {
				await selectableDisabled.focus();
				await Page.spotlightDown();
				expect(await selectableItem.self.isFocused()).to.be.true();
			});
			it('should not unselect the item when selected', async function () {
				await selectableItem.focus();
				await Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', async function () {
				await selectableItem.self.click();
				expectSelected(selectableItem);
			});
		});
	});
	// Note, the disabled test above requires the previous component to be known for 5-way
	// navigation and assumes there's no next component.  If you add components before or after
	// this test, please update the links.
});
