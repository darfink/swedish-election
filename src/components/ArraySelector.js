import React from 'react';

export default ({ size, selectedValue, selectIndex }) => (
  <form>
    <input
      type="range"
      min={0}
      max={size - 1}
      step={1}
      onInput={event => selectIndex(+event.target.value)}
    />
    <br />
    <output>{selectedValue}</output>
  </form>
);
