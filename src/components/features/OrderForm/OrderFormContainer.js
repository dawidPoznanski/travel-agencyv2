import {connect} from 'react-redux';
import { getOrderOptions } from '../../../redux/orderRedux';
import { setOrderOption } from '../../../redux/orderRedux';
import OrderForm from './OrderForm';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
});

const mapDispatchToProps = dispatch => ({
  setOrderOption: option => dispatch(setOrderOption(option)),
  // TODO - add more dispatchers for other filters
//   changeTag: tag => dispatch(changeTag(tag)),
//   changeDuration: (type, value) => dispatch(changeDuration(type, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
