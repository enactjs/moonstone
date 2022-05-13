import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './App';
import configureStore from './store';

const store = configureStore();

const appElement = (
	<Provider store={store}>
		<App />
	</Provider>
);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(appElement);
}

export default appElement;
