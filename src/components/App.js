import React from 'react';
import TopojsonMap from '../containers/TopojsonMap';
import ElectionYearPicker from '../containers/ElectionYearPicker';

export default () => (
  <div className="App">
    <TopojsonMap />
    <div className="ElectionYear">
      <p className="ElectionYear__title">Select year</p>
      <hr />
      <ElectionYearPicker />
    </div>
  </div>
);