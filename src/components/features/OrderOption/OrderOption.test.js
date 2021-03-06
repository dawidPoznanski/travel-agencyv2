import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from "react-datepicker";

describe('Component OrderOption', () => {
    it('should render without crashing', () => {
        const component = shallow(<OrderOption name='Lorem ipsum' type='date' />);
        console.log(component.debug())
        expect(component).toBeTruthy();
        // console.log(component.debug());
    });
    it('should return empty object if called without required props', () => {
        const component = shallow(<OrderOption />);
        expect(component).toEqual({});
    });
    it('should render correct title', () => {
        
        const expectedTitle = 'Testing Lorem Ipsum';
        const component = shallow(<OrderOption name={expectedTitle} type='text'/>);
        console.log(component.debug())
        const renderedTitle = component.find('.title').text();
        
        expect(renderedTitle).toEqual(expectedTitle);
    })
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;
    
    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption = {mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOptionLength = select.find('option[value=""]').length;
          expect(emptyOptionLength).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          console.log(renderedSubcomponent.debug())
        });
        break;
      }
      case 'icons': {
        it('contains divs with class icons', () => {
          const icons = renderedSubcomponent.find('.icons');
          expect(icons.length).toBe(1);

          const emptyOption = icons.find('Icon[name="times-circle"]').length;
          expect(emptyOption).toBe(1);

          const activeIcon = icons.find('Icon').not('[name="times-circle"]');
          expect(activeIcon.length).toBe(mockProps.values.length);
          expect(activeIcon.at(0).prop('name')).toBe(mockProps.values[0].icon);
          expect(activeIcon.at(1).prop('name')).toBe(mockProps.values[1].icon);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.icon').not('.iconActive').simulate('click');
          console.log(renderedSubcomponent.debug())
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'checkboxes': {
        it('should contains atribute value with the same value of tesValue', () => {
          const checkboxes = renderedSubcomponent.find('.checkboxes');
          expect(checkboxes.length).toBe(1);

          const valueComponent = checkboxes.find('input[type="checkbox"]');
          expect(valueComponent.length).toBe(mockProps.values.length);
          expect(valueComponent.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(valueComponent.at(1).prop('value')).toBe(mockProps.values[1].id);
          console.log(renderedSubcomponent.debug())
        });
        it('should run mockup function change to check chexbox', () => {
          renderedSubcomponent.find('input').not({checked: true}).simulate('change',  {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id] : [mockProps.currentValue, "xyz"]});
        });
        break;
      }
      case 'number': {
        it('contains input', () => {
          const numberComponent = renderedSubcomponent.find('.number');
          expect(numberComponent.length).toBe(1);
        
          const options = numberComponent.find('input[type="number"]');
          expect(options.length).toBe(mockPropsForType.number.currentValue)
          expect(options.prop('value')).toBe(mockPropsForType.number.currentValue);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber});
          console.log(renderedSubcomponent.debug())
        });
        break;
      }
      case 'text': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const textComponent = renderedSubcomponent.find('.number');
          expect(textComponent.length).toBe(1);
        
          const options = textComponent.find('input[type="text"]');
          console.log(options.debug())
          expect(options.length).toBe(1);
          expect(options.prop('value')).toBe(mockProps.currentValue);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'date': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const dateComponent = renderedSubcomponent.find(DatePicker);
          expect(dateComponent.length).toBe(1);
          expect(dateComponent.prop('selected')).toBe(mockProps.currentValue);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change',  testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}

