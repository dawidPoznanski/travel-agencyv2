
import {Row, Col} from 'react-flexbox-grid';
import React from 'react';
import PropTypes from 'prop-types';
// import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = props => {
console.log(props, 'abc')
  return(
  <Row>
    <Col xs={12}>
      <OrderSummary tripCost={props.tripCost} options = {props.options} />
    </Col>
  </Row>
 )
}

  OrderForm.propTypes = {
    tripCost: PropTypes.string,
    options: PropTypes.object,
  }

export default OrderForm;