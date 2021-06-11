import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers/reducer.index';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<App />,
	</Provider>,
	document.getElementById('root')
);
