import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import Item from '@enact/moonstone/Item';
import Popup from '@enact/moonstone/Popup';
import Scroller from '@enact/moonstone/Scroller';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

const PopupView = () => {
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);
	const [open4, setOpen4] = useState(false);
	const [open5, setOpen5] = useState(false);

	const handleOpen1 = useCallback(() => setOpen1(true), []);
	const handleOpen2 = useCallback(() => setOpen2(true), []);
	const handleOpen3 = useCallback(() => setOpen3(true), []);
	const handleOpen4 = useCallback(() => setOpen4(true), []);
	const handleOpen5 = useCallback(() => setOpen5(true), []);

	const handleClose1 = useCallback(() => setOpen1(false), []);
	const handleClose2 = useCallback(() => setOpen2(false), []);
	const handleClose3 = useCallback(() => setOpen3(false), []);
	const handleClose4 = useCallback(() => setOpen4(false), []);
	const handleClose5 = useCallback(() => setOpen5(false), []);

	return (
		<div>
			<Button size="small" onClick={handleOpen1}>Basic Popup</Button>
			<Button size="small" onClick={handleOpen2}>Long Popup</Button>
			<Button size="small" onClick={handleOpen3}>Scroller Popup</Button>
			<Button size="small" onClick={handleOpen4}>Button In Popup</Button>
			<Button size="small" onClick={handleOpen5}>Customizable aria-label close button in popup</Button>

			<Popup
				open={open1}
				onClose={handleClose1}
			>
				<span>Popup...</span>
			</Popup>

			<Popup
				open={open2}
				onClose={handleClose2}
				showCloseButton
			>
				<span>
					Enact is a framework designed to be performant, customizable and well structured.
					<br />
					The goal in creating Enact was to build upon the experience gained in producing the Enyo JavaScript framework and to incorporate the latest advances in JavaScript and Web engine technology.
					<br />
					Enact is designed to be used by both novice and expert developers.
					<br />
					Why Enact?
					<br />
					Ease of Use
					<br />
					Enact builds atop the excellent React library, and provides a full framework to the developer.
					<br />
					The recent boom of web technologies and related tools has led to a plethora of options available.
					<br />
					In fact, getting started might be the most difficult part of building a modern web application.
					<br />
					Enact allows developers to avoid this pain by providing an opinionated collection of libraries and tools that have been thoroughly vetted to work well together.
				</span>
			</Popup>

			<Popup
				open={open3}
				onClose={handleClose3}
				showCloseButton
			>
				<Button size="small">Button Outside Scroller</Button>
				<Scroller style={{height: ri.scale(170) + 'px', marginTop: ri.scale(10) + 'px'}}>
					<Item>Test Item 1</Item>
					<Item>Test Item 2</Item>
					<Item>Test Item 3</Item>
					<Item>Test Item 4</Item>
					<Item>Test Item 5</Item>
					<Item>Test Item 6</Item>
					<Item>Test Item 7</Item>
					<Item>Test Item 8</Item>
					<Item>Test Item 9</Item>
					<Item>Test Item 10</Item>
				</Scroller>
			</Popup>

			<Popup
				open={open4}
				onClose={handleClose4}
				showCloseButton
			>
				<Heading showLine>Buttons In Popup Example</Heading>
				<Button size="small">Hello</Button>
				<Button size="small">Goodbye</Button>
			</Popup>

			<Popup
				closeButtonAriaLabel="Close popup"
				onClose={handleClose5}
				open={open5}
				showCloseButton
			>
				<Heading showLine>Customizable aria-label close button in popup Example</Heading>
				<Button size="small">Hello</Button>
				<Button size="small">Goodbye</Button>
			</Popup>
		</div>
	);
};

export default PopupView;
