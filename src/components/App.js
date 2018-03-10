import React from 'react';
import MunicipalityMapContainer from '../containers/MunicipalityMapContainer';
import ElectionYearPicker from '../containers/ElectionYearPicker';

export default () => (
  <div className="App">
    <MunicipalityMapContainer width={560} height={500} />
    <div className="ElectionYear">
      <p className="ElectionYear__title">Select year</p>
      <hr />
      <ElectionYearPicker />
    </div>
  </div>
);