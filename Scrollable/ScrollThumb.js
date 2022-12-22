import PropTypes from 'prop-types';
import {Component} from 'react';

import {ScrollThumb as UiScrollThumb} from '../UiScrollable/Scrollbar';

const nop = () => {};

/**
 * A Moonstone-styled scroll thumb with moonstone behavior
 *
 * @class ScrollThumb
 * @memberof moonstone/Scrollable
 * @extends moonstone/UiScrollable/ScrollThumb
 * @ui
 * @private
 */
class ScrollThumb extends Component {
	static propTypes = /** @lends moonstone/Scrollable.ScrollThumb.prototype */ {
		/**
		 * Called when {@link moonstone/Scrollable.ScrollThumb|ScrollThumb} is updated.
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
