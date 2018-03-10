import { connect } from 'react-redux';
import municipalities from '../assets/municipalities';
import electionSummary from '../assets/elections';
import ElectionGraph from '../components/ElectionGraph';

const mapStateToProps = ({ municipality, electionStats, electionYear }) => ({
  votesByParty:
    electionStats && municipality
      ? electionStats[electionYear][municipality]
      : electionSummary[electionYear],
  region: municipality ? municipalities[municipality] : 'Sverige',
  year: electionYear,
});

export default connect(mapStateToProps)(ElectionGraph);
