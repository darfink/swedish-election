import { connect } from 'react-redux';
import MunicipalityMap from '../components/MunicipalityMap';

const mapStateToProps = ({
  topology,
  municipality,
  electionStats,
  electionYear,
}) => ({
  currentMunicipality: municipality,
  municipalitiesAreas: topology,
  municipalitiesVotes: electionStats[electionYear],
});

const mapDispatchToProps = ({ municipality: { selectMunicipality } }) => ({
  selectMunicipality,
});

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalityMap);
