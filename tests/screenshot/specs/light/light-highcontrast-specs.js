const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('../MoonstonePage');

runTest({
	testName: 'Moonstone Light High Contrast',
	Page: Page,
	skin: 'dark',
	highContrast: true
});
