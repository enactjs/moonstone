import Button from '@enact/moonstone/Button';
import {Header, HeaderBase} from '@enact/moonstone/Panels';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Fragment} from 'react';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const inputData = {
	tallText: 'ฟิ้  ไั  ஒ  த',

	shortTitle: 'Enact',
	shortTitleBelow: 'An app framework',
	shortSubTitleBelow: 'Built atop React',
	shortRtlTitle: 'غينيا واستمر',
	shortRtlTitleBelow: 'غينيا واستمر',

	longTitle: 'Core, The building blocks of an Enact application. Moonstone, our TV-centric UI library.',
	longTitleBelow: 'An app development framework built atop React that’s easy to use, performant and customizable. The goal of Enact is to provide the building blocks for creating robust and maintainable applications.',
	longSubTitleBelow: 'With over 50 components to choose from, Moonstone provides a solid base for creating applications designed for large screens. The Enact team welcomes contributions from anyone motivated to help out.',
	longRtlTitle: 'هذا النص طويل ولكن ليس طويلاً. بالتأكيد ليست قصيرة جدا ، على الرغم من.'
};

const headerComponents = <Button>Header Button</Button>;

const prop = {
	marqueeOn: ['hover', 'render']
};

export default {
	title: 'Moonstone/Header',
	component: 'Header'
};

// The Fragment (or any node, really; could be a <div> instead) is actually needed by
// Storybook to properly apply changes from the controls to the stories' children that occupy
// the outermost node. This is most visible when the `noHeader` prop is given and several
// (not all) of the controls fail to apply.
export const JustTitle = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				title={args['title']}
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', JustTitle, Config);
select('marqueeOn', JustTitle, prop.marqueeOn, Config);
text('title', JustTitle, Config, inputData.shortTitle);

JustTitle.storyName = 'just title';

export const JustTitleCompact = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				title={args['title']}
				type="compact"
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', JustTitleCompact, Config);
select('marqueeOn', JustTitleCompact, prop.marqueeOn, Config);
text('title', JustTitleCompact, Config, inputData.shortTitle);

JustTitleCompact.storyName = 'just title, Compact';

export const ShortTitles = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', ShortTitles, Config);
select('marqueeOn', ShortTitles, prop.marqueeOn, Config);
text('subTitleBelow', ShortTitles, Config, inputData.shortSubTitleBelow);
text('title', ShortTitles, Config, inputData.shortTitle);
text('titleBelow', ShortTitles, Config, inputData.shortTitleBelow);

ShortTitles.storyName = 'short titles';

export const ShortTitlesCompact = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
				type="compact"
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', ShortTitlesCompact, Config);
select('marqueeOn', ShortTitlesCompact, prop.marqueeOn, Config);
text('subTitleBelow', ShortTitlesCompact, Config, inputData.shortSubTitleBelow);
text('title', ShortTitlesCompact, Config, inputData.shortTitle);
text('titleBelow', ShortTitlesCompact, Config, inputData.shortTitleBelow);

ShortTitlesCompact.storyName = 'short titles, Compact';

export const LongTitles = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', LongTitles, Config);
select('marqueeOn', LongTitles, prop.marqueeOn, Config);
text('subTitleBelow', LongTitles, Config, inputData.longSubTitleBelow);
text('title', LongTitles, Config, inputData.longTitle);
text('titleBelow', LongTitles, Config, inputData.longTitleBelow);

LongTitles.storyName = 'long titles';

export const LongTitlesCompact = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
				type="compact"
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', LongTitlesCompact, Config);
select('marqueeOn', LongTitlesCompact, prop.marqueeOn, Config);
text('subTitleBelow', LongTitlesCompact, Config, inputData.longSubTitleBelow);
text('title', LongTitlesCompact, Config, inputData.longTitle);
text('titleBelow', LongTitlesCompact, Config, inputData.longTitleBelow);

LongTitlesCompact.storyName = 'long titles, Compact';

export const RtlText = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', RtlText, Config);
select('marqueeOn', RtlText, prop.marqueeOn, Config);
text('subTitleBelow', RtlText, Config, inputData.shortRtlTitleBelow);
text('title', RtlText, Config, inputData.shortRtlTitle);
text('titleBelow', RtlText, Config, inputData.shortRtlTitleBelow);

RtlText.storyName = 'RTL text';

export const RtlTextCompact = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
				type="compact"
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', RtlTextCompact, Config);
select('marqueeOn', RtlTextCompact, prop.marqueeOn, Config);
text('subTitleBelow', RtlTextCompact, Config, inputData.shortRtlTitleBelow);
text('title', RtlTextCompact, Config, inputData.shortRtlTitle);
text('titleBelow', RtlTextCompact, Config, inputData.shortRtlTitleBelow);

RtlTextCompact.storyName = 'RTL text, Compact';

export const LongRtlText = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', LongRtlText, Config);
select('marqueeOn', LongRtlText, prop.marqueeOn, Config);
text('subTitleBelow', LongRtlText, Config, inputData.shortRtlTitleBelow);
text('title', LongRtlText, Config, inputData.longRtlTitle);
text('titleBelow', LongRtlText, Config, inputData.shortRtlTitleBelow);

LongRtlText.storyName = 'RTL text, long title';

export const LongRtlTextCompact = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
				type="compact"
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', LongRtlTextCompact, Config);
select('marqueeOn', LongRtlTextCompact, prop.marqueeOn, Config);
text('subTitleBelow', LongRtlTextCompact, Config, inputData.shortRtlTitleBelow);
text('title', LongRtlTextCompact, Config, inputData.longRtlTitle);
text('titleBelow', LongRtlTextCompact, Config, inputData.shortRtlTitleBelow);

LongRtlTextCompact.storyName = 'RTL text, long title, Compact';

export const TallGlyphs = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', TallGlyphs, Config);
select('marqueeOn', TallGlyphs, prop.marqueeOn, Config);
text('subTitleBelow', TallGlyphs, Config, inputData.tallText);
text('title', TallGlyphs, Config, inputData.tallText);
text('titleBelow', TallGlyphs, Config, inputData.tallText);

TallGlyphs.storyName = 'tall-glyphs';

export const TallGlyphsCompact = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	return (
		<Fragment>
			<Header
				marqueeOn={args['marqueeOn']}
				subTitleBelow={args['subTitleBelow']}
				title={args['title']}
				titleBelow={args['titleBelow']}
				type="compact"
			>
				{addHeaderComponents ? headerComponents : null}
			</Header>
		</Fragment>
	);
};

boolean('add headerComponents', TallGlyphsCompact, Config);
select('marqueeOn', TallGlyphsCompact, prop.marqueeOn, Config);
text('subTitleBelow', TallGlyphsCompact, Config, inputData.tallText);
text('title', TallGlyphsCompact, Config, inputData.tallText);
text('titleBelow', TallGlyphsCompact, Config, inputData.tallText);

TallGlyphsCompact.storyName = 'tall-glyphs, Compact';
