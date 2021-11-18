import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
    title: '.title',
    descr: '.promoDescription',
  };

const mockProps = {
    title: 'Happy Hours',
    promoDescription: 'Promotion',
}

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
describe('Component HappyHourAd with mocked Date', () => {
   
    // switch class Date
    // it('should show correct at 11:57:58', () => {
    //     global.Date = mockDate('2019-05-14T11:57:58.135Z');
      
    //     const component = shallow(<HappyHourAd {...mockProps} />);
    //     const renderedTime = component.find(select.descr).text();
    //     expect(renderedTime).toEqual('122');
      
    //     global.Date = trueDate;
    //   });
    const checkDescriptionAtTime = (time, expectedDescription) => {
        it(`should show correct at ${time}`, () => {
          global.Date = mockDate(`2019-05-14T${time}.135Z`);
      
          const component = shallow(<HappyHourAd {...mockProps} />);
          const renderedTime = component.find(select.descr).text();
          expect(renderedTime).toEqual(expectedDescription);
      
          global.Date = trueDate;
        });
      };
      const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
        it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    
          jest.useFakeTimers();
    
          global.Date = mockDate(`2021-09-18T${time}.135Z`);
          const component = shallow(<HappyHourAd {...mockProps} />);
          const newTime = new Date();
          newTime.setSeconds(newTime.getSeconds() + delaySeconds);
          global.Date = mockDate(newTime.getTime());
    
          jest.advanceTimersByTime(delaySeconds * 1000);
    
          const renderTime = component.find(select.descr).text();
          expect(renderTime).toEqual(expectedDescription);
    
          global.Date = trueDate;
    
          jest.useRealTimers();
        });
      };
      
      describe('Component HappyHourAd with mocked Date', () => {
        checkDescriptionAtTime('11:57:58', '122');
        checkDescriptionAtTime('11:59:59', '1');
        checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
      });

      describe('Component HappyHourAd with mocked Date and delay', () => {
        checkDescriptionAfterTime('11:57:58', 2, '120');
        checkDescriptionAfterTime('11:59:58', 1, '1');
        checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
      });

      describe('Component HappyHourAd with mocked Date', () => {
        checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
        checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
        checkDescriptionAtTime('12:30:43', mockProps.promoDescription);
      });

      describe('Component HappyHourAd with mocked Date and delay', () => {
        checkDescriptionAfterTime('12:57:58', 2, mockProps.promoDescription);
        checkDescriptionAfterTime('11:59:59', 1, mockProps.promoDescription);
        checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
      });
});

