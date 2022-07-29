import Button from '@enact/moonstone/Button';
import Input from '@enact/moonstone/Input';
import {Header, HeaderBase} from '@enact/moonstone/Panels';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Fragment} from 'react';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const inputData = {
	tallText: 'ฟิ้  ไั  ஒ  த',
	longTitle: 'Core, The building blocks of an Enact application. Moonstone, our TV-centric UI library.',
	longTitleBelow: 'An app development framework built atop React that’s easy to use, performant and customizable. The goal of Enact is to provide the building blocks for creating robust and maintainable applications.',
	longSubTitleBelow: 'With over 50 components to choose from, Moonstone provides a solid base for creating applications designed for large screens. The Enact team welcomes contributions from anyone motivated to help out.'
};

const headerComponents = <Button>Header Button</Button>;

const prop = {
	marqueeOn: ['hover', 'render']
};

export default {
	title: 'Moonstone/Header/Input',
	component: 'Header'
};

// The Fragment (or any node, really; could be a <div> instead) is actually needed by
// Storybook to properly apply changes from the controls to the stories' children that occupy
// the outermost node. This is most visible when the `noHeader` prop is given and several
// (not all) of the controls fail to apply.
export const TallGlyphs = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	const input = args['Input Mode'] ? <Input placeholder={args['placeholder']} dismissOnEnter={args['Input dismissOnEnter']} /> : null;
	return (
		<Fragment>
			<Header
				headerInput={input}
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
boolean('Input dismissOnEnter', TallGlyphs, Config, true);
boolean('Input Mode', TallGlyphs, Config, true);
select('marqueeOn', TallGlyphs, prop.marqueeOn, Config);
text('placeholder', TallGlyphs, Config, inputData.longTitle);
text('subTitleBelow', TallGlyphs, Config, inputData.longSubTitleBelow);
text('title', TallGlyphs, Config, inputData.tallText);
text('titleBelow', TallGlyphs, Config, inputData.longTitleBelow);

TallGlyphs.storyName = 'tall-glyphs';

export const LongText = (args) => {
	const addHeaderComponents = args['add headerComponents'];
	const input = args['Input Mode'] ? <Input placeholder={args['placeholder']} dismissOnEnter={args['Input dismissOnEnter']} /> : null;
	return (
		<Fragment>
			<Header
				headerInput={input}
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

boolean('add headerComponents', LongText, Config);
boolean('Input dismissOnEnter', LongText, Config, true);
boolean('Input Mode', LongText, Config, true);
select('marqueeOn', LongText, prop.marqueeOn, Config);
text('placeholder', LongText, Config, inputData.longTitle);
text('subTitleBelow', LongText, Config, inputData.longSubTitleBelow);
text('title', LongText, Config, inputData.longTitle);
text('titleBelow', LongText, Config, inputData.longTitleBelow);

LongText.storyName = 'long text';
