import {useCallback, useEffect, useRef, useState} from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

const MainView = () => {
	const scrollTo = useRef();
	const [focusableScrollbar, setFocusableScrollbar] = useState(false);
	const [horizontal, setHorizontal] = useState(false);

	useEffect(() => {
		scrollTo.current({index: 0, animate: false, focus: true});
	}, []);

	const onChangeFocusableScrollbar = useCallback(() => {
		setFocusableScrollbar((isFocusable) => setFocusableScrollbar(!isFocusable));
	}, []);

	const onChangeDirection = useCallback(() => {
		setHorizontal((isHorizontal) => setHorizontal(!isHorizontal));
	}, []);

	const getScrollTo = useCallback((newScrollTo) => {
		scrollTo.current = newScrollTo;
	}, []);

	return (
		<div className={css.mainView}>
			<PanelHeader
				title="VirtualGridList"
				type="compact"
				onChangeDirection={onChangeDirection}
				onChangeFocusableScrollbar={onChangeFocusableScrollbar}
			/>
			<div className={css.content}>
				<ImageList
					cbScrollTo={getScrollTo}
					className={css.list}
					focusableScrollbar={focusableScrollbar}
					direction={horizontal ? 'horizontal' : 'vertical'}
				/>
			</div>
		</div>
	);
};

export default MainView;
