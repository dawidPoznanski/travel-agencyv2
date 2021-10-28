import styles from './OrderSummary.module.scss';
import React from 'react';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderSummary = ({tripCost, options}) => {
  const totalPrice = formatPrice(calculateTotal(tripCost, options));
  return <h2 className={styles.component}>Total: <strong>{totalPrice}</strong></h2>;
};
OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};
export default OrderSummary;

