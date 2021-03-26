import kind from '@enact/core/kind';
import $L from '@enact/i18n/$L';
import Text from '@enact/i18n/Text';
import BodyText from '@enact/moonstone/BodyText';
import DayPicker from '@enact/moonstone/DayPicker';
import Heading from '@enact/moonstone/Heading';
import {Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="QA Sample - I18N" />
			<Scroller>
				<Heading showLine>Strings</Heading>
				<BodyText>String - $L: {$L('String')}</BodyText>
				<BodyText>String - Text: <Text>String</Text></BodyText>

				<Heading showLine>Components</Heading>
				<DayPicker title="DayPicker - Every day" defaultSelected={[0, 1, 2, 3, 4, 5, 6]} />
				<DayPicker title="DayPicker - Sun/Sat" defaultSelected={[0, 6]} />
				<DayPicker title="DayPicker - Fri/Sat" defaultSelected={[5, 6]} />
				<DayPicker title="DayPicker - Mon/Tue/Wed/Thr/Fri" defaultSelected={[1, 2, 3, 4, 5]} />
				<DayPicker title="DayPicker - Sun/Mon/Tue/Wed/Thr" defaultSelected={[0, 1, 2, 3, 4]} />
			</Scroller>
		</Panel>
	)
});

export default MainPanel;
