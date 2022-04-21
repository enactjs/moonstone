import {VirtualGridListNative as VirtualGridList} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {connect} from 'react-redux';

import ImageItem from '../ImageItem';

const ImageList = ({imageitems, spacing, minHeight, minWidth, ...rest}) => {

	const calculateOfSize = (size) => ri.scale(parseInt(size) || 0);

	const renderItem = useCallback(({...props}) => (<ImageItem {...props} />), []);

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: calculateOfSize(minHeight), minWidth: calculateOfSize(minWidth)}}
			spacing={calculateOfSize(spacing)}
		/>
	);
};

ImageList.propTypes = {
	dispatch: PropTypes.func,
	imageitems: PropTypes.array,
	minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder,
	minHeight: data.minHeight,
	minWidth: data.minWidth,
	spacing: data.spacing
});

export default connect(mapStateToProps)(ImageList);
