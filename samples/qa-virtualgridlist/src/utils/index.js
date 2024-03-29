const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

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
			source: svgGenerator(300, 300, color, 'ffffff', `Image ${idx}`),
			subCaption: subCaption
		};
	}

	return records;
};


export default initializeRecords;
export {
	initializeRecords
};
