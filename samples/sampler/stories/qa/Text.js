import BodyText from '@enact/moonstone/BodyText';
import Button from '@enact/moonstone/Button';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import Heading from '@enact/moonstone/Heading';
import ExpandableInput from '@enact/moonstone/ExpandableInput';
import ExpandableList from '@enact/moonstone/ExpandableList';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import GridListImageItem from '@enact/moonstone/GridListImageItem';
import Input from '@enact/moonstone/Input';
import Item from '@enact/moonstone/Item';
import LabeledItem from '@enact/moonstone/LabeledItem';
import Marquee from '@enact/moonstone/Marquee';
import {Header} from '@enact/moonstone/Panels';
import RadioItem from '@enact/moonstone/RadioItem';
import Scroller from '@enact/moonstone/Scroller';
import SelectableItem from '@enact/moonstone/SelectableItem';
import SlotItem from '@enact/moonstone/SlotItem';
import SwitchItem from '@enact/moonstone/SwitchItem';
import {select} from '@enact/storybook-utils/addons/controls';

const inputData = {
	english: 'We name themes after gemstones',
	arabic: 'نحن اسم المواضيع بعد الأحجار الكريمة',
	chinese: '星期日 星期一 星期二 星期三 星期四 星期五 星期六',
	greek: 'Ονομάζουμε θέματα μετά από πολύτιμους λίθους',
	hebrew: 'אנו שם נושאים לאחר אבני חן',
	japanese: '宝石にちなんでテーマに名前を付けます',
	oriya: 'ସବୁ ମନୁଷ୍ୟ ଜନ୍ମକାଳରୁ ସ୍ୱାଧୀନ। ସେମାନଙ୍କର ମର୍ଯ୍ୟାଦା ଓ',
	russian: 'Мы называем темы в честь драгоценных камней',
	tamil: 'ரத்தினங்களுக்கு பிறகு கருப்பொருள்களுக்கு பெயரிடுகிறோம்',
	thai: 'เราตั้งชื่อธีมตามอัญมณี',
	urdu: 'ہم گیسسٹون کے بعد موضوعات کا نام دیتے ہیں'
};

const mixedText = 'ข้MอiคxวeาdมTผeสxมt - M混i合x文e字d';

Heading.displayName = 'Heading';

const prop = {
	tallText: [
		'नरेंद्र मोदी',
		'ฟิ้ ไั ஒ து',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'
	]
};

export default {
	title: 'Moonstone/Text',
	component: 'Text'
};

export const TallGlyphsNonLatin = (args) => {
	const children = args['children'];

	return (
		<Scroller style={{height: '100%'}}>
			<Heading showLine>Text controls (div, Heading, BodyText, Marquee)</Heading>
			<div>{children}</div>
			<Heading showLine>{children}</Heading>
			<BodyText>{children}</BodyText>
			<Marquee>{children}</Marquee>

			<Heading showLine>Basic Form controls (Button, Input)</Heading>
			<Button>{children}</Button>
			<Input placeholder={children} />
			<Input value={children} />

			<Heading showLine>Simple Items (Item, LabeledItem, GridListImageItem)</Heading>
			<Item>{children}</Item>
			<LabeledItem label={children}>{children}</LabeledItem>
			<GridListImageItem caption={children} style={{height: 200}} />

			<Heading showLine>Expandables (Input, List, Picker)</Heading>
			<ExpandableInput title={children} value={children} />
			<ExpandableList title={children}>{[children, children, children]}</ExpandableList>
			<ExpandablePicker title={children}>{[children, children, children]}</ExpandablePicker>

			<Heading showLine>ToggleItems</Heading>
			<CheckboxItem>{children}</CheckboxItem>
			<FormCheckboxItem>{children}</FormCheckboxItem>
			<RadioItem>{children}</RadioItem>
			<SelectableItem>{children}</SelectableItem>
			<SwitchItem>{children}</SwitchItem>

			<Heading showLine>Headers (Standard, Compact, Input)</Heading>
			<Header subTitleBelow={children} title={children} titleBelow={children} type="standard" />
			<br />
			<Header subTitleBelow={children} title={children} titleBelow={children} type="compact" />
			<br />
			<Header subTitleBelow={children} title={children} titleBelow={children} >
				<Input value={children} slot="headerInput" />
			</Header>
		</Scroller>
	);
};

select('children', TallGlyphsNonLatin, prop.tallText, {groupId: 'Text'}, 'नरेंद्र मोदी');

TallGlyphsNonLatin.storyName = 'Tall Glyphs as Non-Latin components';

export const Languages = () => {
	return (
		Object.keys(inputData).map(key =>
			<SlotItem key={key}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>[ {key} ]</span>
				</slotBefore>
				{inputData[key]}
			</SlotItem>
		)
	);
};

Languages.storyName = 'Languages';
Languages.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const MixedScripts = () => {
	return (
		<div>
			<SlotItem style={{fontWeight: 300}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>light</span>
				</slotBefore>
				{mixedText}
			</SlotItem>
			<SlotItem style={{fontWeight: 400}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>regular</span>
				</slotBefore>
				{mixedText}
			</SlotItem>
			<SlotItem style={{fontWeight: 600}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>semi-bold</span>
				</slotBefore>
				{mixedText}
			</SlotItem>
			<SlotItem style={{fontWeight: 700}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>bold</span>
				</slotBefore>
				{mixedText}
			</SlotItem>
		</div>
	);
};

MixedScripts.storyName = 'Mixed Scripts';
MixedScripts.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
