import React from 'react';
import ReactDOM from 'react-dom';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import './assets/style.css';
import * as models from './models';
import { electionYears, dataUrl } from './constants';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

const store = init({ models });

store.dispatch({
  type: 'topology/fetchTopojson',
  payload: `${dataUrl}/sweden.topojson`,
});

electionYears.forEach(payload =>
  store.dispatch({
    type: 'electionData/fetchStatsForYear',
    payload,
  }),
);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
