/* eslint-disable no-undefined */
const Page = require('./DatePickerPage');
const {daysInMonth, expectClosed, expectNoLabels, expectOpen, extractValues, validateTitle} = require('./DatePicker-utils.js');

describe('DatePicker', function () {

	it('should have focus on start', async function () {
		await Page.open();
		expect(await Page.components.datePickerDefaultClosedWithoutNoneText.title.isFocused()).to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(async function () {
			await Page.open();
		});

		describe('default', function () {
			const datePicker = Page.components.datePickerDefaultClosedWithoutNoneText;

			it('should have correct title', async function () {
				validateTitle(datePicker, 'Date Picker Default');
			});

			it('should be initially closed', async function () {
				await datePicker.self.waitForExist(500);
				await expectClosed(datePicker);
			});

			it('should have month-day-year order', async function () {
				await Page.waitTransitionEnd(3000, undefined, async () => {
					await Page.spotlightSelect();
				});

				await expectOpen(datePicker);
				expect(await datePicker.month.isFocused(), 'Month').to.be.true();
				await Page.spotlightRight();
				expect(await datePicker.day.isFocused(), 'Day').to.be.true();
				await Page.spotlightRight();
				expect(await datePicker.year.isFocused(), 'Year').to.be.true();
			});

			describe('5-way', function () {
				it('should open, spot first item on select, and update value to current date', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const month = new Date(await datePicker.valueText).getMonth();
					await expectOpen(await datePicker);
					expect(await datePicker.month.isFocused()).to.be.true();
					expect(month).to.be.within(0, 11);
				});

				it('should close when pressing select', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(await datePicker);
					expect(await datePicker.month.isFocused()).to.be.true();
					await Page.spotlightSelect();
					await expectClosed(await datePicker);
				});

				it('should focus title when 5-way right from last picker - [GT-24986]', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectOpen(await datePicker);
					expect(await datePicker.month.isFocused()).to.be.true();
					await Page.spotlightRight();
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.title.isFocused()).to.be.true();
				});

				it('should increase the month when incrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const {month} = await extractValues(datePicker);
					await expectOpen(await datePicker);
					expect(await datePicker.month.isFocused()).to.be.true();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightUp();
					});
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker - [GT-21247]', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const {month} = await extractValues(datePicker);
					await expectOpen(await datePicker);
					expect(await datePicker.month.isFocused()).to.be.true();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightDown();
					});
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker - [GT-21247]', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await expectOpen(await datePicker);
					await Page.spotlightRight();
					expect(await datePicker.day.isFocused()).to.be.true();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightUp();
					});
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await expectOpen(await datePicker);
					await Page.spotlightRight();
					expect(await datePicker.day.isFocused()).to.be.true();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightDown();
					});
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker - [GT-21247]', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const {year} = await extractValues(datePicker);
					await expectOpen(await datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.year.isFocused()).to.be.true();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightUp();
					});
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const {year} = await extractValues(datePicker);
					await expectOpen(await datePicker);
					await Page.spotlightRight();
					await Page.spotlightRight();
					expect(await datePicker.year.isFocused()).to.be.true();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightDown();
					});
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});

			describe('pointer', function () {
				it('should open on title click when closed', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					await expectOpen(await datePicker);
				});

				it('should close on title click when open', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					await expectOpen(await datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					await expectClosed(await datePicker);
				});

				it('should select item', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					await datePicker.month.click();
					expect(await datePicker.month.isFocused()).to.be.true();
				});

				it('should increase the month when incrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					const {month} = await extractValues(datePicker);
					await expectOpen(await datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.incrementer(datePicker.month).click();
					});
					const {month: value} = await extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					const {month} = await extractValues(datePicker);
					await expectOpen(datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.decrementer(datePicker.month).click();
					});
					const {month: value} = await extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await expectOpen(datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.incrementer(datePicker.day).click();
					});
					const {day: value} = await extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					const {day, month, year} = await extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					await expectOpen(datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.decrementer(datePicker.day).click();
					});
					const {day: value} = await extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					const {year} = await extractValues(datePicker);
					await expectOpen(datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.incrementer(datePicker.year).click();
					});
					const {year: value} = await extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					const {year} = await extractValues(datePicker);
					await expectOpen(datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.decrementer(datePicker.year).click();
					});
					const {year: value} = await extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});
		});

		describe('default with noneText', function () {
			const datePicker = Page.components.datePickerDefaultClosedWithNoneText;

			it('should display \'noneText\' - [GT-21246]', async function () {
				expect(await datePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('default open', function () {
			const datePicker = Page.components.datePickerDefaultOpenWithNoneText;

			it('should be initially open', async function () {
				await datePicker.self.waitForExist(500);
				await expectOpen(datePicker);
			});

			describe('5-way', function () {
				it('should close when pressing select', async function () {
					await datePicker.focus();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					await expectClosed(datePicker);
					expect(await datePicker.title.isFocused()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click when open - [GT-21246]', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					await expectClosed(datePicker);
				});

				it('should open on title click when closed', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					await expectClosed(datePicker);
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					await expectOpen(datePicker);
				});
			});
		});

		describe('\'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const datePicker = Page.components.datePickerDefaultOpenWithDefaultValue;

			it('should be initially open', async function () {
				await datePicker.self.waitForExist(500);
				await expectOpen(datePicker);
			});

			it('should not display \'noneText\'', async function () {
				expect(await datePicker.valueText).to.not.equal('Nothing Selected');
			});
		});

		describe('with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)`
			const datePicker = Page.components.datePickerWithDefaultValue;

			describe('5-way', function () {
				it('should not update on select', async function () {
					await datePicker.focus();
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await Page.spotlightSelect();
					});

					const {day, month, year} = await extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

			describe('pointer', function () {
				it('should not update on title click', async function () {
					await Page.waitTransitionEnd(3000, undefined, async () => {
						await datePicker.title.click();
					});
					const {day, month, year} = await extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

		});

		describe('no labels', function () {
			const datePicker = Page.components.datePickerNoLabels;

			it('should not have labeled pickers', async function () {
				await datePicker.title.click();
				await expectNoLabels(datePicker);
			});
		});

		describe('disabled', function () {
			const datePicker = Page.components.datePickerDisabledWithNoneText;

			it('should be initially closed', async function () {
				await datePicker.self.waitForExist(500);
				await expectClosed(datePicker);
			});

			it('should display \'noneText\'', async function () {
				expect(await datePicker.valueText).to.equal('Nothing Selected');
			});

			describe('5-way', function () {
				it('should be able to receive focus', async function () {
					await Page.components.datePickerNoLabels.focus();
					await Page.spotlightDown();
					expect(await datePicker.title.isFocused()).to.be.true();
				});
				it('should not open when selected', async function () {
					await Page.spotlightSelect();
					await browser.pause(500);
					await expectClosed(datePicker);
				});
			});

			describe('pointer', function () {
				it('should not open when clicked', async function () {
					await datePicker.title.click();
					// it should never open, but wait and then check to be sure
					await browser.pause(500);
					await expectClosed(datePicker);
				});
			});
		});

		describe('disabled with \'defaultValue\'', function () {
			const datePicker = Page.components.datePickerDisabledWithDefaultValue;

			it('should be initially closed', async function () {
				await datePicker.self.waitForExist(500);
				await expectClosed(datePicker);
			});

			it('should not display \'noneText\'', async function () {
				expect(await datePicker.valueText).to.not.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\'', function () {
			const datePicker = Page.components.datePickerDisabledOpenWithNoneText;
			it('should be initially closed', async function () {
				await datePicker.self.waitForExist(500);
				await expectClosed(datePicker);
			});

			it('should display \'noneText\'', async function () {
				expect(await datePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('disabled \'defaultOpen\' with \'defaultValue\'', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const datePicker = Page.components.datePickerDisabledOpenWithDefaultValue;

			it('should be initially closed', async function () {
				await datePicker.self.waitForExist(500);
				await expectClosed(datePicker);
			});

			it('should not display \'noneText\'', async function () {
				expect(await datePicker.valueText).to.not.equal('Nothing Selected');
			});
		});
	});

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefaultClosedWithoutNoneText;

		beforeEach(async function () {
			await Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				await Page.spotlightSelect();
			});

			await expectOpen(datePicker);
			expect(await datePicker.day.isFocused()).to.be.true();
		});

		it('should have day-month-year order', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				await Page.spotlightSelect();
			});

			await expectOpen(datePicker);
			expect(await datePicker.day.isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await datePicker.month.isFocused()).to.be.true();
			await Page.spotlightLeft();
			expect(await datePicker.year.isFocused()).to.be.true();
		});

		it('should focus title when 5-way left from last picker - [GT-25238]', async function () {
			await Page.waitTransitionEnd(3000, undefined, async () => {
				await Page.spotlightSelect();
			});

			await expectOpen(datePicker);
			expect(await datePicker.day.isFocused()).to.be.true();
			await Page.spotlightLeft();
			await Page.spotlightLeft();
			await Page.spotlightLeft();
			expect(await datePicker.title.isFocused()).to.be.true();
		});
	});

});
