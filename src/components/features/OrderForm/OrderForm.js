
import {Row, Col} from 'react-flexbox-grid';
import React from 'react';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
// import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';


const OrderForm = props => {
  return(
  <Row>
    {pricing.map((price) =>  
    <Col md={4} key={price.id}>
      <OrderOption {...price} currentValue={props.options[price.id]} setOrderOption={props.setOrderOption} />
    </Col>)}
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