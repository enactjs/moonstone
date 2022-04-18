import {Scroller as ScrollerJS, ScrollerNative} from '@enact/moonstone/Scroller';
import ToggleButton from '@enact/moonstone/ToggleButton';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

const ScrollerView = () => {
	const [customAriaLabel, setCustomAriaLabel] = useState(false);
	const [isNative, setIsNative] = useState(false);

	const onToggleChangeAriaLabelButton = useCallback(() => setCustomAriaLabel((ariaLabel) => setCustomAriaLabel(!ariaLabel)), []);

	const onToggleChangeJSNativeButton = useCallback(() => setIsNative((native) => setIsNative(!native)), []);

	const Scroller = isNative ? ScrollerNative : ScrollerJS;

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<ToggleButton
					size="small"
					onToggle={onToggleChangeAriaLabelButton}
					selected={customAriaLabel}
				>
					Customizable aria-labels on ScrollButtons
				</ToggleButton>
				<ToggleButton
					size="small"
					onToggle={onToggleChangeJSNativeButton}
					selected={isNative}
				>
					Native
				</ToggleButton>
			</Cell>
			<Cell
				component={Scroller}
				focusableScrollbar
				scrollDownAriaLabel={customAriaLabel ? 'This is scroll down' : null}
				scrollLeftAriaLabel={customAriaLabel ? 'This is scroll left' : null}
				scrollRightAriaLabel={customAriaLabel ? 'This is scroll right' : null}
				scrollUpAriaLabel={customAriaLabel ? 'This is scroll up' : null}
			>
				<div style={{width: ri.scale(2000) + 'px'}}>
					Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
				</div>
			</Cell>
		</Layout>
	);
};

export default ScrollerView;
