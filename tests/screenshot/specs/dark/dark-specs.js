const {runTest} = require('@enact/ui-test-utils/utils');

const Page = require('../MoonstonePage');

runTest({
	testName: 'Moonstone Dark',
	Page: Page,
	skin: 'dark',
	highContrast: false
});
