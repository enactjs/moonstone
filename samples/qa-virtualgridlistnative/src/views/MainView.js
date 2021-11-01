import {useState} from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

const MainView = () => {
	const [focusableScrollbar, setFocusableScrollbar] = useState(false);
	const [horizontal, setHorizontal] = useState(false);

	function onChangeFocusableScrollbar () {
		setFocusableScrollbar(!focusableScrollbar);
	}

	function onChangeDirection () {
		setHorizontal(!horizontal);
	}

	return (
		<div className={css.mainView} style={{flexDirection: horizontal ? 'row' : 'column'}}>
			<PanelHeader
				onChangeDirection={onChangeDirection}
				onChangeFocusableScrollbar={onChangeFocusableScrollbar}
				title="VirtualGridList Native"
				type="compact"
			/>
			<div className={css.content}>
				<ImageList
					className={css.list}
					direction={horizontal ? 'horizontal' : 'vertical'}
					focusableScrollbar={focusableScrollbar}
				/>
			</div>
		</div>
	);
};
export default MainView;
