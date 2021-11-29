import {memo} from 'react';

/**
 * Removes voice control related props from `props` and returns them in a new object.
 *
 * @function
 * @param   {Object}    props    Props object
 *
 * @returns {Object}             voice control related props
 * @memberof moonstone/internal/util
 * @private
 */
const extractVoiceProps = function (props) {
	const obj = {};
	Object.keys(props).forEach(key => {
		if (key.indexOf('data-webos-voice-') === 0) {
			obj[key] = props[key];
			delete props[key];
		}
	});

	return obj;
};

/**
 * Updates component only when given props are not shallowly equivalent, not updating otherwise.
 *
 * @function
 * @param   {any}    wrapped    A component
*  @param   {Array}  propKeys   Prop keys to compare
 *
 * @returns {any}               Conditionally memoized component
 * @memberof moonstone/internal/util
 * @private
 */
const onlyUpdateForProps = (wrapped, propKeys) => memo(wrapped, (prevProps, nextProps) => {
	const hasOwn = Object.prototype.hasOwnProperty;

	if (Array.isArray(propKeys)) {
		return propKeys.every((key) => hasOwn.call(prevProps, key) && hasOwn.call(nextProps, key) && Object.is(prevProps[key], nextProps[key]));
	}

	return false;
});

export {
	extractVoiceProps,
	onlyUpdateForProps
};
