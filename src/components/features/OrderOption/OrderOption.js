import React from 'react';
import styles from './OrderOption.module.scss';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionIcons from './OrderOptionIcons';


const optionTypes = {
    dropdown: OrderOptionDropdown,
    icons: OrderOptionIcons,
    checkboxes: OrderOptionCheckboxes,
    number: OrderOptionNumber,
  };
  const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
    const OptionComponent = optionTypes[type];
    if(!OptionComponent){
      return null;
    } else {
      return (
        <div className={styles.component}>
          <h3 className={styles.title}>{name}</h3>
          <OptionComponent
            {...otherProps}
            setOptionValue={value => setOrderOption({[id]: value})}
          />
        </div>
      );
    }
  };



export default OrderOption;