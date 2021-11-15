import {useState} from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

const MainView = () => {
	const [focusableScrollbar, setFocusableScrollbar] = useState(false);
	const [horizontal, setHorizontal] = useState(false);

	function onChangeDirection () {
		setHorizontal(!horizontal);
	}

	function onChangeFocusableScrollbar () {
		setFocusableScrollbar(!focusableScrollbar);
	}

	return (
		<div className={css.mainView}>
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
