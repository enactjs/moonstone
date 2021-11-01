import {useEffect, useState} from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

const MainView = () => {
	const [focusableScrollbar, setFocusableScrollbar] = useState(false);
	const [horizontal, setHorizontal] = useState(false);

	useEffect(() => {
	}, [focusableScrollbar, horizontal])

	function onChangeFocusableScrollbar() {
		setFocusableScrollbar(!focusableScrollbar);
	}

	function onChangeDirection() {
		setHorizontal(!horizontal);
	}

	return (
		<div className={css.mainView} style={{flexDirection: horizontal? 'row' : 'column'}}>
			<PanelHeader
				title="VirtualGridList Native"
				type="compact"
				onChangeDirection={onChangeDirection}
				onChangeFocusableScrollbar={onChangeFocusableScrollbar}
			/>
			<div className={css.content}>
				<ImageList
					className={css.list}
					focusableScrollbar={focusableScrollbar}
					direction={horizontal ? 'horizontal' : 'vertical'}
				/>
			</div>
		</div>
	);
}
export default MainView;
