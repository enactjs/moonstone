const initializeRecords = () => {
	let
		records = {
			data: {},
			dataSize: 100,
			dataOrder: [],
			minHeight: 270,
			minWidth: 180,
			selectedItems: [],
			showOverlay: false,
			spacing: 21
		},
		caption, subCaption, color;

	for (let idx = 0; idx < 100; ++idx) {
		caption = (idx % 8 === 0) ? ' with long title' : '';
		subCaption = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16);

		records.dataOrder.push(idx);
		records.data[idx] = {
			caption: idx + caption,
			selected: false,
			selectionOverlayShowing: false,
			source: 'http://via.placeholder.com/300x300/' + color + '/ffffff/png?text=Image ' + idx,
			subCaption: subCaption
		};
	}

	return records;
};


export default initializeRecords;
export {
	initializeRecords
};
