import React from 'react';
import styles from './OrderOption.module.scss';
import Icon from '../../common/Icon/Icon';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => (
    <div className={styles.icons}>
        {required ? '' : (
        <div onClick={() => setOptionValue('')}>
            <Icon name={'times-circle'}/>
        </div>
        )}
        {values.map(value => (
        <div className={styles.icon + ' ' + (currentValue === value.id ? styles.iconActive : '')} key={value.id} onClick={() => setOptionValue(value.id)}>
            <Icon name={value.icon}/>
            <span>
                {value.name}
            </span>
            <span>({formatPrice(value.price)})</span>
        </div>
        ))}
    </div>
  );

export default OrderOptionIcons;