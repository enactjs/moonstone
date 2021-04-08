import Heading from '@enact/moonstone/Heading';
import Spinner from '@enact/moonstone/Spinner';

const SpinnerView = () => (
	<div>
		<Heading showLine>Spinner with Text</Heading>
		<Spinner>Loading...</Spinner>
	</div>
);

export default SpinnerView;
