import axios from 'axios';
import * as R from 'ramda';
import * as d3 from 'd3';
import parties from '../assets/parties';
import { dataUrl } from '../constants';

const transformMunicipality = R.compose(
  R.map(([, , percent]) => +percent),
  R.slice(0, parties.length),
);

const transformData = R.compose(
  R.map(transformMunicipality),
  R.groupBy(([region]) => region.split(' ')[0]),
  d3.csvParseRows,
);

export default {
  state: {},
  reducers: {
    addStatsForYear(state, payload) {
      return { ...state, [payload.year]: transformData(payload.csv) };
    },
  },
  effects: {
    async fetchStatsForYear(year) {
      let csv = (await axios.get(`${dataUrl}/election/${year}.csv`)).data;
      this.addStatsForYear({ year, csv });
    },
  },
};
