import {ActivityPanels} from '@enact/moonstone/Panels';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Component} from 'react';

import MainPanel from '../views/MainPanel';

class App extends Component {
	render () {
		return (
			<ActivityPanels {...this.props}>
				<MainPanel />
			</ActivityPanels>
		);
	}
}

export default MoonstoneDecorator(App);
