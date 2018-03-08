import { connect } from 'react-redux';
import MunicipalityMap from '../components/MunicipalityMap';

const mapStateToProps = ({
  topology,
  municipality,
  electionData,
  electionYear,
}) => ({
  election: electionData[electionYear],
  selectedMunicipality: municipality,
  municipalities: topology,
});

const mapDispatchToProps = ({ municipality: { selectMunicipality } }) => ({
  selectMunicipality,
});

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalityMap);
