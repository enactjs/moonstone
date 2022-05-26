import PropTypes from 'prop-types';
import {Component} from 'react';

import {ScrollThumb as UiScrollThumb} from '../internal/Scrollable/Scrollbar';

const nop = () => {};

/**
 * A Moonstone-styled scroll thumb with moonstone behavior
 *
 * @class ScrollThumb
 * @memberof moonstone/Scrollable
 * @extends moonstone/internal/Scrollable/ScrollThumb
 * @ui
 * @private
 */
class ScrollThumb extends Component {
	static propTypes = /** @lends moonstone/Scrollable.ScrollThumb.prototype */ {
		/**
		 * Called when [ScrollThumb]{@link moonstone/Scrollable.ScrollThumb} is updated.
		 *
		 * @type {Function}
		 * @private
		 */
		cbAlertThumb: PropTypes.func
	};

	static defaultProps = {
		cbAlertThumb: nop
	};

	componentDidUpdate () {
		this.props.cbAlertThumb();
	}

	render () {
		const props = Object.assign({}, this.props);

		delete props.cbAlertThumb;

		return <UiScrollThumb {...props} />;
	}
}

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
