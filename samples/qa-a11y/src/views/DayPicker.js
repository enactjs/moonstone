import DayPicker from '@enact/moonstone/DayPicker';
import Heading from '@enact/moonstone/Heading';
import Layout, {Cell} from '@enact/ui/Layout';
import Scroller from '@enact/moonstone/Scroller';

const DayPickerView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<DayPicker
				noneText="none"
				title="Day Picker"
			/>
			<Heading showLine>Customizable labels</Heading>
			<DayPicker
				everyDayText="Selected every day"
				everyWeekdayText="Selected every weekday"
				everyWeekendText="Selected every weekend"
				noneText="none"
				title="Day Picker"
			/>
		</Cell>
	</Layout>
);

export default DayPickerView;
