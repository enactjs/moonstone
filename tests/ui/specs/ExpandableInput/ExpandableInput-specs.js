/* eslint-disable no-undefined */
const Page = require('./ExpandableInputPage'),
	{validateTitle, expectClosed, expectOpen} = require('./ExpandableInput-utils.js'),
	{expectOrdering} = require('@enact/ui-test-utils/utils');

describe('ExpandableInput', function () {
	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const expandable = Page.components.default;

			it('should have focus on first expandable at start', async function () {
				expect(await expandable.title.isFocused()).to.be.true();
			});

			validateTitle(expandable, 'ExpandableInput Default');

			it('should have correct none text', async function () {
				expect(await expandable.labelText).to.equal('No Input Text');
			});

			it('should be initially closed', async function () {
				await expectClosed(expandable);
			});

			it('should have title icon be on the left side title label', async function () {
				expectOrdering(await expandable.titleTextMarquee, await expandable.titleIcon);
			});

			describe('5-way', function () {
				it('should open and spot input on select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});

				it('should have correct input value', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					expect(await expandable.input.getValue()).to.equal('');
				});

				it('should close when moving up to title', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightUp();
					});
					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should close and move focus to title on SpotlightDown', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightDown();
					});
					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should close on select twice', async function () {
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectClosed(expandable);
				});

				it('should close on escape', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, () => {
						Page.escape();
					});
					await expectClosed(expandable);
				});

				describe('input value', function () {
					it('should update value text on input and then closed by moving up to title', async function () {
						await Page.waitTransitionEnd(3000, undefined, async () => {
							await Page.spotlightSelect();
						});

						await expectOpen(expandable);
						await expandable.input.setValue('New Value');
						await Page.waitTransitionEnd(3000, undefined, async () => {
							await Page.spotlightUp();
						});
						await expectClosed(expandable);
						expect(await expandable.labelText).to.equal('New Value');
					});

					it('should update value text on input and then closed by SpotlightDown', async function () {
						await Page.waitTransitionEnd(3000, undefined, async () => {
							await Page.spotlightSelect();
						});

						await expectOpen(expandable);
						await expandable.input.setValue('New Value');
						await Page.waitTransitionEnd(3000, undefined, async () => {
							await Page.spotlightDown();
						});
						await expectClosed(expandable);
						expect(await expandable.labelText).to.equal('New Value');
					});

					it('should not update value text on input and then closed by escape key', async function () {
						await Page.waitTransitionEnd(3000, undefined, async () => {
							await Page.spotlightSelect();
						});

						await expectOpen(expandable);
						await expandable.input.setValue('New Value');
						await Page.waitTransitionEnd(3000, undefined, () => {
							Page.escape();
						});
						await expectClosed(expandable);
						expect(await expandable.labelText).to.equal('No Input Text');
					});
				});
			});

			describe('pointer', function () {
				it('should open and focus input on title click when closed', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});

				it('should close on title click when open', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});

				it('should not close on input click', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expandable.input.click();
					await expectOpen(expandable);
				});

				it('should close on two title clicks', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});

				it('should retain the focus on input when hovered on other expandable', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
					await Page.hover();
					expect(await expandable.input.isFocused()).to.be.true();
				});

				describe('input value', function () {
					it('should update value text on input and then closed by title click', async function () {
						await Page.waitTransitionEnd(3000, undefined, () => {
							expandable.title.click();
						});
						await expectOpen(expandable);
						await expandable.input.setValue('New Value');
						await Page.waitTransitionEnd(3000, undefined, () => {
							expandable.title.click();
						});
						await expectClosed(expandable);
						expect(await expandable.labelText).to.equal('New Value');
					});
				});
			});
		});

		describe('default value', function () {
			const expandable = Page.components.defaultValue;

			validateTitle(expandable, 'ExpandableInput Default Value');

			it('should have correct value text', async function () {
				expect(await expandable.labelText).to.equal('Default Value');
			});

			it('should be initially closed', async function () {
				await expectClosed(expandable);
			});

			describe.skip('5-way', function () {
				beforeEach(async function () {
					await expandable.focus();
				});

				it('should open and spot input on select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});

				it('should have correct input value', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					expect(await expandable.input.getValue()).to.equal('Default Value');
				});

				it('should close when moving up to title', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightUp();
					});
					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should close on select twice', async function () {
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectClosed(expandable);
				});
			});

			describe('pointer', function () {
				it('should open and focus input on title click when closed', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});

				it('should close on title click when open', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});

				it('should not close on input click', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expandable.input.click();
					await expectOpen(expandable);
				});

				it('should close on two title clicks', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});
			});
		});

		describe('default open', function () {
			const expandable = Page.components.defaultOpen;

			validateTitle(expandable, 'ExpandableInput Default Open');

			it('should be initially open', async function () {
				await expectOpen(expandable);
			});

			it('should have correct input value', async function () {
				expect(await expandable.input.getValue()).to.equal('');
			});

			describe('5-way', function () {
				beforeEach(async function () {
					await expandable.focus();
				});

				it('should close on select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should focus input on spotlightDown', async function () {
					await Page.spotlightDown();
					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});

				it('should open on select twice', async function () {
					await Page.spotlightSelect();
					await Page.spotlightSelect();
					await expectOpen(expandable);
				});
			});

			describe('pointer', function () {
				it('should close on title click', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});

				it('should open on title click when closed', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
				});

				it('should open on two title clicks', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
				});
			});
		});

		describe('password type', function () {
			const expandable = Page.components.password;

			validateTitle(expandable, 'ExpandableInput Password');

			it('should not have value text', async function () {
				expect(await expandable.isLabelExists).to.be.false();
			});

			describe.skip('5-way', function () {
				it('should not have value text on open and close', async function () {
					await expandable.focus();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightUp();
					});
					await expectClosed(expandable);
					expect(await expandable.isLabelExists).to.be.false();
				});

			});

			describe('pointer', function () {
				it('should not have value text on open and close', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectOpen(expandable);
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
					expect(await expandable.isLabelExists).to.be.false();
				});
			});
		});

		describe('placeholder', async function () {
			const expandable = Page.components.placeholder;

			validateTitle(expandable, 'ExpandableInput Placeholder');

			it('should be initially open', async function () {
				await expectOpen(expandable);
			});

			it('should have correct input placeholder', async function () {
				expect(await expandable.placeHolder).to.equal('Placeholder');
			});

			describe('5-way', function () {
				beforeEach(async function () {
					await expandable.focus();
				});

				it('should close on select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should focus input on spotlightDown', async function () {
					await Page.spotlightDown();
					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});
			});
		});

		describe('icon before', function () {
			const expandable = Page.components.iconBefore;

			validateTitle(expandable, 'ExpandableInput Icon Before');

			it('should be initially open', async function () {
				await expectOpen(expandable);
			});

			it('should have icon before the input', async function () {
				expect(await expandable.isIconBefore).to.be.true();
			});

			it('should display correct icon', async function () {
				expect(await expandable.iconBeforeSymbol).to.equal('-');
			});

			describe('5-way', function () {

				beforeEach(async function () {
					await expandable.focus();
				});

				it('should close on select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should focus input on spotlightDown', async function () {
					await Page.spotlightDown();
					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});
			});
		});

		describe('icon after', function () {
			const expandable = Page.components.iconAfter;

			validateTitle(expandable, 'ExpandableInput Icon After');

			it('should be initially open', async function () {
				await expectOpen(expandable);
			});

			it('should have icon after the input', async function () {
				expect(await expandable.isIconAfter).to.be.true();
			});

			it('should display correct icon', async function () {
				expect(await expandable.iconAfterSymbol).to.equal('+');
			});

			describe('5-way', function () {
				beforeEach(async function () {
					await expandable.focus();
				});

				it('should close on select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should focus input on spotlightDown', async function () {
					await Page.spotlightDown();
					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});
			});
		});

		describe('icon before and after', function () {
			const expandable = Page.components.iconBeforeAfter;

			validateTitle(expandable, 'ExpandableInput Icon Before and After');

			it('should be initially open', async function () {
				await expectOpen(expandable);
			});

			it('should have icon before and after the input', async function () {
				expect(await expandable.isIconBefore).to.be.true();
				expect(await expandable.isIconAfter).to.be.true();
			});

			it('should display correct before icon', async function () {
				expect(await expandable.iconBeforeSymbol).to.equal('-');
			});

			it('should display correct after icon', async function () {
				expect(await expandable.iconAfterSymbol).to.equal('+');
			});

			it('should have beforeIcon positioned on the right side of the afterIcon', async function () {
				expectOrdering(await expandable.iconBefore, await expandable.iconAfter);
			});

			describe('5-way', function () {
				beforeEach(async function () {
					await expandable.focus();
				});

				it('should close on select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectClosed(expandable);
					expect(await expandable.title.isFocused()).to.be.true();
				});

				it('should focus input on spotlightDown', async function () {
					await Page.spotlightDown();
					await expectOpen(expandable);
					expect(await expandable.input.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click', async function () {
					await Page.waitTransitionEnd(3000, undefined, () => {
						expandable.title.click();
					});
					await expectClosed(expandable);
				});
			});
		});

		describe('disabled', function () {
			const expandable = Page.components.disabled;

			validateTitle(expandable, 'ExpandableInput Disabled');

			it('should be initially closed', async function () {
				await expectClosed(expandable);
			});

			describe('5-way', function () {
				it('should be spottable', async function () {
					await expandable.focus();
					// Page.spotlightDown();
					expect(await expandable.title.isFocused()).to.be.true();
				});
				it('should stay closed on title selected', async function () {
					await Page.spotlightSelect();
					browser.pause(500);
					await expectClosed(expandable);
				});
			});

			describe('pointer', function () {
				it('should stay closed on title click', async function () {
					await expandable.title.click();
					browser.pause(500);
					await expectClosed(expandable);
				});
			});
		});

		describe('general 5-way navigation', function () {
			it('should not stop 5-way down when closed', async function () {
				// FIXME: Necessary to ensure 5-way mode and that focus is in expected location for test
				// Additional follow up required to sort out why.
				await Page.components.default.focus();
				await Page.spotlightDown();
				expect(await Page.components.defaultValue.title.isFocused()).to.be.true();
			});
		});

		describe('general pointer operation', function () {
			it('should prevent selecting other controls when open', async function () {
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.components.default.title.click();
				});
				await Page.waitTransitionEnd(3000, undefined, () => {
					Page.components.defaultValue.title.click();
				});
				await expectClosed(Page.components.default);
				await expectClosed(Page.components.defaultValue);
			});
		});
	});

	describe('RTL locale', function () {
		beforeEach( async function () {
			await Page.open('?locale=ar-SA');
		});

		describe('default', function () {
			const expandable = Page.components.default;

			it('should have focus on first item at start', async function () {
				expect(await expandable.title.isFocused()).to.be.true();
			});

			it('should have title icon be on the right side title label', async function () {
				expectOrdering(await expandable.titleIcon, await expandable.titleTextMarquee);
			});
		});

		describe('icon before and after', function () {
			const expandable = Page.components.iconBeforeAfter;

			it('should have beforeIcon positioned on the right side of the afterIcon', async function () {
				expectOrdering(await expandable.iconAfter, await expandable.iconBefore);
			});
		});
	});
});
