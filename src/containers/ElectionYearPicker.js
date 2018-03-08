import { connect } from 'react-redux';
import { electionYears } from '../constants';
import ArraySelector from '../components/ArraySelector';

const mapStateToProps = ({ electionYear }) => ({
  selectedValue: electionYear,
  size: electionYears.length,
});

const mapDispatchToProps = ({ electionYear: { selectYear } }) => ({
  selectIndex: i => selectYear(electionYears[i]),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArraySelector);
