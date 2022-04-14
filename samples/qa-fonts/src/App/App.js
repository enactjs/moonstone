import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';

import MainPanel from '../views/MainPanel';

const App = (props) => {
	return (
		<ActivityPanels {...props}>
			<MainPanel />
		</ActivityPanels>
	);
}

export default MoonstoneDecorator(App);
