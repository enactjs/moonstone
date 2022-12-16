import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import IconButton from '../IconButton';
import {onlyUpdateForProps} from '../internal/util';

/**
 * An {@link moonstone/IconButton.IconButton|IconButton} customized for
 * {@link moonstone/IncrementSlider.IncrementSlider|IncrementSlider}. It is optimized to only
 * update when `disabled` is changed to minimize unnecessary render cycles.
 *
 * @class IncrementSliderButton
 * @memberof moonstone/IncrementSlider
 * @ui
 * @private
 */

const IncrementSliderButtonBase = kind({
	name: 'IncrementSliderButton',

	propTypes: /** @lends moonstone/IncrementSlider.IncrementSliderButton.prototype */ {
		onTap: PropTypes.func
	},

	render: ({onTap, ...rest}) => {
		return (
			<IconButton
				{...rest}
				backgroundOpacity="transparent"
				onTap={onTap}
				onHold={onTap}
				onHoldStart={onTap}
				size="small"
			/>
		);
	}
});

const IncrementSliderButton = onlyUpdateForProps(IncrementSliderButtonBase, ['children', 'disabled', 'spotlightDisabled', 'aria-label']);

export default IncrementSliderButton;
export {
	IncrementSliderButton,
	IncrementSliderButtonBase
};
