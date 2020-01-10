
const Page = require('./VirtualListPage'),
	{expectFocusedItem, expectNoFocusedItem} = require('./VirtualList-utils');

describe('VirtualList', function () {

	it('should meet initial conditions', function () {
		Page.open();
		expect(Page.buttonFocusableScrollbar.hasFocus(), 'focus').to.be.true();
		expect(Page.buttonScrollUp.getAttribute('disabled'), 'Up disabled').to.be.equal('true');
		expect(Page.buttonScrollDown.getAttribute('disabled'), 'Down disabled').to.be.null();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus first item on first focus', function () {
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0);
		});

		it('should focus and Scroll with Up/Down and 5-way [GT-24451]', function () {
			Page.spotlightDown(); // is on Left button
			Page.spotlightRight(); // is on 'Item 000'
			// Step 3. 5-way Spot the second item 'Item 001'.
			Page.spotlightDown();
			// Verify Step 3: Spotlight displays on the second item 'item 001'.
			expectFocusedItem(1, 'step 3 focus');
			// Step 4. Press Channel Down.
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			// Verify Step 4: Spotlight is on the *Item* closest to the previously focused Item's location.
			expectFocusedItem(9, 'step 4 focus'); // this works in headless + tv  - must comment to run in debug
			// Step 5. 5-way Down several times to the last visible item on the current viewport.
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			// Verify Step 5: Spotlight is on the last visible item. *** it is not
			expectFocusedItem(19, 'step 5 focus');
			// Step 6. Press Channel Down.
			Page.pageDown();
			Page.delay(1500);
			// Verify Step 6: Spotlight is on the *Item* closest to the previously focused Item's location  ?
			expectFocusedItem(27, 'step 6 focus');
			// Step 7. Press Channel Up.
			Page.pageUp();
			Page.delay(1500);
			// Verify Step 7: Spotlight is on the *Item* closest to the previously focused Item's location.
			expectFocusedItem(19, 'step 7 focus');
			// Step 8. 5-way Up several times to the first visible item on the current viewport.
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			Page.spotlightUp();
			// Verify Step 8: Spotlight is on the first visible item.
			expectFocusedItem(9, 'step 8 focus');
			// Step 9. Press Channel Up.
			Page.pageUp();
			Page.delay(1500);
			// Verify Step 9: Spotlight is on the *Item* closest to the previously focused Item's location.
			expectFocusedItem(0, 'step 9 focus');
			// Step 10. Wave the pointer. Step 11. Hover on an item.
			browser.moveToObject('#item3', 302, 50);
			// Verify Step 10, Step 11: Spotlight is on 'Item 003'
			expectFocusedItem(3, 'step 11 focus');
			// Step 12. Press Channel Down.
			Page.pageDown();
			Page.delay(1000);
			// Verify Step 12: 1. Spotlight hides.
			expect(Page.list.hasFocus(), 'step 12 focus PAGE').to.be.false();
		});

		it('should focus back to Paging Controls with 5-way Right [GT-24811]', function () {
			// Step 3. focusableScrollbar > Check
			Page.spotlightSelect();
			Page.spotlightDown();  // is on Left button
			Page.spotlightRight(); // is on 'Item 000'
			// Step 4. Position the pointer on 'Item 001'.
			Page.spotlightDown();
			// Verify Step 4: Spotlight displays on 'Item 001'.
			expectFocusedItem(1);
			// Step 5. 5-way Down aznd 5-way Right.
			Page.spotlightDown();
			Page.spotlightRight();
			// Verify Step 3: Spotlight displays on the Disabled Up Paging Control (∧).
			// ??? expect(Page.buttonScrollUp.getAttribute('disabled'), 'Up disabled').to.be.equal('true');
			expect(Page.buttonScrollUp.hasFocus(), 'step 5 focus').to.be.true();
			// Step 6.1. 5-way Left to go back to the list.
			Page.spotlightLeft();
			expectFocusedItem(0, 'step 6.1 focus');
			// expectFocusedItem(1);  // TODO: VL should remember last focused!
			// Step 6.2. 5-way Down to item 005.
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			// Page.spotlightDown();	// TODO: Should remove 1 when focus returns right
			// Step 6.3. 5-way Right.
			Page.spotlightRight();
			// Verify Step 6: Spotlight displays on the Down Paging Control (∨).
			expect(Page.buttonScrollDown.hasFocus(), 'step 6.3 focus').to.be.true();
		});

		// Partly automated - need wheeling at Step 7
		it('should not scroll when leaving list with 5-way up/down [GT-25987]', function () {
			// Step 3. Set dataSize to 100. Step 4: change to 5-way mode
			// Step 5: 5-way Spot the first item.
			Page.spotlightDown();
			Page.spotlightRight();
			// Verify Step 5: Spotlight displays on the first item.
			expectFocusedItem(0, 'step 5 focus');
			// Step 6: 5-way Up.
			Page.spotlightUp();
			// Verify Step 6: 1. The list *does not* Scroll to the Bottom. 2. Spotlight is on the close button 'x'.
			expect(Page.buttonTop.hasFocus(), 'step 6 focus').to.be.true();  // replaces the X button
			// Step 7: 1. Wheel Down on the list to the last item. 2. Click the last item.
			Page.spotlightDown(); // to spot item 0 at the top of the list
			expectFocusedItem(0);
			for (let i = 0; i < 99; ++i) {
				Page.spotlightDown();
				Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
			}
			// Verify Step 7: Spotlight is on the last item.
			expectFocusedItem(99, 'step 7 focus');
			Page.delay(1500);
			Page.spotlightSelect();
			// Step 8: 5-way Down
			Page.spotlightDown();
			// Verify Step 8: 1. The list *does not* Scroll to the Top. 2. Spotlight stays on the last item.
			// expectFocusedItem(99, 'step 8 focus');
			expect(Page.buttonBottom.hasFocus(), 'step 8 focus').to.be.true(); // Pass but TC calls last item on list to be focused.
		});

		it('should have same height list and scrollbar [GT-22079]', function () {
			// Verify: The scrollbar size fit to the size of the list.
			expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
		});

		it('should retain focus on Paging Controls via 5-way [GT-23899]', function () {
			// Step 3. focusableScrollbar > Check
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			// Step 4. 1. 5-way Spot 'Item 004'.
			// Need to spot item 006 in ui-tests to spot Down Paging Control (∨).
			Page.spotlightDown();
			// expectFocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(6, 'step 4.1 focus');
			// Step 4. 2. 5-way Right.
			Page.spotlightRight();
			// Verify Item 4: Spotlight displays on the Down Paging Control (∨).
			expect(Page.buttonScrollDown.hasFocus(), 'step 4.2 focus').to.be.true();
			// Step 5. 5-way Select *two times* while the Down Paging Control (∨) remains spotted.
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightSelect();
			Page.delay(1500);
			// Verify Step 5: Up Paging Control (∧) becomes Enabled.
			expect(Page.buttonScrollDown.getAttribute('disabled'), 'Down disabled').to.be.null();
			// Step 6. 5-way Up.
			Page.spotlightUp();
			Page.delay(1500);
			// Verify Step 6: Spotlight moves to the Up Paging Control (∧).
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			// Step 7. 5-way Select and Hold until you reach the Top of the list.
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightSelect();
			Page.delay(1500);
			// Verify Step 7: 1.Spotlight stays on the Up Paging Control (∧) 2.The Up Paging Control (∧) becomes Disabled.
			expect(Page.buttonScrollUp.hasFocus()).to.be.true();
			expect(Page.buttonScrollUp.getAttribute('disabled'), 'Up disabled').to.be.equal('true');
		});

		it('should retain focus on Paging Controls via Channel Up / Down [GT-23845]', function () {
			// Step 3. focusableScrollbar > Check
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			// Step 4. 5-way Spot 'Item 004'.
			// Need to spot item 006 in ui-tests to spot Down Paging Control (∨).
			Page.spotlightDown();
			// expectFocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(6);  // Check that Spotlight is on an item
			Page.spotlightRight();
			expect(Page.buttonScrollDown.hasFocus(), 'step 4 focus').to.be.true();
			// Step 5. Press Channel Down two times.
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			// Verify Step 5: Spotlight remains on the Down Paging Control (∨) as the list Scrolls.
			expect(Page.buttonScrollDown.hasFocus(), 'step 5 focus').to.be.true();
			// Step 6. Press Channel Up once.
			Page.pageUp();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			// Verify Step 6: Spotlight navigates to the Up Paging Control (∧).
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			// Step 7. Press Channel Up *two times*.
			Page.pageUp();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			Page.pageUp();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			// Verify Step 7: Spotlight remains on the Up Paging Control (∧) as the list Scrolls.
			expect(Page.buttonScrollUp.hasFocus(), 'step 7 focus').to.be.true();
		});

		it('should position Paging Controls on right side in LTR [GT-21271]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightDown();
			expectFocusedItem(1); // Check that Spotlight is on an item
			Page.spotlightRight();
			expect(Page.buttonScrollUp.hasFocus(), 'step 2.2 focus').to.be.true();
			Page.spotlightDown();
			expect(Page.buttonScrollDown.hasFocus(), 'step 2.2 focus').to.be.true();
		});

		it('should navigate inside and outside of the Paging Controls via 5-way Up, Down, and Right [GT-22761]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			// Step 4.1. 5-way Spot the item below the last item on a current page.
			for (let i = 0; i < 12; ++i) {
				Page.spotlightDown();
				Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
			}
			expectFocusedItem(12);
			// Step 4.2. 5-way Right.
			Page.spotlightRight();
			// Verify Step 4: Spotlight displays on the Down Paging Control (∨).
			expect(Page.buttonScrollDown.hasFocus(), 'step 4.2 focus').to.be.true();
			// Step 5. 5-way Down while the Down Paging Control (∨) remains spotted.
			Page.spotlightDown();
			// Verify Step 5: Spotlight retains on the Down Paging Control (∨).
			// In ui-tests, only check Spotlight goes to the Bottom button
			expect(Page.buttonBottom.hasFocus()).to.be.true();
			// Step 5. 5-way Up.
			Page.spotlightUp();
			// Verify Step 5: Spotlight displays on the Down Paging Control (∨).
			expect(Page.buttonScrollDown.hasFocus(), 'step 5 focus').to.be.true();
			// Step 6. 5-way Up.
			Page.spotlightUp();
			// Verify Step 6: Spotlight displays on the Up Paging Control (∧).
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			// Step 7. 5-way Up again while the Up Paging Control (∧) remains spotted.
			Page.spotlightUp();
			// Verify Step 7: Spotlight displays on the close button ('*x*') above.
			expect(Page.buttonTop.hasFocus(), 'step 7 focus').to.be.true();
		});

		it('should navigate between items and Paging Controls via 5-way Right [GT-21163]', function () {
			// Test calls for 30 items only. Test uses defalt of 100 items.
			Page.spotlightSelect();
			Page.spotlightDown();
			// Step 5. Move focus to the first item ('Item 00').
			Page.spotlightRight();
			// Verify Step5: 1. Spotlight displays on the first item. 2. Up Paging Control (∧) is Disabled.
			expectFocusedItem(0, 'step 5.1 focus');
			expect(Page.buttonScrollUp.getAttribute('disabled'), ' Step 5 Up disabled').to.be.equal('true');
			// Step 6. 5-way Right.
			Page.spotlightRight();
			// Verify Step 6: Spotlight displays on the Disabled Up Paging Control (^)
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			expect(Page.buttonScrollUp.getAttribute('disabled'), ' Step 5 Up disabled').to.be.equal('true');
			// Step 7. 5-way Spot the last item in the list.
			Page.spotlightLeft(); // to spot item 0 at the top of the list
			expectFocusedItem(0);
			for (let i = 0; i < 99; ++i) {
				Page.spotlightDown();
				Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
			}
			// Verify Step 7: 1. Spotlight displays on the last item.
			expectFocusedItem(99, 'step 7.1 focus');
			Page.delay(1500); // needed to validate the buttonScrollDown is disabled
			// Verify Step 7: 2. Down Paging Control (∨) is Disabled.
			expect(Page.buttonScrollDown.getAttribute('disabled'), ' Step 7 Down disabled').to.be.equal('true');
			// Step 8. 5-way Right.
			Page.spotlightRight();
			// Verify Step 8: Spotlight displays on the Disabled Down Paging Control (v).
			expect(Page.buttonScrollDown.hasFocus(), 'step 8 focus').to.be.true();
			expect(Page.buttonScrollDown.getAttribute('disabled'), ' Step 7 Down disabled').to.be.equal('true');
		});

		describe('onKeyDown event behavior [GT-27663]', function () {
			it('should prevent bubbling while navigating within a list', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightDown();
				expectFocusedItem(1, 'focus 2');
				Page.spotlightUp();
				expectFocusedItem(0, 'focus 3');
				Page.spotlightRight();
				expect(Page.buttonScrollUp.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightDown();
				expect(Page.buttonScrollDown.hasFocus(), 'focus 5').to.be.true();
				Page.spotlightUp();
				expect(Page.buttonScrollUp.hasFocus(), 'focus 6').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 7');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
			});

			it('should prevent bubbling when wrapping', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(99, 'focus 2');
				Page.spotlightDown();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(0, 'focus 3');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
			});

			it('should allow bubbling while navigating out of a focusableScrollbar list via scroll buttons', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonScrollUp.hasFocus(), 'focus 1').to.be.true();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightDown();
				expect(Page.list.getAttribute('data-keydown-events'), 'step 8').to.equal('4');
			});

			it('should allow bubbling while navigating out of a list using visible focusableScrollbar via items', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 2');
				for (let i = 0; i < 99; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectFocusedItem(99, 'focus 3');
				Page.spotlightDown();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('3');
			});

			it('should allow bubbling while navigating out of a list using hidden focusableScrollbar via items', function () {
				Page.spotlightSelect();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.buttonTop.hasFocus(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.buttonLeft.hasFocus(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonRight.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 5');
				for (let i = 0; i < 99; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectFocusedItem(99, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.hasFocus(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});

			it('should allow bubbling while navigating out of a list using non-focusableScrollbar via items', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.buttonTop.hasFocus(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.buttonLeft.hasFocus(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonRight.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 5');
				for (let i = 0; i < 99; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectFocusedItem(99, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.hasFocus(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});
		});

		it('should hide Spotlight after scroll wheel [GT-21110]', function () {
			// Step 3 - Position the pointer on an item.
			Page.item(5).moveToObject();
			// Verify Step 3: Spotlight is on 'Item 05'
			expectFocusedItem(5, 'focus Item 5');
			// Step 4. 5-way Spot another item.
			Page.spotlightDown();
			// Verify Step 4: Spotlight is on 'Item 06'
			expectFocusedItem(6, 'focus Item 6');
			// Step 5. Mouse wheel Down.
			Page.mouseWheel(-40, Page.item(6));
			// Verify step 5: Spotlight is not on any item after wheeling stopped.
			expectNoFocusedItem();
		});

		it('Items Animate via Clicking on Page Controls [GT-21571]', function () {
			const scrollDistance = Math.round(Page.listSize.height * 0.66);
			let elementId, initialTop, newTop, travelDistance;
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightRight();
			// Step 3. Click on Down Paging Control (∨).
			expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
			elementId = Page.bottomVisibleItemId();
			initialTop = Page.itemOffsetTopById(elementId);
			Page.buttonScrollDown.click();
			Page.delay(1500);
			expect(Page.buttonScrollUp.getAttribute('disabled'), 'Up is enabled').to.be.null();
			// Verify Step 3: The list Scrolls 66% of the Scroller height Up.
			newTop = Page.itemOffsetTopById(elementId);
			travelDistance = initialTop - newTop;
			expect(travelDistance === scrollDistance).to.be.true();
			// scroll down to get a valid test for the next step
			Page.buttonScrollDown.click();
			Page.delay(1500);
			// Step 4. Click on Up Paging Control (∧).
			elementId = Page.topVisibleItemId();
			initialTop = Page.itemOffsetTopById(elementId);
			Page.buttonScrollUp.click();
			Page.delay(1500);
			// Verify Step 4: The list Scrolls 66% of the Scroller height Down.
			newTop = Page.itemOffsetTopById(elementId);
			if (initialTop < 0) {
				travelDistance = Math.abs(initialTop) + newTop;
			} else {
				travelDistance = newTop - initialTop;
			}
			expect(travelDistance === scrollDistance).to.be.true();
		});
	});

	describe('RTL locale', function () {

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should position Paging Controls on left side in RTL [GT-21270]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightLeft();
			Page.spotlightDown();
			expectFocusedItem(1);
			Page.spotlightLeft();
			expect(Page.buttonScrollUp.hasFocus(), 'step 3 focus').to.be.true();
		});
	});
});
