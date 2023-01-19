/* eslint-disable no-undefined */
const Page = require('./ExpandableListPage'),
	{validateTitle, expectClosed, expectOpen} = require('./ExpandableList-utils.js');

describe('ExpandableList', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should have focus on first expandable at start', async function () {
		expect(await Page.components.radioSelect.title.isFocused()).to.be.true();
	});

	describe('radio select', function () {
		const expandable = Page.components.radioSelect;

		validateTitle(expandable, 'ExpandableList Radio Select');

		it('should have correct none text', async function () {
			expect(await expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', async function () {
			await expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await expectOpen(expandable);
				expect(await expandable.item(0).isFocused()).to.be.true();
			});

			it('should close when moving up to header', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expect(await expandable.isOpen()).to.be.true();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightUp();
				});
				expect(await expandable.isOpen()).to.be.false();
				expect(await expandable.title.isFocused()).to.be.true();
			});

			it('should not allow 5-way exit from bottom', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expect(await expandable.isOpen()).to.be.true();
				await Page.spotlightDown();
				await Page.spotlightDown();
				expect(await expandable.item(2).isFocused()).to.be.true();
				await Page.spotlightDown();
				expect(await expandable.item(2).isFocused()).to.be.true();
			});

			it('should select item when pressing select', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should update value text on select', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightUp();
				expect(await expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should only allow one selected item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
				expect(await expandable.item(1).$(expandable.selectedClass).isExisting()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expectOpen(expandable);
			});

			it('should close on title click when open', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.true();
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.false();
			});

			it('should select item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should update value text', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await expandable.item(0).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should only allow one selected item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await expandable.item(1).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
				expect(await expandable.item(1).$(expandable.selectedClass).isExisting()).to.be.true();
			});
		});
	});

	describe('multi select', function () {
		const expandable = Page.components.multiSelect;

		validateTitle(expandable, 'ExpandableList Multi Select');

		it('should have correct none text', async function () {
			expect(await expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', async function () {
			await expectClosed(expandable);
		});

		describe.skip('5-way', function () {
			it('should open and spot first item on select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await expectOpen(expandable);
				expect(await expandable.item(0).isFocused()).to.be.true();
			});

			it('should select item when pressing select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should update value text on select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightUp();
				expect(await expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
			});

			it('should allow multiple selected items', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
				expect(await expandable.item(1).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should combine value text with multi-select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await Page.spotlightUp();
				await Page.spotlightUp();
				expect(await expandable.valueText).to.equal('option1, option2');
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expectOpen(expandable);
			});

			it('should close on title click when open', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.true();
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.false();
			});

			it('should select item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should update value text', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await expandable.item(0).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
			});

			it('should allow multiple selected items', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await expandable.item(1).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
				expect(await expandable.item(1).$(expandable.selectedClass).isExisting()).to.be.true();
			});
		});
	});

	describe('single select', function () {
		const expandable = Page.components.singleSelect;

		validateTitle(expandable, 'ExpandableList Single Select');

		it('should have correct none text', async function () {
			expect(await expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', async function () {
			await expectClosed(expandable);
		});

		describe.skip('5-way', function () {
			it('should open and spot first item on select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await expectOpen(expandable);
				expect(await expandable.item(0).isFocused()).to.be.true();
			});

			it('should select item when pressing select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should update value text on select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightUp();
				expect(await expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
			});

			it('should reset none text if nothing selected', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightSelect();
				await Page.spotlightUp();
				expect(await expandable.valueText).to.equal('Nothing Selected');
			});

			it('should not allow multiple selected items', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightSelect();
				await Page.spotlightDown();
				await Page.spotlightSelect();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
				expect(await expandable.item(1).$(expandable.selectedClass).isExisting()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expectOpen(expandable);
			});

			it('should close on title click when open', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.true();
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.false();
			});

			it('should select item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.true();
			});

			it('should update value text', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.valueText).to.equal('option1');
			});

			it('should unselect item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await expandable.item(0).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
			});

			it('should only allow one selected item', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				await expandable.item(0).click();
				await expandable.item(1).click();
				expect(await expandable.item(0).$(expandable.selectedClass).isExisting()).to.be.false();
				expect(await expandable.item(1).$(expandable.selectedClass).isExisting()).to.be.true();
			});
		});
	});

	describe('no lock bottom', function () {
		const expandable = Page.components.noLockBottom;

		validateTitle(expandable, 'ExpandableList No Lock Bottom');

		describe.skip('5-way', function () {
			it('should allow 5-way out when open', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expect(await expandable.isOpen()).to.be.true();
				await Page.spotlightDown();
				await Page.spotlightDown();
				expect(await expandable.item(2).isFocused()).to.be.true();
				await Page.spotlightDown();
				expect(await Page.components.noAutoClose.title.isFocused()).to.be.true();
			});
		});
	});

	describe('no auto close', function () {
		const expandable = Page.components.noAutoClose;

		validateTitle(expandable, 'ExpandableList No Auto Close');

		it('should be initially closed', async function () {
			await expectClosed(expandable);
		});

		describe.skip('5-way', function () {
			it('should open and spot first item on select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await expectOpen(expandable);
				expect(await expandable.item(0).isFocused()).to.be.true();
			});

			it('should not close when navigating up to title', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await Page.spotlightUp();
				await expectOpen(expandable);
				expect(await expandable.title.isFocused()).to.be.true();
			});
		});
	});

	describe('default open', function () {
		const expandable = Page.components.defaultOpen;

		validateTitle(expandable, 'ExpandableList Default Open');

		it('should be initially open', async function () {
			await expectOpen(expandable);
		});

		describe('5-way', function () {
			it('should close on select', async function () {
				await expandable.focus();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				await expectClosed(expandable);
				expect(await expandable.title.isFocused()).to.be.true();
			});

			it('should close when navigating up to title', async function () {
				await expandable.focus();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightUp();
				});
				expect(await expandable.isOpen()).to.be.false();
				expect(await expandable.chevron).to.equal('󯿭');
				expect(await expandable.title.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.false();
				expect(await expandable.chevron).to.equal('󯿭');
			});

			it('should open on title click when closed', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.false();
				await Page.waitTransitionEnd(3000, undefined, () => {
					expandable.title.click();
				});
				expect(await expandable.isOpen()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const expandable = Page.components.disabled;

		validateTitle(expandable, 'ExpandableList Disabled');

		it('should be initially closed', async function () {
			expect(await expandable.isOpen()).to.be.false();
			expect(await expandable.chevron).to.equal('󯿭');
		});

		describe('5-way', function () {
			it('should be spottable', async function () {
				await expandable.focus();
				expect(await expandable.title.isFocused()).to.be.true();
			});
			it('should stay closed on title selected', async function () {
				await expandable.focus();
				await Page.spotlightSelect();
				// In this case, it should never fire, but we need to wait just in case.
				await browser.pause(500);
				expect(await expandable.isOpen()).to.be.false();
				expect(await expandable.chevron).to.equal('󯿭');
			});
		});

		describe('pointer', function () {
			it('should stay closed on title click', async function () {
				await expandable.title.click();
				// In this case, it should never fire, but we need to wait just in case.
				await browser.pause(500);
				expect(await expandable.isOpen()).to.be.false();
				expect(await expandable.chevron).to.equal('󯿭');
			});
		});
	});

	describe.skip('general 5-way navigation', function () {
		it('should not stop 5-way down when closed', async function () {
			await Page.spotlightDown();
			expect(await Page.components.multiSelect.title.isFocused()).to.be.true();
		});
	});

	describe('general pointer operation', function () {
		it('should not close other expandable when opening', async function () {
			await Page.waitTransitionEnd(3000, undefined, () => {
				Page.components.radioSelect.title.click();
			});
			await Page.waitTransitionEnd(3000, undefined, () => {
				Page.components.multiSelect.title.click();
			});
			expect(await Page.components.radioSelect.isOpen()).to.be.true();
			expect(await Page.components.multiSelect.isOpen()).to.be.true();
		});
	});
});
