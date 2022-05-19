import kind from '@enact/core/kind';
import Item from '@enact/moonstone/Item';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import css from './ListItem.module.less';

const ListItem = kind({
	name: 'ListItem',
	functional: true,
	propTypes: {
		children: PropTypes.any,
		dispatch: PropTypes.func,
		index: PropTypes.number
	},
	styles: {
		css,
		className: 'listItem'
	},
	render: ({children, ...rest}) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const disabled = useSelector(({listItems}) => listItems[rest.index].disabled);
		delete rest.index;
		delete rest.dispatch;

		return (
			<Item {...rest} disabled={disabled}>
				{children}
			</Item>
		);
	}
});

export default ListItem;
