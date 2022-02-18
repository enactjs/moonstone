import {useCallback, useState} from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

const MainView = () => {
	const [focusableScrollbar, setFocusableScrollbar] = useState(false);
	const [horizontal, setHorizontal] = useState(false);

	const onChangeDirection = useCallback(() => {
		setHorizontal(!horizontal);
	}, [horizontal]);

	const onChangeFocusableScrollbar = useCallback(() => {
		setFocusableScrollbar(!focusableScrollbar);
	}, [focusableScrollbar]);

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
