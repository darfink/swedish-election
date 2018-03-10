import electionSummary from './assets/elections';

export const electionYears = Object.keys(electionSummary)
  .map(Number)
  .sort();

export const dataUrl = '/data';
