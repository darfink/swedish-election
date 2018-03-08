import { electionYears } from '../constants';

export default {
  state: electionYears.slice(-1)[0],
  reducers: {
    selectYear: (state, year) => {
      console.assert(electionYears.includes(year));
      return year;
    },
  },
};
