async function focusedElement () {
	return await browser.execute(function () {
		return document.activeElement.id;
	});
}

async function hitTest (_selector) {
	return await browser.execute(async function (selector) {
		const
			target = document.querySelector(selector),
			targetRect = target.getBoundingClientRect(),
			targetDown = [targetRect.x + (targetRect.width / 2), targetRect.y + targetRect.height - 1],
			targetTop = [targetRect.x + (targetRect.width / 2), targetRect.y + 1];
		return await target.contains(document.elementFromPoint(...targetDown)) || target.contains(document.elementFromPoint(...targetTop));
	}, _selector);
}

async function expectFocusedItem (itemNum, comment = 'focused item') {
	const focusedId = await focusedElement();
	expect(await focusedId, comment).to.equal(`item${itemNum}`);
}

async function expectNoFocusedItem () {
	expect(await browser.execute(async function () {
		return document.activeElement === document.body;
	})).to.be.true();
}

async function waitUntilFocused (itemNum) {
	const target = `item${itemNum}`;
	await browser.waitUntil(async function () {
		const focusedId = await focusedElement();
		return target === focusedId;
	}, 1500, `timed out waiting to focus index ${itemNum}`);
}

async function waitUntilVisible (itemNum) {
	await browser.waitUntil(async function () {
		return hitTest(`#item${itemNum}`);
	}, 1500, `timed out waiting until visible index ${itemNum}`);
}

async function isScrolling () {
	return await $('#scrolling').getText() === 'Scrolling';
}

async function isNotScrolling () {
	return await $('#scrolling').getText() === 'Not Scrolling';
}

/**
 * Waits for scrolling to stop
 *
 * @param {Number} [timeout=3000]
 */
async function waitForScrollStop (timeout = 3000) {
	await browser.waitUntil(isNotScrolling, timeout);
}

/**
 * Waits for scrolling to start, then stop
 *
 * @param {Number} [timeout=3000]
 */
async function waitForScrollStartStop (timeout = 3000) {
	await browser.waitUntil(isScrolling, timeout);
	await browser.waitUntil(isNotScrolling, timeout);
}

exports.expectFocusedItem = expectFocusedItem;
exports.expectNoFocusedItem = expectNoFocusedItem;
exports.waitForScrollStartStop = waitForScrollStartStop;
exports.waitForScrollStop = waitForScrollStop;
exports.waitUntilFocused = waitUntilFocused;
exports.waitUntilVisible = waitUntilVisible;
