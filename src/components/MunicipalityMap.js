import tippy from 'tippy.js';
import React from 'react';
import classNames from 'classnames';
import * as d3 from 'd3';
import { findMaxIndex } from '../util';
import parties from '../assets/parties';

export default class MunicipalityMap extends React.Component {
  constructor(props) {
    super(props);
    this.projection = d3
      .geoMercator()
      .scale(945)
      .translate([props.width * -0.1, props.height * 3.2]);
  }

  componentDidMount() {
    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on('zoom', () =>
        this.refs.g.setAttribute('transform', d3.event.transform),
      );
    d3
      .select(this.refs.svg)
      .call(zoom)
      .on('dblclick.zoom', null);
  }

  componentDidUpdate() {
    tippy('.MunicipalityMap__area');
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
          d={d3.geoPath().projection(this.projection)(municipality)}
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
        <g ref="g" stroke="#fff" strokeWidth="0.01">
          {municipalitiesAreas.map(this.renderMunicipality.bind(this))}
        </g>
      </svg>
    );
  }
}
