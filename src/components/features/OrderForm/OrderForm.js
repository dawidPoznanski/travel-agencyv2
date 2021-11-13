
import {Row, Col} from 'react-flexbox-grid';
import React from 'react';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
// import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import settings from '../../../data/settings';
import { formatPrice} from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';




const sendOrder = (options, tripCost, country, tripId, name) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    name,
    tripId,
    country,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};


const OrderForm = ({tripCost, tripId, country, options, name, setOrderOption}) => {
  return(
      <Row>
        {pricing.map((price) =>  
        <Col md={4} key={price.id}>
          <OrderOption {...price} currentValue={options[price.id]} setOrderOption={setOrderOption} />
        </Col>)}
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options = {options} />
        </Col>
        <Button onClick={() => sendOrder(tripId, name, country, options, tripCost)}>Order now!</Button>
      </Row>
 ) 
}


  OrderForm.propTypes = {
    tripCost: PropTypes.string,
    options: PropTypes.object,
    tripId: PropTypes.string,
    name: PropTypes.string,
    country: PropTypes.object,
    setOrderOption: PropTypes.func
  }

export default OrderForm;