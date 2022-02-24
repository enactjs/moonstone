/* eslint-disable no-undefined */
const Page = require('./TimePickerPage');
const {expectClosed, expectOpen, expectNoLabels, extractValues, validateTitle} = require('./TimePicker-utils.js');

describe('TimePicker', function () {

	it('should have focus on start', async function () {
		await Page.open();
		expect(await Page.components.timePickerDefaultClosedWithoutNoneText.title.isFocused()).to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefaultClosedWithoutNoneText;

			it('should have correct title', async function () {
				validateTitle(timePicker, 'Time Picker Default');
			});

			it('should be initially closed', async function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should have hour-minute-meridiem order', async function () {
				Page.waitTransitionEnd(3000, undefined, () => {
					Page.spotlightSelect();
				});

				expectOpen(timePicker);
				expect(await timePicker.hour.isFocused()).to.be.true();
				await Page.spotlightRight();
				expect(await timePicker.minute.isFocused()).to.be.true();
				await Page.spotlightRight();
				expect(await timePicker.meridiem.isFocused()).to.be.true();
			});

			describe('5-way', function () {
				it('should open, spot hour picker on select, and update value to current time', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(timePicker);
					const value = /^\d{1,2}:\d{2}\s[A|P]M$/.test(await timePicker.valueText);
					expect(value).to.be.true();
				});

				it('should close when pressing select', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectClosed(timePicker);
				});

				it('should focus title when 5-way right from last picker - [GT-25237]', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectOpen(timePicker);
					expect(await timePicker.hour.isFocused()).to.be.true();
					await Page.spotlightRight();
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await timePicker.title.isFocused()).to.be.true();
				});

				it('should increase the hour when incrementing the picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {hour} = await extractValues(timePicker);
					expectOpen(timePicker);
					expect(await timePicker.hour.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {hour: value} = await extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {hour} = await extractValues(timePicker);
					expectOpen(timePicker);
					expect(await timePicker.hour.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {hour: value} = await extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {minute} = await extractValues(timePicker);
					expectOpen(timePicker);
					await Page.spotlightRight();
					expect(await timePicker.minute.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {minute} = await extractValues(timePicker);
					expectOpen(timePicker);
					await Page.spotlightRight();
					expect(await timePicker.minute.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should update value text when incrementing the meridiem picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const time = await timePicker.valueText;
					expectOpen(timePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await timePicker.meridiem.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightUp();
					});
					const newTime = await timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should update value text when decrementing the meridiem picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const time = timePicker.valueText;
					expectOpen(timePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await timePicker.meridiem.isFocused()).to.be.true();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightDown();
					});
					const newTime = await timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should change the meridiem on hour boundaries', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const value = await timePicker.item(timePicker.meridiem).getText();
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						await Page.spotlightDown();
					}
					expect(value !== await timePicker.item(timePicker.meridiem).getText()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should open on title click when closed', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectOpen(timePicker);
				});

				it('should close on title click when open', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectClosed(timePicker);
				});

				it('should select hour when opened', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					timePicker.hour.click();
					expect(await timePicker.hour.isFocused()).to.be.true();
				});

				it('should increase the hour when incrementing the picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {hour} = await extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.incrementer(timePicker.hour).click();
					});
					const {hour: value} = await extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker - [GT-21531]', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {hour} = await extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.decrementer(timePicker.hour).click();
					});
					const {hour: value} = await extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker - [GT-21531]', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {minute} = await extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.incrementer(timePicker.minute).click();
					});
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {minute} = await extractValues(timePicker);
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.decrementer(timePicker.minute).click();
					});
					const {minute: value} = await extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should update value text when incrementing the meridiem picker - [GT-21531]', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const time = await timePicker.valueText;
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.incrementer(timePicker.meridiem).click();
					});
					const newTime = await timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should update value text when decrementing the meridiem picker', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const time = await timePicker.valueText;
					expectOpen(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.decrementer(timePicker.meridiem).click();
					});
					const newTime = await timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should change the meridiem on hour boundaries - [GT-21563]', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const value = await timePicker.valueText;
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						timePicker.decrementer(timePicker.hour).click();
					}
					expect(value !== timePicker.valueText).to.be.true();
				});
			});
		});

		describe('default with noneText', function () {
			const timePicker = Page.components.timePickerDefaultClosedWithNoneText;

			it('should display \'noneText\'', async function () {
				expect(await timePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('default open', function () {
			const timePicker = Page.components.timePickerDefaultOpenWithNoneText;

			it('should be initially open', async function () {
				timePicker.self.waitForExist(500);
				expectOpen(timePicker);
			});

			describe('5-way', function () {
				it('should close when pressing select', async function () {
					timePicker.focus();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					expectClosed(timePicker);
					expect(await timePicker.title.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click when open', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectClosed(timePicker);
				});

				it('should open on title click when closed', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectClosed(timePicker);
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					expectOpen(timePicker);
				});
			});
		});

		describe('\'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerDefaultOpenWithDefaultValue;

			it('should be initially open', async function () {
				timePicker.self.waitForExist(500);
				expectOpen(timePicker);
			});

			it('should not display \'noneText\'', async function () {
				expect(await timePicker.valueText).to.not.equal('Nothing Selected');
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await timePicker.focus();
					Page.waitTransitionEnd(3000, undefined, () => {
						Page.spotlightSelect();
					});

					const {hour, minute, meridiem} = await extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});

			describe('pointer', function () {
				it('should not update on title click', async function () {
					Page.waitTransitionEnd(3000, undefined, () => {
						timePicker.title.click();
					});
					const {hour, minute, meridiem} = await extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});

		});

		describe('no labels', function () {
			const timePicker = Page.components.timePickerNoLabels;

			it('should not have labeled pickers', async function () {
				timePicker.title.click();
				expectNoLabels(timePicker);
			});
		});

		describe('disabled', function () {
			const timePicker = Page.components.timePickerDisabledWithNoneText;

			it('should be initially closed', async function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should display \'noneText\'', async function () {
				expect(await timePicker.valueText).to.equal('Nothing Selected');
			});

			describe('5-way', function () {
				it('should be able receive focus', async function () {
					await Page.components.timePickerNoLabels.focus();
					await Page.spotlightDown();
					expect(await timePicker.title.isFocused()).to.be.true();
				});
				it('should not open when selected', async function () {
					timePicker.focus();
					await Page.spotlightSelect();
					// it should never open, but wait and then check to be sure
					browser.pause(500);
					expectClosed(timePicker);
				});
			});

			describe('pointer', function () {
				it('should not open when clicked', async function () {
					timePicker.title.click();
					// it should never open, but wait and then check to be sure
					browser.pause(500);
					expectClosed(timePicker);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const timePicker = Page.components.timePickerDisabledWithDefaultValue;

			it('should be initially closed', async function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should not display \'noneText\'', async function () {
				expect(await timePicker.valueText).to.not.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\'', function () {
			const timePicker = Page.components.timePickerDisabledOpenWithNoneText;

			it('should be initially closed', async function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should display \'noneText\'', async function () {
				expect(await timePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerDisabledOpenWithDefaultValue;

			it('should be initially closed', async function () {
				timePicker.self.waitForExist(500);
				expectClosed(timePicker);
			});

			it('should not display \'noneText\'', async function () {
				expect(await timePicker.valueText).to.not.equal('Nothing Selected');
			});
		});
	});

	describe('RTL locale', function () {
		const timePicker = Page.components.timePickerDefaultClosedWithoutNoneText;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus middle picker (hour) when selected', async function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(timePicker);
			expect(await timePicker.hour.isFocused()).to.be.true();
		});

		it('should have minute-hour-meridiem order', async function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(timePicker);
			await Page.spotlightRight();
			expect(await timePicker.minute.isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await timePicker.hour.isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await timePicker.meridiem.isFocused()).to.be.true();
		});

		it('should focus title when 5-way left from last picker - [GT-25247]', async function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				Page.spotlightSelect();
			});

			expectOpen(timePicker);
			expect(await timePicker.hour.isFocused()).to.be.true();
			await Page.spotlightLeft();
			await Page.spotlightLeft();
			expect(await timePicker.title.isFocused()).to.be.true();
		});
	});

	describe('24-hour locale', function () {
		const timePicker = Page.components.timePickerWithDefaultValue;

		beforeEach(async function () {
			await Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', async function () {
			timePicker.title.click();
			expect(await timePicker.meridiem.isExisting()).to.be.false();
		});

		it('should display hours in 24-hour format', async function () {
			timePicker.title.click();
			expect(await extractValues(timePicker).hour).to.equal(0); // midnight hour
		});

		it('should increment hours from 23 to 0', async function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				timePicker.title.click();
			});
			// go to 23 first
			timePicker.decrementer(timePicker.hour).click();
			expect(await extractValues(timePicker).hour).to.equal(23);
			// now increment
			timePicker.incrementer(timePicker.hour).click();
			expect(await extractValues(timePicker).hour).to.equal(0);
		});

		it('should decrement hours from 0 to 23', async function () {
			Page.waitTransitionEnd(3000, undefined, () => {
				timePicker.title.click();
			});
			await timePicker.decrementer(timePicker.hour).click();
			expect(await extractValues(timePicker).hour).to.equal(23);
		});
	});

});
