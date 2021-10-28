import React from 'react';
import styles from './OrderOption.module.scss';
import PropTypes from 'prop-types';

function OrderOptions(props)  {
    return <div className={styles.component}>
        <h3 className={styles.title}>{props.price.name}</h3>
    </div>
}

OrderOptions.propTypes = {
    price: PropTypes.object,
}

export default OrderOptions;