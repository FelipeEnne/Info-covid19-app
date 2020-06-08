import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CountryTag from '../../containers/CountriesCases/CountryTag';

Enzyme.configure({ adapter: new Adapter() });
const value = {};

const setup = () => {
  const component = shallow(<CountryTag value={value} />);
  return component;
};

describe('CountryTag Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it('should have 1 tbody', () => {
    expect(component.find('tbody').length).toBe(1);
  });

  it('should have 1 tr', () => {
    expect(component.find('tr').length).toBe(1);
  });

  it('should have 4 td', () => {
    expect(component.find('td').length).toBe(4);
  });
});
