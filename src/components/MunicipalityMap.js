import tippy from 'tippy.js';
import React from 'react';
import classNames from 'classnames';
import * as d3 from 'd3';
import { findMaxIndex } from '../util';
import parties from '../assets/parties';

export default class MunicipalityMap extends React.Component {
  componentDidMount() {
    const { map, svg } = this.refs;
    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on('zoom', () => map.setAttribute('transform', d3.event.transform));
    d3
      .select(svg)
      .call(zoom)
      .on('dblclick.zoom', null);
  }

  componentDidUpdate() {
    tippy('.MunicipalityMap__area');
  }

  projection() {
    const { width, height } = this.props;
    return d3
      .geoMercator()
      .scale(945)
      .translate([width * -0.1, height * 3.2]);
  }

  renderMunicipality(municipality) {
    const {
      currentMunicipality,
      municipalitiesVotes,
      selectMunicipality,
    } = this.props;

    const id = municipality.properties.KNKOD;
    const isSelected = currentMunicipality === id;
    const majorityPartyColor = municipalitiesVotes
      ? parties[findMaxIndex(municipalitiesVotes[id])].color
      : '#ccc';

    return (
      <g key={id}>
        <path
          d={d3.geoPath().projection(this.projection())(municipality)}
          className={classNames('MunicipalityMap__area', {
            'MunicipalityMap__area--selected': isSelected,
          })}
          fill={majorityPartyColor}
          title={municipality.properties.KNNAMN}
          onClick={() => selectMunicipality(isSelected ? null : id)}
        />
      </g>
    );
  }

  render() {
    const { municipalitiesAreas, width, height } = this.props;

    return (
      <svg
        className="MunicipalityMap"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        ref="svg"
      >
        <g ref="map" stroke="#fff" strokeWidth="0.01">
          {municipalitiesAreas.map(this.renderMunicipality.bind(this))}
        </g>
      </svg>
    );
  }
}
