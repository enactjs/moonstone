/* eslint-disable no-undefined */
let Page = require('./PopupPage'),
	{validateTitle, expectClosed, expectOpen, expectNoneScrimOpen, expectCloseButton} = require('./Popup-utils.js');

describe('Popup', function () {
	const popupCommon = Page.popupCommon;

	beforeEach(async function () {
		await Page.open();
	});

	it('should focus the first button on start', async function () {
		expect(await popupCommon.buttonPopup1.isFocused()).to.be.true();
	});

	it('should not have the popup on start', async function () {
		await expectClosed(popupCommon);
	});

	describe('Popup with AutoDismiss', function () {

		const popup = Page.components.popup1;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup1.click();
			});
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup with AutoDismiss');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});

				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot close button on two 5-way right in popup container', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way up in popup container', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightUp();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.spotlightSelect();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup1.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup1.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup1.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					Page.backKey();
				});
				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup1.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					Page.clickPopupFloatLayer();
				});
				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup1.click();
				});
				await expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup1.click();
				});
				await expectOpen(popupCommon);
				await expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup1.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonOK.click();
				});
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup1.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonCancel.click();
				});
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup1.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonClose.click();
				});
				await expectClosed(popupCommon);
			});
		});
	});

	describe('Popup without AutoDismiss', function () {

		const popup = Page.components.popup2;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup2.click();
			});
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without AutoDismiss');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should not dismiss the popup and should not move spotlight from the popup container', async function () {
				await Page.spotlightRight();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.backKey();
				await browser.pause(300);  // Wait for delay in case of transition (shouldn't happen)
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should not dismiss the popup on click on outside the popup', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup2.click();
				});
				await expectOpen(popupCommon);
				await Page.clickPopupFloatLayer();
				await browser.pause(300);  // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup2.click();
				});
				await expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup2.click();
				});
				await expectOpen(popupCommon);
				await expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup2.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonOK.click();
				});
				await expectClosed(popupCommon);
			});
		});
	});

	describe('Popup with no Component', function () {
		const popup = Page.components.popup3;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup3.click();
			});
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup with no Component');
		});

		describe('5-way', function () {

			it('should open the popup in no Component button select', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await Page.spotlightSelect();
				});

				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				await expect(await popupCommon.buttonPopup3.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup3.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup3.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await Page.clickPopupFloatLayer();
				});
				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup3.click();
				});
				await expectOpen(popupCommon);
			});
		});
	});

	describe('Popup with noAnimation', function () {
		const popup = Page.components.popup4;

		it('should have correct title', async function () {
			await popupCommon.buttonPopup4.click();
			await browser.pause(100); // needed to pass instead of waitTransitionEnd
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without Animation');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot close button on two 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way up in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightUp();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup4.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightSelect();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.backKey();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup4.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.backKey();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await Page.clickPopupFloatLayer();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await popup.buttonOK.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await popup.buttonCancel.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', async function () {
				await popupCommon.buttonPopup4.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectOpen(popupCommon);
				await popup.buttonClose.click();
				await browser.pause(100); // needed to pass instead of waitTransitionEnd
				await expectClosed(popupCommon);
			});
		});
	});

	describe('Popup without Close Button', function () {
		const popup = Page.components.popup5;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup5.click();
			});
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup without Close button');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightUp();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await Page.spotlightSelect();
				});

				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).to.be.true();
			});

			it('should close the popup on spotlight select on cancel in the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.spotlightSelect();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).to.be.true();
			});

			it('should close the popup on spotlight select on close in the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.spotlightSelect();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup5.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup5.click();
				});
				await expectOpen(popupCommon);
			});

			it('should not show close button in the popup container on display', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup5.click();
				});
				await expectOpen(popupCommon);
				expect(await popup.isCloseButton()).to.be.false();
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup5.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonOK.click();
				});
				await expectClosed(popupCommon);
			});
		});
	});

	describe('Popup spotlightRestrict - self-only', function () {
		const popup = Page.components.popup6;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup6.click();
			});
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup spotlightRestrict is self-only');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightUp();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightDown();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.spotlightSelect();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup6.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup6.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open the popup with scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup6.click();
				});
				await expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup6.click();
				});
				await expectOpen(popupCommon);
				await expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup6.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonOK.click();
				});
				await expectClosed(popupCommon);
			});
		});

		describe('5-way and Pointer', function () {
			it('should retain spotlight on the Close button inside the popup [GT-21627]', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup6.click();
				});
				await expectOpen(popupCommon);
				await Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				await $('#popup6').moveTo(500, 150);
				// 5-way to the Cancel button
				await Page.spotlightLeft();
				// Spotight is on Cancel button (verify step 4)
				expect(await popup.buttonCancel.isFocused()).to.be.true();
				// 5-way Up (step 5)
				await Page.spotlightUp();
				// Spotight remains on the Close button inside the popup (verify step 5)
				expect(await popup.buttonClose.isFocused()).to.be.true();
				// 5-way up (step 6)
				await Page.spotlightUp();
				// Spotlight remains on the close button inside the popup (verify step 6)
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should focus the popup button when changing from pointer to 5-way in popup container - [GT-25753]', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				// Spotlight is on the button 'spotlightRestrict - self-only' (verify step 3)
				expect(await popupCommon.buttonPopup6.isFocused()).to.be.true();
				// Open popup (step 4)
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup6.click();
				});
				// Verify the popup opens (verify step 4) - Spotlight will be on buttonOK by default
				await expectOpen(popupCommon);
				// Wave the pointer to change to cursor mode (step 5)
				await Page.showPointerByKeycode();
				// Position the pointer on the right of the Cancel buttion inside popup
				await $('#popup6').moveTo(500, 150);
				// Spotlight on button in popup is blur (verify step 5)
				expect(await popup.buttonOK.isFocused()).to.be.false();
				// Change from pointer to 5-way mode (step 6)
				await Page.spotlightLeft();
				// Spotlight is on the button inside the Popup (verify step 6)
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should not spot Buttons Outside of Popup - [GT-21630]', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup6.click();
				});
				// Verify the popup opens
				await expectOpen(popupCommon);
				// Hover a button outside Popup (step 4)
				await $('#buttonPopup9').moveTo(200, 200);
				// Test spotlight cannot leave popup (step 4)
				await Page.spotlightUp();
				// Check spotlight is NOT on buttons outside popup (verify step 4)
				expect(await popup.buttonOK.isFocused()).to.be.true();
				// Close Popup (step 5)
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popup.buttonClose.click();
				});
				await Page.spotlightUp();
				// Hover the button 'spotlightRestrict - self-only' outside of the popup (step 6)
				await Page.spotlightUp();
				// Check spotlight is on the button 'spotlightRestrict - self-only' outside popup (verify step 6)
				expect(await popupCommon.buttonPopup6.isFocused()).to.be.true();
				// Open popup (step 7)
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup6.click();
				});
				// Verify the popup opens (step 7)
				await expectOpen(popupCommon);
				// Hover outside Popup (step 8)
				await $('#buttonPopup9').moveTo(200, 200);
				// Test spotlight cannot leave popup (step 8)
				await Page.spotlightUp();
				// Check spotlight is NOT on buttons outside popup (verify step 8)
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});
		});
	});

	describe('Popup spotlightRestrict - self-first', function () {
		const popup = Page.components.popup7;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup7.click();
			});
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup spotlightRestrict is self-first');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightUp();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightDown();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.spotlightSelect();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup7.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup7.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open the popup with scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup7.click();
				});
				await expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup7.click();
				});
				await expectOpen(popupCommon);
				await expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup7.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonOK.click();
				});
				await expectClosed(popupCommon);
			});
		});

		describe('5-way and Pointer', function () {
			it('should navigate to nearest neighbor [GT-25513]', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup7.click();
				});
				await expectOpen(popupCommon);
				await Page.showPointerByKeycode();
				// Position the pointer inside popup to the right of the Cancel button (step 4)
				await $('#buttonCancel').moveTo(200, 200);
				// 5-way to the OK button (step 5) (How to get it to spot Cancel button?)
				await Page.spotlightLeft();
				// Spotight is on OK button (verify steo 5)
				expect(await popup.buttonOK.isFocused()).to.be.true();
				// Move to the Close X button (step 7)
				await Page.spotlightUp();
				// Spotlight remains on the close button inside the popup (verfiy step 7)
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});
		});
	});

	describe('Popup scrimType - transparent', function () {
		const popup = Page.components.popup8;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup8.click();
			});
			await expectOpen(popupCommon);
			await validateTitle(popup, 'Popup scrimType is transparent');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightUp();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightDown();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.spotlightSelect();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup8.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup8.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup8.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				// The ESC button (Back Key) does not switch out of pointer mode [ENYO-5865] [ENYO-5882]
				expect(await popupCommon.buttonPopup8.isFocused()).to.be.false();
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup8.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await Page.clickPopupFloatLayer();
				});
				await expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup8.click();
				});
				await expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup8.click();
				});
				await expectOpen(popupCommon);
				await expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup8.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonOK.click();
				});
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup8.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonCancel.click();
				});
				await expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup8.click();
				});
				await expectOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popup.buttonClose.click();
				});
				await expectClosed(popupCommon);
			});
		});
	});

	describe('Popup scrimType - none', function () {
		const popup = Page.components.popup9;

		it('should have correct title', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				popupCommon.buttonPopup9.click();
			}); // browser.pause(3250);
			await expectNoneScrimOpen(popupCommon);
			await validateTitle(popup, 'Popup scrimType is none');
		});

		describe('5-way', function () {
			it('should spot default button in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.spotlightRight();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightLeft();
				expect(await popup.buttonOK.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right after 5-way up in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightUp();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightRight();
				expect(await popup.buttonClose.isFocused()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.spotlightRight();
				await Page.spotlightDown();
				expect(await popup.buttonCancel.isFocused()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.spotlightSelect();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup9.isFocused()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', async function () {
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(3000, 'popup open', async () => {
					await Page.spotlightSelect();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
				expect(await popupCommon.buttonPopup9.isFocused()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should dismiss the popup on escape key', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup9.click();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.waitTransitionEnd(3000, 'popup close', async () => {
					await Page.backKey();
				});
				await expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup9.click();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await Page.clickPopupMain();
				});
				await expectClosed(popupCommon);
			});

			it('should open the popup without scrim on click', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup9.click();
				});
				await expectNoneScrimOpen(popupCommon);
			});

			it('should show close button in the popup container on display', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup9.click();
				});
				await expectNoneScrimOpen(popupCommon);
				await expectCloseButton(popup);
			});

			it('should close the popup on click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup9.click();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popup.buttonOK.click();
				});
				await expectClosed(popupCommon);
			});

			it('should close the popup on cancel click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					popupCommon.buttonPopup9.click();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popup.buttonCancel.click();
				});
				await expectClosed(popupCommon);
			});

			it('should close the popup on close click in popup container', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popupCommon.buttonPopup9.click();
				});
				await expectNoneScrimOpen(popupCommon);
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await popup.buttonClose.click();
				});
				await expectClosed(popupCommon);
			});
		});
	});
});
