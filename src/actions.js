import { dataUrl } from './constants';

export const fetchTopojson = (name) => ({
  type: 'topology/fetchTopojson',
  payload: `${dataUrl}/${name}.topojson`,
});

export const fetchElectionStatsForYear = (year) => ({
  type: 'electionStats/fetchStatsForYear',
  payload: year,
});