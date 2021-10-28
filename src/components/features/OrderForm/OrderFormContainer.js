import {connect} from 'react-redux';
import { getOrderOptions } from '../../../redux/orderRedux';
import OrderForm from './OrderForm';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
});

// const mapDispatchToProps = dispatch => ({
//   changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
//   // TODO - add more dispatchers for other filters
//   changeTag: tag => dispatch(changeTag(tag)),
//   changeDuration: (type, value) => dispatch(changeDuration(type, value)),
// });

export default connect(mapStateToProps)(OrderForm);
