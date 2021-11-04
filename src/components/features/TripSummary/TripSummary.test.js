import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
    it('should generate correct link', () => {
        const expectedLink = '/trip/abc';
        const component = shallow(<TripSummary id='abc' image='' name='' cost='' days={1} />);
        const renderLink = component.find('.link').prop('to');
       
        expect(component).toBeTruthy();
        expect(renderLink).toEqual(expectedLink);
    })
    it('should image has correct src and alt', () => {
        const expectSrc = 'image.jpg';
        const expectAlt = 'description';
        const component = shallow(<TripSummary id='abc' image={expectSrc} name={expectAlt}  cost='' days={1} />);

        expect(component.find('img').prop('src')).toEqual(expectSrc);
        expect(component.find('img').prop('alt')).toEqual(expectAlt);
    });

    it('should render correct props name cost and day', () => {
        const expectName = 'Lorem';
        const expectCost = 'ipsum';
        const expectDays = 7;

        const component = shallow(<TripSummary id='abc' image='' name={expectName} cost={expectCost} days={expectDays} />);

        const renderedTitle = component.find('.title').text();
        expect(renderedTitle).toEqual(expectName);
        const renderedCost = component.find('.cost').text();
        expect(renderedCost).toEqual('from ' + expectCost);
        const renderedDays = component.find('.days').text();
        expect(renderedDays).toEqual(expectDays + ' days');
    });
    it('should throw error without required props', () => {
        expect(() => shallow(<TripSummary />)).toThrow();
    })
})