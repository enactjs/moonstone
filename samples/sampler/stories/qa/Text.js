import React from 'react';
import {storiesOf} from '@storybook/react';

import BodyText from '../../../../BodyText';
import Button from '../../../../Button';
import CheckboxItem from '../../../../CheckboxItem';
import Heading from '../../../../Heading';
import ExpandableInput from '../../../../ExpandableInput';
import ExpandableList from '../../../../ExpandableList';
import ExpandablePicker from '../../../../ExpandablePicker';
import FormCheckboxItem from '../../../../FormCheckboxItem';
import GridListImageItem from '../../../../GridListImageItem';
import {Header} from '../../../../Panels';
import Input from '../../../../Input';
import Item from '../../../../Item';
import LabeledItem from '../../../../LabeledItem';
import Marquee from '../../../../Marquee';
import RadioItem from '../../../../RadioItem';
import Scroller from '../../../../Scroller';
import SelectableItem from '../../../../SelectableItem';
import SlotItem from '../../../../SlotItem';
import SwitchItem from '../../../../SwitchItem';

import {select} from '../../src/enact-knobs';

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
		'ฟิ้  ไั  ஒ  து',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'
	]
};

storiesOf('Text', module)
	.add(
		'Tall Glyphs as Non-Latin components',
		() => {
			const children = select('children', prop.tallText, {groupId: 'Text'}, 'नरेंद्र मोदी');

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
					<Header type="standard" title={children} titleBelow={children} subTitleBelow={children} />
					<br />
					<Header type="compact" title={children} titleBelow={children} subTitleBelow={children} />
					<br />
					<Header title={children} titleBelow={children} subTitleBelow={children}>
						<Input value={children} slot="headerInput" />
					</Header>
				</Scroller>
			);
		}
	)
	.add(
		'Languages',
		() => Object.keys(inputData).map(key =>
			<SlotItem key={key}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>[ {key} ]</span>
				</slotBefore>
				{inputData[key]}
			</SlotItem>
		)
	)
	.add(
		'Mixed Scripts',
		() => <div>
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
