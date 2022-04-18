import Heading from '@enact/moonstone/Heading';
import IconButton from '@enact/moonstone/IconButton';
import ProgressBar from '@enact/moonstone/ProgressBar';
import {useCallback, useState} from 'react';

const ProgressBarView = () => {
	const [progressVal, setProgressVal] = useState(0.3);

	const onInc = useCallback(() => setProgressVal((val) => setProgressVal(Math.min((val + 0.1).toFixed(1), 1))), []);

	const onDec = useCallback(() => setProgressVal((val) => setProgressVal(Math.max((val - 0.1).toFixed(1), 0))), []);

	let a11yValueText;

	if (progressVal === 0.5) {
		a11yValueText = '50% progressing';
	} else if (progressVal === 1) {
		a11yValueText = 'Completed';
	}

	return (
		<div>
			<Heading showLine>Default</Heading>
			<ProgressBar aria-live="assertive" aria-label={a11yValueText} progress={progressVal} />
			<br />
			<IconButton size="small" aria-label="Increase" onClick={onInc}>plus</IconButton>
			<IconButton size="small" aria-label="Decrease" onClick={onDec}>minus</IconButton>
		</div>
	);
};

export default ProgressBarView;
