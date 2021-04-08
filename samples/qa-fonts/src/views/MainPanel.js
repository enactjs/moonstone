import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import {Header, Panel} from '@enact/moonstone/Panels';
import {Component} from 'react';
import Scroller from '@enact/moonstone/Scroller';

import FontList from '../components/FontList';

const
	moonstoneIcons = '\u{2B} \u{21A9} \u{22EF} \u{EFFDD} \u{EFFEA} \u{F0028}',
	lgIcons = 'ꔘ ꔧ ꕒ ꕭ ꖀ';

const fonts = {
	standard: [
		'300 1em "Moonstone Condensed"',
		'1em "Moonstone Condensed"',
		'bold 1em "Moonstone Condensed"',
		'100 1em "Moonstone"',
		'300 1em "Moonstone"',
		'1em "Moonstone"',
		'500 1em "Moonstone"',
		'italic 500 1em "Moonstone"',
		'700 1em "Moonstone"',
		'italic 700 1em "Moonstone"',
		'900 1em "Moonstone"',
		'italic 900 1em "Moonstone"',
		['1em "Moonstone Icons"', moonstoneIcons],
		['1em "LG Icons"', lgIcons],
		'300 1em "Moonstone Global"',
		'1em "Moonstone Global"',
		'bold 1em "Moonstone Global"'
	],
	system: [
		// Full-names
		'300 1em "LG Smart UI Cond Light"',
		'1em "LG Smart UI Cond"',
		'600 1em "LG Smart UI Cond SemiBold"',
		'700 1em "LG Smart UI Cond Bold"',
		'300 1em "LG Smart UI Light"',
		'1em "LG Smart UI"',
		'600 1em "LG Smart UI SemiBold"',
		'700 1em "LG Smart UI Bold"',
		['1em "Moonstone"', moonstoneIcons],
		['1em "LG Display_Dingbat"', lgIcons],
		'1em "LG Smart UI Global-Light"',
		'1em "LG Smart UI Global-Regular"',
		'1em "LG Display GP4_HK-Light"',
		'1em "LG Display GP4_HK-Regular"'
	],
	systemPs: [
		// Postscript names
		'300 1em "LGSmartUICond-Light"',
		'1em "LGSmartUICond-Regular"',
		'600 1em "LGSmartUICond-SemiBold"',
		'700 1em "LGSmartUICond-Bold"',
		'300 1em "LGSmartUI-Light"',
		'1em "LGSmartUI-Regular"',
		'600 1em "LGSmartUI-SemiBold"',
		'700 1em "LGSmartUI-Bold"',
		'1em "LGSmartUIGlobal-Light"',
		'1em "LGSmartUIGlobal-Regular"'
	],
	locale: [
		['1em "LG Display_Amharic"', 'አማርኛ'],
		'1em "LG Display_JP"',
		['1em "LG Display_ML"', 'മലയാളം'],
		['1em "LG Display_Oriya"', 'ଓଡ଼ିଆ ଭାଷା'],
		['1em "LG Display_Urdu"', 'مجھے چکّر آرہے ہیں']
	],
	legacyWeb: [
		'300 1em "Moonstone Miso"',
		'1em "Moonstone Miso"',
		'bold 1em "Moonstone Miso"',
		'100 1em "MuseoSans"',
		'300 1em "MuseoSans"',
		'1em "MuseoSans"',
		'500 1em "MuseoSans"',
		'italic 500 1em "MuseoSans"',
		'700 1em "MuseoSans"',
		'italic 700 1em "MuseoSans"',
		'900 1em "MuseoSans"',
		'italic 900 1em "MuseoSans"',
		['1em "Moonstone Icons"', moonstoneIcons],
		['1em "LG Icons"', lgIcons],
		'300 1em "Moonstone LG Display"',
		'1em "Moonstone LG Display"',
		'bold 1em "Moonstone LG Display"'
	],
	legacySystem: [
		'300 1em "Miso"',
		'1em "Miso"',
		'bold 1em "Miso"',
		'100 1em "Museo Sans"',
		'300 1em "Museo Sans"',
		'1em "Museo Sans"',
		'500 1em "Museo Sans"',
		'italic 500 1em "Museo Sans"',
		'700 1em "Museo Sans"',
		'italic 700 1em "Museo Sans"',
		'900 1em "Museo Sans"',
		'italic 900 1em "Museo Sans"',
		['1em "Moonstone"', moonstoneIcons],
		['1em "LG Display_Dingbat"', lgIcons],
		'1em "LG Display-Light"',
		'1em "LG Display-Regular"',
		'1em "LG Display GP4_HK-Light"',
		'1em "LG Display GP4_HK-Regular"'
	]
};

class MainPanel extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<Panel {...this.props}>
				<Header type="compact">
					<title>Font Verification</title>
					<Button>A Moonstone Button</Button>
				</Header>
				<Scroller focusableScrollbar>
					<Heading size="large" showLine>Current</Heading>
					<FontList fonts={fonts.standard}>Moonstone Defined Fonts</FontList>
					<FontList fonts={fonts.system}>System Fonts (Locally Installed)</FontList>
					<FontList fonts={fonts.systemPs}>System Fonts PostScript Names (Locally Installed)</FontList>
					<Heading size="large" showLine>Regional</Heading>
					<FontList fonts={fonts.locale}>Locale-specific Fonts</FontList>
					<Heading size="large" showLine>Legacy</Heading>
					<FontList fonts={fonts.legacyWeb}>Legacy Moonstone Defined Fonts</FontList>
					<FontList fonts={fonts.legacySystem}>Legacy System Fonts (Locally Installed)</FontList>
				</Scroller>
			</Panel>
		);
	}
}

export default MainPanel;
