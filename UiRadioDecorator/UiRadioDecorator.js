/**
 * A higher-order component that manages activation of components.
 *
 * @module moonstone/UiRadioDecorator
 * @exports RadioDecorator
 * @exports RadioControllerDecorator
 */

import {forwardCustom} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {Component} from 'react';

import {RadioContext, RadioControllerDecorator} from './UiRadioControllerDecorator';

/**
 * Default config for `RadioDecorator`.
 *
 * @memberof moonstone/UiRadioDecorator.RadioDecorator
 * @hocconfig
 */
const defaultConfig = {
	/**
	 * The event indicating the wrapped component is activated
	 *
	 * @type {String}
	 * @default null
	 * @memberof moonstone/UiRadioDecorator.RadioDecorator.defaultConfig
	 */
	activate: null,

	/**
	 * The event indicating the wrapped component is deactivated
	 *
	 * @type {String}
	 * @default null
	 * @memberof moonstone/UiRadioDecorator.RadioDecorator.defaultConfig
	 */
	deactivate: null,

	/**
	 * The name of a boolean prop that activates the wrapped component when it is true.
	 *
	 * @type {String}
	 * @default 'active'
	 * @memberof moonstone/UiRadioDecorator.RadioDecorator.defaultConfig
	 */
	prop: 'active'
};

/**
 * A higher-order component (HOC) that allows another component to have a mutually exclusive
 * relationship with other descendants of the same {@link moonstone/UiRadioDecorator.RadioControllerDecorator}.
 *
 * When the `activate` event for the wrapped component is called, the component is activated and the
 * previously activated component, if any, is deactivated by invoking the `deactivate` event.
 *
 * @class RadioDecorator
 * @memberof moonstone/UiRadioDecorator
 * @hoc
 * @public
 */
const RadioDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {activate, deactivate, prop} = config;

	return class extends Component {
		static displayName = 'RadioDecorator';

		static contextType = RadioContext;

		componentDidMount () {
			if (this.context && typeof this.context === 'function') {
				this.controller = this.context(this.handleDeactivate);
				this.notifyController();
			}
		}

		componentDidUpdate () {
			this.notifyController();
		}

		componentWillUnmount () {
			if (this.controller) {
				this.controller.unregister();
			}
		}

		notifyController () {
			if (this.controller && prop && this.props[prop]) {
				this.controller.notify({action: 'activate'});
			}
		}

		/*
		 * Invoked by a `RadioControllerDecorator` when the wrapped component should be deactivated
		 *
		 * @returns {undefined}
		 */
		deactivate = () => {
			if (this.props[prop]) {
				forwardCustom(deactivate)(null, this.props);
			}
		};

		handleActivate = () => {
			if (this.controller) {
				this.controller.notify({action: 'activate'});
			}

			forwardCustom(activate)(null, this.props);
		};

		handleDeactivate = () => {
			if (this.controller) {
				this.controller.notify({action: 'deactivate'});
			}

			forwardCustom(deactivate)(null, this.props);
		};

		render () {
			let props = this.props;

			if (activate || deactivate) {
				props = Object.assign({}, this.props);
				if (activate) props[activate] = this.handleActivate;
				if (deactivate) props[deactivate] = this.handleDeactivate;
			}

			return <Wrapped {...props} />;
		}
	};
});

export default RadioDecorator;
export {
	RadioControllerDecorator,
	RadioDecorator
};
