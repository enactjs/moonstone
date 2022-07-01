/* eslint-disable no-undefined */
let Page = require('./ActivityPanelsPage');

describe('ActivityPanels', function () {

	beforeEach(async function () {
		await Page.open();
	});

	it('should load first panel.', async function () {
		expect((await Page.panelTitle).toLowerCase()).to.equal('FIRST'.toLowerCase());
	});

	it('should have breadcrumb on second panel', async function () {
		await Page.waitTransitionEnd(5000, undefined, () => {
			Page.button1.click();
		}, []);

		Page.button1.click();

		expect(await Page.breadcrumbHeader.getText()).to.include('01');
	});

	describe('Transition', function () {
		it('should move from first panel to the second', async function () {
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.button1.click();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('SECOND'.toLowerCase());
		});

		it('should navigate to Last Focused', async function () {
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.item1.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.item5.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.button4.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.item2.click();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('Last Focused'.toLowerCase());
		});

		it('should navigate back to the First panel from clicking on breadcrumb', async function () {
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.item1.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.item5.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.button4.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.item2.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.breadcrumbHeader.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.breadcrumbHeader.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.breadcrumbHeader.click();
			}, []);
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.breadcrumbHeader.click();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('FIRST'.toLowerCase());
		});

		it('should navigate back to the Third panel from clicking on breadcrumb', async function () {
			await Page.waitTransitionEnd(5000, 'one', () => {
				Page.item1.click();
			}, []);
			await Page.waitTransitionEnd(5000, 'two', () => {
				Page.item5.click();
			}, []);
			await Page.waitTransitionEnd(5000, 'three', () => {
				Page.breadcrumbHeader.click();
			}, []);
			await Page.waitTransitionEnd(5000, 'four', () => {
				Page.item8.click();
			}, []);
			await Page.waitTransitionEnd(5000, 'five', () => {
				Page.button4.click();
			}, []);
			await Page.waitTransitionEnd(5000, 'six', () => {
				Page.breadcrumbHeader.click();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('THIRD'.toLowerCase());
		});

		it('should move from first panel to the third', async function () {
			await Page.button1.moveTo();
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.spotlightSelect();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('SECOND'.toLowerCase());
			await Page.item8.moveTo();
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.spotlightSelect();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('THIRD'.toLowerCase());
		});

		it('should move to first panel from the third', async function () {
			await Page.button1.moveTo();
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.spotlightSelect();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('SECOND'.toLowerCase());
			await Page.item8.moveTo();
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.spotlightSelect();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('THIRD'.toLowerCase());
			await Page.breadcrumbHeader.moveTo();
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.spotlightSelect();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('SECOND'.toLowerCase());
			await Page.item8.moveTo();
			await Page.breadcrumbHeader.moveTo();
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.spotlightSelect();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('FIRST'.toLowerCase());
		});

		it('should transition back to First panel with back key', async function () {
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.button1.click();
			}, []);
			expect((await Page.panelTitle).toLowerCase()).to.equal('SECOND'.toLowerCase());
			await Page.waitTransitionEnd(5000, undefined, () => {
				Page.backKey();
			}, []);

			expect((await Page.panelTitle).toLowerCase()).to.equal('FIRST'.toLowerCase());
		});
	});

	describe('Spotlight', function () {
		it('should spot item 1 on render', async function () {
			expect(await Page.item1.isFocused()).to.be.true();
		});

		describe('pointer', function () {
			// The ESC button (Back Key) does _not_ unset the pointer mode and does _not_ focus [ENYO-5865] [ENYO-5882]
			it('should Not spot last focused item when transitioning back', async function () {
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.item2.click();
				}, []);
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.backKey();
				}, []);

				expect(await Page.item2.isFocused()).to.be.false();
			});

			// The ESC button (Back Key) does _not_ unset the pointer mode and does _not_ focus [ENYO-5865] [ENYO-5882]
			it('should Not spot last focused item when transitioning back after moving pointer', async function () {
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.item2.click();
				}, []);
				Page.item8.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.backKey();
				}, []);

				expect(await Page.item2.isFocused()).to.be.false();
			});
		});


		describe('5way', function () {
			it('should spot first item on second panel', async function () {
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused()).to.be.true();
			});

			it('should spot last focused item when transitioning back using back key', async function () {
				Page.spotlightDown();
				await Page.waitTransitionEnd(5000, 'panel open', () => {
					Page.spotlightSelect();
				}, []);
				expect(await Page.item5.isFocused()).to.be.true();
				await Page.waitTransitionEnd(5000, 'panel back', () => {
					Page.backKey();
				}, []);

				expect(await Page.item2.isFocused()).to.be.true();
			});

			// Revisit this test.  As we can't focus the breadcrumb with 5-way by going down right now
			// we can't have button 4 have the last focus.  Possibly related to ENYO-5151.
			it('should spot last focused item when transitioning back from Third panel', async function () {
				Page.spotlightDown();
				Page.spotlightDown();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused(), 'Item 5 focus').to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.button3.isFocused(), 'Button 3 focus').to.be.true();
				Page.spotlightRight();
				expect(await Page.button4.isFocused(), 'Button 4 focus').to.be.true();
				Page.spotlightLeft();
				Page.spotlightLeft();
				expect(await Page.breadcrumb.isFocused(), 'Breadcrumb focus').to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused(), 'Item 5 refocus').to.be.true();
			});

			it('should spot last focused item in first panel when transitioning after deep navigation', async function () {
				Page.spotlightDown();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				Page.spotlightDown();
				expect(await Page.item6.isFocused(), 'Item 6 focus').to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.button3.isFocused(), 'Button 3 focus').to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.backKey();
				}, []);
				expect(await Page.item6.isFocused(), 'Item 6 refocus').to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.backKey();
				}, []);
				expect(await Page.item2.isFocused(), 'Item 2 refocus').to.be.true();
			});

			// Panel does not remember last focused item when moving forward to already visited panel
			// from 2.4.0, panel no longer remembers the children when going forward. It will land on the default item - first item - on the panel
			it('should spot the fifth item on second panel', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused()).to.be.true();
				await Page.spotlightLeft();
				expect(await Page.breadcrumb.isFocused()).to.be.true();
				await Page.spotlightRight();
				expect(await Page.item5.isFocused()).to.be.true();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightLeft();
				await Page.spotlightRight();
				expect(await Page.item5.isFocused()).to.be.true(); // only from 2.4.0
				// expect(Page.item8.isFocused()).to.be.true(); // on 2.3.0 and prior
			});

			it('should spot the seventh item on last panel', async function () {
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);
				await Page.spotlightRight();
				await Page.spotlightRight();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused()).to.be.true();
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.spotlightLeft();
				expect(await Page.breadcrumb.isFocused()).to.be.true();
				await Page.spotlightRight();
				expect(await Page.item7.isFocused()).to.be.true();
			});

			it('should spot third item on first panel', async function () {
				await Page.spotlightDown();
				await Page.spotlightDown();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused()).to.be.true();
				await Page.spotlightLeft();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item3.isFocused()).to.be.true();
			});
		});

		describe('5way and pointer', function () {
			it('should not spot in None panel', async function () {
				await Page.button1.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect((await Page.panelTitle).toLowerCase()).to.equal('SECOND'.toLowerCase());
				await Page.item8.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.button3.isFocused()).to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.body.isFocused()).to.be.true();
			});

			it('should spot default item in Default panel', async function () {
				await Page.button1.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect((await Page.panelTitle).toLowerCase()).to.equal('SECOND'.toLowerCase());
				await Page.item8.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect((await Page.panelTitle).toLowerCase()).to.equal('THIRD'.toLowerCase());
				await Page.button4.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect((await Page.panelTitle).toLowerCase()).to.equal('NONE'.toLowerCase());
				await Page.button1.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused()).to.be.true();
			});

			it('should re-spot last focused in last focused panel', async function () {
				await Page.button1.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused(), 'item 5 focus 1').to.be.true();
				await Page.item8.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.button3.isFocused(), 'button 3 focus').to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.body.isFocused(), 'body focus').to.be.true();
				await Page.spotlightDown();
				expect(await Page.breadcrumb.isFocused(), 'breadcrumb focus').to.be.true();
				await Page.button1.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused(), 'item 5 focus 2').to.be.true();
				// Focus to item 6 so it can be last-focused item when returning
				await Page.spotlightDown();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.backKey();
				}, []);
				await Page.spotlightDown();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item6.isFocused(), 'item 6').to.be.true();
			});

			it('should spot last focused item when transitioning back with Back key, deep navigation', async function () {
				await Page.item3.moveTo();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.item5.isFocused()).to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.spotlightSelect();
				}, []);

				expect(await Page.button3.isFocused()).to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.backKey();
				}, []);
				expect(await Page.item5.isFocused()).to.be.true();
				await Page.waitTransitionEnd(5000, undefined, () => {
					Page.backKey();
				}, []);

				expect(await Page.item3.isFocused()).to.be.true();
			});
		});
	});
});
