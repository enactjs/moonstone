const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('../MoonstonePage');

runTest({
	testName: 'Moonstone Light',
	Page: Page,
	skin: 'light',
	highContrast: false
});
