import React from 'react';
import MunicipalityMapContainer from '../containers/MunicipalityMapContainer';
import ElectionYearPicker from '../containers/ElectionYearPicker';
import ElectionGraphContainer from '../containers/ElectionGraphContainer';

export default () => (
  <div className="App">
    <MunicipalityMapContainer width={560} height={500} />
    <div className="App__control">
      <p>Select year</p>
      <hr />
      <ElectionYearPicker />
    </div>
    <ElectionGraphContainer width={680} height={500} />
  </div>
);