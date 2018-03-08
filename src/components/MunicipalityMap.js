import React from 'react';
import classNames from 'classnames';
import * as d3 from 'd3';
import parties from '../assets/parties';
import { findMaxIndex } from '../util';

export default class MunicipalityMap extends React.Component {
  componentDidMount() {
    const svg = d3.select(this.refs.svg);
    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on('zoom', this.onMapZoom.bind(this));
    svg.call(zoom);
    svg.on('dblclick.zoom', null);
  }

  onMapZoom() {
    const g = d3.select(this.refs.g);
    g.attr('transform', d3.event.transform);
  }

  renderMunicipality(municipality) {
    const { election, selectedMunicipality, selectMunicipality } = this.props;

    const id = municipality.properties.KNKOD;
    const selected = selectedMunicipality === id;
    const majorityPartyColor = election
      ? parties[findMaxIndex(election[id])].color
      : '#ccc';

    return (
      <path
        key={id}
        d={d3.geoPath().projection(projection)(municipality)}
        className={classNames('municipality', { selected })}
        fill={majorityPartyColor}
        onClick={() => selectMunicipality(selected ? null : id)}
      />
    );
  }

  render() {
    const { municipalities } = this.props;

    return (
      <svg
        width={style.width}
        height={style.height}
        viewBox={`0 0 ${style.width} ${style.height}`}
        ref="svg"
      >
        <g className="municipalities" ref="g" stroke="#fff" strokeWidth="0.01">
          {municipalities.map(this.renderMunicipality.bind(this))}
        </g>
      </svg>
    );
  }
}

const style = { width: 560, height: 500 };

const projection = d3
  .geoMercator()
  .scale(945)
  .translate([style.width * -0.1, style.height * 3.2]);
