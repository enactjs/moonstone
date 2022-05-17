import Item from '@enact/moonstone/Item';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import ScrollerComponent from '@enact/moonstone/Scroller';
import Group from '@enact/ui/Group';
import Layout, {Cell} from '@enact/ui/Layout';
import ViewManager from '@enact/ui/ViewManager';
import {useCallback, useState} from 'react';

import Button from '../views/Button';
import ContextualPopupDecorator from '../views/ContextualPopupDecorator';
import DayPicker from '../views/DayPicker';
import Dialog from '../views/Dialog';
import Dropdown from '../views/Dropdown';
import EditableIntegerPicker from '../views/EditableIntegerPicker';
import ExpandableItem from '../views/ExpandableItem';
import ExpandableList from '../views/ExpandableList';
import GroupItem from '../views/GroupItem';
import Input from '../views/Input';
import ItemView from '../views/Item';
import Notification from '../views/Notification';
import Option from '../views/Option';
import Panels from '../views/Panels';
import Picker from '../views/Picker';
import Popup from '../views/Popup';
import ProgressBar from '../views/ProgressBar';
import ReadAlert from '../views/ReadAlert';
import ReadOrder from '../views/ReadOrder';
import Scroller from '../views/Scroller';
import Slider from '../views/Slider';
import Spinner from '../views/Spinner';
import TooltipDecorator from '../views/TooltipDecorator';
import VideoPlayer from '../views/VideoPlayer';
import VirtualGridList from '../views/VirtualGridList';
import VirtualList from '../views/VirtualList';

import css from './App.module.less';
import Home from './Home';
import View from './View';

const views = [
	{title: 'About qa-a11y', view: Home},
	{debugProps: true, title: 'Option', view: Option},
	{title: 'Button', view: Button},
	{title: 'ContextualPopupDecorator', view: ContextualPopupDecorator},
	{title: 'DayPicker', view: DayPicker},
	{title: 'Dialog', view: Dialog},
	{title: 'Dropdown', view: Dropdown},
	{title: 'EditableIntegerPicker', view: EditableIntegerPicker},
	{title: 'ExpandableItem', view: ExpandableItem},
	{title: 'ExpandableList', view: ExpandableList},
	{title: 'GroupItem', view: GroupItem},
	{title: 'Input', view: Input},
	{title: 'Item', view: ItemView},
	{title: 'Notification', view: Notification},
	{isHeader: false, title: 'Panels', view: Panels},
	{title: 'Picker', view: Picker},
	{title: 'Popup', view: Popup},
	{title: 'ProgressBar', view: ProgressBar},
	{title: 'ReadAlert', view: ReadAlert},
	{title: 'ReadOrder', view: ReadOrder},
	{title: 'Scroller', view: Scroller},
	{title: 'Slider', view: Slider},
	{title: 'Spinner', view: Spinner},
	{title: 'TooltipDecorator', view: TooltipDecorator},
	{isAriaHidden: true, title: 'VideoPlayer', view: VideoPlayer},
	{title: 'VirtualGridList', view: VirtualGridList},
	{title: 'VirtualList', view: VirtualList}
];

const AppBase = ({...props}) => {
	const [isDebugMode, setIsDebugMode] = useState(false);
	const [selected, setSelected] = useState(0);

	const handleChangeView = useCallback((state) => {
		setSelected(state.selected);
	}, []);

	const handleDebug = useCallback(() => setIsDebugMode((isDebug) => setIsDebugMode(!isDebug)), []);

	const debugAriaClass = isDebugMode ? 'aria debug' : null;

	return (
		<Layout {...props}>
			<Cell component={ScrollerComponent} size="20%">
				<Group childComponent={Item} itemProps={{className: css.navItem}} onSelect={handleChangeView} select="radio">
					{views.map((view) => view.title)}
				</Group>
			</Cell>
			<Cell className={debugAriaClass} component={ViewManager} index={selected}>
				{views.map((view, i) => (
					<View {...view} handleDebug={handleDebug} isDebugMode={isDebugMode} key={i} />
				))}
			</Cell>
		</Layout>
	);
};

const App = MoonstoneDecorator(AppBase);

export default App;
