import React from 'react';
import * as d3 from 'd3';
import parties from '../assets/parties';

export default class ElectionGraph extends React.Component {
  static defaultProps = {
    margin: { left: 20, top: 20, right: 20, bottom: 20 },
  };

  componentDidMount() {
    const { x, y } = this.scale();
    d3.select(this.refs.axisX).call(d3.axisBottom(x));
    d3.select(this.refs.axisY).call(d3.axisLeft(y));

    const bars = d3
      .select(this.refs.graph)
      .selectAll('rect')
      .data(this.partyVotes())
      .enter();

    bars
      .append('rect')
      .attr('class', 'ElectionGraph__bar')
      .attr('x', p => x(p.acronym))
      .attr('y', p => y(p.votes))
      .attr('width', x.bandwidth())
      .attr('height', p => this.innerHeight() - y(p.votes))
      .style('fill', p => p.color);

    bars
      .append('text')
      .attr('class', 'ElectionGraph__label')
      .attr('x', p => x(p.acronym))
      .attr('y', p => y(p.votes))
      .attr('dx', () => (x.bandwidth() + 3) / 2)
      .attr('dy', '-0.15em')
      .text(p => d3.format('.01%')(p.votes / 100));
  }

  componentDidUpdate() {
    const { y } = this.scale();
    const graph = d3.select(this.refs.graph);
    const votes = this.partyVotes();

    graph
      .selectAll('rect')
      .data(votes)
      .transition()
      .duration(750)
      .attr('y', p => y(p.votes))
      .attr('height', p => this.innerHeight() - y(p.votes));

    graph
      .selectAll('.ElectionGraph__label')
      .data(votes)
      .transition()
      .duration(750)
      .attr('y', p => y(p.votes))
      .tween('text', function(p) {
        const i = d3.interpolateNumber(parseFloat(this.textContent), p.votes);
        const format = t => d3.format('0.01%')(i(t).toFixed(1) / 100);
        return t => (this.textContent = format(t));
      });
  }

  scale() {
    return {
      x: d3
        .scaleBand()
        .domain(parties.map(p => p.acronym))
        .padding(0.3)
        .range([0, this.innerWidth()]),
      y: d3
        .scaleLinear()
        .domain([0, 65])
        .range([this.innerHeight(), 0]),
    };
  }

  innerWidth() {
    const { width, margin: { left, right } } = this.props;
    return width - left - right;
  }

  innerHeight() {
    const { height, margin: { top, bottom } } = this.props;
    return height - top - bottom;
  }

  partyVotes() {
    // Associate each voting share with the corresponding party
    return this.props.votesByParty.map((votes, i) => ({
      ...parties[i],
      votes,
    }));
  }

  render() {
    const { width, height, margin, region, year } = this.props;

    return (
      <svg
        className="ElectionGraph"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        ref="svg"
      >
        <g
          className="ElectionGraph__graph"
          ref="graph"
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <text
            className="ElectionGraph__title"
            transform={`translate(${this.innerWidth() / 2}, 10)`}
          >
            Vote statistics in {region}, year {year}
          </text>
          <g
            className="ElectionGraph__axis ElectionGraph__axis--x"
            transform={`translate(0, ${this.innerHeight()})`}
            ref="axisX"
          />
          <g
            className="ElectionGraph__axis ElectionGraph__axis--y"
            ref="axisY"
          />
        </g>
      </svg>
    );
  }
}
