import React from 'react';
import ReactDOM from 'react-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { electionYears } from './constants';
import { fetchElectionStatsForYear, fetchTopojson } from './actions';
import './assets/style.css';
import * as models from './models';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

const store = init({ models });

// Retrieve the topography for the country
store.dispatch(fetchTopojson('sweden'));

// Retrieve the CSV file for each registered election year
electionYears.map(fetchElectionStatsForYear).forEach(store.dispatch);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
