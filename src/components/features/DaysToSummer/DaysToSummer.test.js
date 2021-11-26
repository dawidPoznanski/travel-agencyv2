import React from 'react';
import { shallow } from 'enzyme';
import DaysToSummer from './DaysToSummer';

describe('Component DaysToSummer', () => {
    // it('should render without crash', () =>{
    //     const component = shallow(<DaysToSummer />)
    //     expect(component).toBeTruthy();
    // })
    // it('should render countdown component', () => {
    //     const component = shallow(<DaysToSummer />)
    //     expect(component.exists('.CountDays')).toEqual(true);
    // })
})

const trueDate = Date;
const mockDate = customDate => class extends Date {
    constructor(...args) {
      if(args.length){
        super(...args);
      } else {
        super(customDate)
      }
      return this;
    }
    // Date.now() timestamp
    static now(){
        return (new Date(customDate)).getTime();
      }
    
};

describe('Component DaysToSummer with mocked Date', () => {
    const checkDescriptionWithDays = (date, expectedDescription) => {
        it.only(`should show correct at ${date}`, () => {
          global.Date = mockDate(`${date}T23:59:59.135Z`);
          const component = shallow(<DaysToSummer  />);
          // console.log(component.debug(), 'debógowanie')
          const renderedTime = component.find('.CountDays').text();
          expect(renderedTime).toEqual(expectedDescription);
      
          global.Date = trueDate;
        });
      };
      describe('Component DaysToSummer with mocked Date', () => {
          checkDescriptionWithDays('2021-06-20', '1 day to summer!');
          checkDescriptionWithDays('2021-06-19', '2 days to summer!');
          checkDescriptionWithDays('2029-01-01', '171 days to summer!');
          checkDescriptionWithDays('2131-12-01', '203 days to summer!');
          checkDescriptionWithDays('2131-12-28', '176 days to summer!');
          checkDescriptionWithDays('2021-06-30', ''); //-9
          checkDescriptionWithDays('2021-07-01', ''); // -10
          checkDescriptionWithDays('2021-09-23', '');
      })
})