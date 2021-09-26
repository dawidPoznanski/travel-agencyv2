import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase} from '../../../redux/filtersRedux';
import { changeDuration, changeTag} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeTag: tag => dispatch(changeTag(tag)),
  changeDuration: (type, value) => dispatch(changeDuration(type, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
