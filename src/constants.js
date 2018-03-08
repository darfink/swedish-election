import electionSummary from './assets/summary';

export const electionYears = Object.keys(electionSummary)
  .map(Number)
  .sort();

export const dataUrl = '/data';
