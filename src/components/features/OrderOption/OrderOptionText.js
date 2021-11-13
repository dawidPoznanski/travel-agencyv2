
import React from 'react';
import styles from './OrderOption.module.scss';

const OrderOptionText = ({currentValue, setOptionValue, price}) => (
    <div className={styles.number}>
        <input type='text' className={styles.inputSmall} value={currentValue} required onChange={event => setOptionValue(event.currentTarget.value)}/> {price}
    </div>
  );

export default OrderOptionText;