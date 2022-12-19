import kind from '@enact/core/kind';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import Icon from '@enact/moonstone/Icon';
import Item, {ItemBase} from '@enact/moonstone/Item';
import Marquee, {MarqueeController} from '@enact/moonstone/Marquee';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import Spottable from '@enact/spotlight/Spottable';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useState} from 'react';

Marquee.displayName = 'Marquee';

const SpottableMarquee = Spottable(Marquee);
const Controller = MarqueeController('div');
const SpottableDiv = MarqueeController({marqueeOnFocus: true}, Spottable('div'));

const LTR = [
	'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.',
	'Η γρήγορη καφέ αλεπού πήδηξε πάνω από το μεσημέρι. Το πουλί πετά σε φασολιών δύση του ηλίου.',
	'ਤੁਰੰਤ ਭੂਰਾ Fox ਆਲਸੀ ਕੁੱਤੇ ਨੂੰ ਵੱਧ ਗਈ. ਬੀਨ ਪੰਛੀ ਸੂਰਜ ਡੁੱਬਣ \'ਤੇ ਉਡਾਣ ਭਰਦੀ ਹੈ.',
	'速い茶色のキツネは、怠け者の犬を飛び越えた。豆の鳥は日没で飛ぶ。',
	'那只敏捷的棕色狐狸跃过那只懒狗。豆鸟飞日落。',
	'빠른 갈색 여우가 게으른 개를 뛰어 넘었다.콩 조류 일몰에 파리.'
];
const RTL = [
	'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקיעה.',
	'قفز الثعلب البني السريع فوق الكلب الكسول. الطيور تطير في الفول عند غروب الشمس.',
	'فوری بھوری لومڑی سست کتے پر چھلانگ لگا. بین پرندوں سوریاست میں پرواز.'
];

const texts = [
	'No marquee no marquee',
	'Ellipsis show before the initial start of the marquee. Ellipsis will not show on the subsequent starts.',
	'Second test to show that the Ellipsis show before the initial start of the marquee. Ellipsis will not show on the subsequent starts.'
];

const disabledDisclaimer = (disabled) => (disabled ? <p style={{fontSize: '70%', fontStyle: 'italic'}}><sup>*</sup>Marquee does not visually respond to <code>disabled</code> state.</p> : <p />);

const MarqueeI18nSamples = I18nContextDecorator({updateLocaleProp: 'updateLocale'}, kind({
	name: 'I18nPanel',

	handlers: {
		// eslint-disable-next-line enact/prop-types
		updateLocale: (ev, {updateLocale}) => updateLocale('ar-SA')
	},

	render: ({updateLocale}) => (
		<div>
			<Heading showLine>Remeasure marquee when locale change causes a font change with different metrics</Heading>
			<Button onClick={updateLocale}>Change locale and marquee stops</Button>
		</div>
	)
}));

const CustomItemBase = ({children, ...rest}) => (
	<div {...rest} style={{display: 'flex', width: 300, alignItems: 'center'}}>
		<Icon>flag</Icon>
		<Marquee id="marqueeText" style={{flex: 1, overflow: 'hidden'}}>{children}</Marquee>
		<Icon>trash</Icon>
	</div>
);

const CustomItem = Spottable(MarqueeController(
	{marqueeOnFocus: true},
	CustomItemBase
));

const MarqueeItem = Spottable(
	MarqueeController(
		{marqueeOnFocus: true},
		ItemBase
	)
);

const MarqueeWithShortContent = () => {
	const [long, setLong] = useState(false);
	const [node, setNode] = useState(null);
	const [scrollWidth, setScrollWidth] = useState(null);
	const [width, setWidth] = useState(null);

	useEffect(() => {
		setNode(document.querySelector('#marqueeText'));
		if (!node) {
			return;
		}
		if (node.scrollWidth !== scrollWidth) {
			setScrollWidth(node.scrollWidth);
			setWidth(node.getBoundingClientRect().width);
		}
	}, [node, scrollWidth]);

	const handleClick = useCallback(() => setLong(!long), [long]);

	return (
		<div>
			scrollWidth: {scrollWidth} width: {width}
			<CustomItem onClick={handleClick}>{long ? 'Very very very very very very very very very long text' : 'text'}</CustomItem>
		</div>
	);
};

const MarqueeWithContentChanged = () => {
	const [count, setCount] = useState(0);

	const handleClick = useCallback(() => {
		setCount((count + 1) % 3);
	}, [count]);

	return (
		<div>
			<ol>
				<li>Click once to show the ellipsis just before the text marquees the first time.</li>
				<li>Click a second time to show the ellipsis just before the text marquees the first time</li>
				<li>Click again to return to a short string without marquee.</li>
			</ol>
			<Button onClick={handleClick}>
				{'Click Me'}
			</Button>
			<Marquee marqueeOn={'render'} style={{width: '400px'}}>{texts[count]}</Marquee>
		</div>
	);
};

export default {
	title: 'Moonstone/Marquee',
	component: 'Marquee'
};

export const WithLTR = (args) => {
	const disabled = args['disabled'];
	return (
		<section>
			<Marquee
				disabled={disabled}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeOn={args['marqueeOn']}
				marqueeOnRenderDelay={args['marqueeOnRenderDelay']}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpeed={args['marqueeSpeed']}
				style={{width: ri.unit(399, 'rem')}}
			>
				{args['children']}
			</Marquee>
			{disabledDisclaimer(disabled)}
		</section>
	);
};

select('children', WithLTR, LTR, Marquee, LTR[0]);
boolean('disabled', WithLTR, Marquee, false);
select('forceDirection', WithLTR, ['', 'ltr', 'rtl'], Marquee, '');
boolean('marqueeDisabled', WithLTR, Marquee, false);
select('marqueeOn', WithLTR, ['hover', 'render'], Marquee, 'render');
number('marqueeOnRenderDelay', WithLTR, Marquee, 1000);
number('marqueeResetDelay', WithLTR, Marquee, 1000);
number('marqueeSpeed', WithLTR, Marquee, 60);

WithLTR.storyName = 'LTR';

export const WithRTL = (args) => {
	const disabled = args['disabled'];
	return (
		<section>
			<Marquee
				disabled={disabled}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeOn={args['marqueeOn']}
				marqueeOnRenderDelay={args['marqueeOnRenderDelay']}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpeed={args['marqueeSpeed']}
				style={{width: ri.unit(399, 'rem')}}
			>
				{args['children']}
			</Marquee>
			{disabledDisclaimer(disabled)}
		</section>
	);
};

select('children', WithRTL, RTL, Marquee, RTL[0]);
boolean('disabled', WithRTL, Marquee, false);
select('forceDirection', WithLTR, ['', 'ltr', 'rtl'], Marquee, '');
boolean('marqueeDisabled', WithRTL, Marquee, false);
select('marqueeOn', WithRTL, ['hover', 'render'], Marquee, 'render');
number('marqueeOnRenderDelay', WithRTL, Marquee, 1000);
number('marqueeResetDelay', WithRTL, Marquee, 1000);
number('marqueeSpeed', WithRTL, Marquee, 60);

WithRTL.storyName = 'RTL';

export const Synchronized = (args) => {
	const disabled = args['disabled'];
	return (
		<Controller style={{width: ri.unit(399, 'rem')}}>
			{LTR.map((children, index) => (
				<Marquee
					disabled={disabled}
					forceDirection={args['forceDirection']}
					key={index}
					marqueeDelay={args['marqueeDelay']}
					marqueeDisabled={args['marqueeDisabled']}
					marqueeOn={args['marqueeOn']}
					marqueeOnRenderDelay={args['marqueeOnRenderDelay']}
					marqueeResetDelay={args['marqueeResetDelay']}
					marqueeSpeed={args['marqueeSpeed']}
				>
					{children}
				</Marquee>
			))}
			{disabledDisclaimer(disabled)}
		</Controller>
	);
};

select('children', Synchronized, RTL, Marquee, RTL[0]);
boolean('disabled', Synchronized, Marquee, false);
select('forceDirection', WithLTR, ['', 'ltr', 'rtl'], Marquee, '');
boolean('marqueeDisabled', Synchronized, Marquee, false);
select('marqueeOn', Synchronized, ['hover', 'render'], Marquee, 'render');
number('marqueeOnRenderDelay', Synchronized, Marquee, 1000);
number('marqueeResetDelay', Synchronized, Marquee, 1000);
number('marqueeSpeed', Synchronized, Marquee, 60);

Synchronized.storyName = 'Synchronized';

export const OnFocus = () => {
	return (
		<div>
			<Item
				marqueeOn="focus"
				style={{width: ri.unit(399, 'rem')}}
			>
				{LTR[0]}
			</Item>
			<SpottableMarquee
				marqueeOn="focus"
				style={{width: ri.unit(399, 'rem')}}
			>
				{LTR[0]}
			</SpottableMarquee>
		</div>
	);
};

OnFocus.storyName = 'On Focus';
OnFocus.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const RestartMarqueeWhenMarqueeCompletes = () => (
	<SpottableDiv>
		<Marquee
			disabled={false}
			marqueeDelay={1000}
			marqueeDisabled={false}
			marqueeOn="focus"
			marqueeOnRenderDelay={1000}
			marqueeResetDelay={1000}
			marqueeSpeed={60}
			style={{width: ri.scaleToRem(399)}}
		>
			{'The quick brown fox.'}
		</Marquee>
		<Marquee
			disabled={false}
			marqueeDelay={1000}
			marqueeDisabled={false}
			marqueeOn="focus"
			marqueeOnRenderDelay={1000}
			marqueeResetDelay={1000}
			marqueeSpeed={60}
			style={{width: ri.scaleToRem(399)}}
		>
			{LTR[0]}
		</Marquee>
	</SpottableDiv>
);

RestartMarqueeWhenMarqueeCompletes.storyName = 'Restart Marquee when Marquee completes';
RestartMarqueeWhenMarqueeCompletes.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const I18N = () => <MarqueeI18nSamples />;

I18N.storyName = 'I18n';
I18N.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithShortContent = () => (
	<div>
		<MarqueeWithShortContent />
	</div>
);

WithShortContent.storyName = 'with Short Content';
WithShortContent.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithContentChanged = () => <MarqueeWithContentChanged />;

WithContentChanged.storyName = 'with Content Changed';
WithContentChanged.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithTextCentered = () => (
	<div>
		<Heading>Focus on below MarqueeController + Marquee center</Heading>
		<MarqueeItem style={{width: ri.scale(401), display: 'flex', flexDirection: 'column'}}>
			<div>Sample text</div>
			<div style={{width: '100%', flex: 1}}>
				<Marquee
					alignment="center"
					style={{width: '100%'}}
				>
					{'this is marquee text this is marquee text'}
				</Marquee>
			</div>
		</MarqueeItem>
		<br />
		<Heading>MarqueeController + Marquee not center</Heading>
		<MarqueeItem style={{width: ri.scale(401), display: 'flex', flexDirection: 'column', border: '1px solid yellow'}}>
			<div>Sample text</div>
			<div style={{width: '100%', flex: 1, textAlign: 'center'}}>
				<Marquee
					style={{width: '100%'}}
				>
					{'this is marquee text this is marquee text'}
				</Marquee>
			</div>
		</MarqueeItem>
	</div>
);

WithTextCentered.storyName = 'with Text Centered';
WithTextCentered.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
