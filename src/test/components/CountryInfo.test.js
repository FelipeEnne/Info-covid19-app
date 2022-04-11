import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CountryInfo from '../../components/CountryInfo';

Enzyme.configure({ adapter: new Adapter() });
const value = {};

const setup = () => {
  const component = shallow(<CountryInfo value={value} />);
  return component;
};

describe('CountryInfo Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it('should have 1 div', () => {
    expect(component.find('div').length).toBe(1);
  });

  it('should have 2 table', () => {
    expect(component.find('table').length).toBe(2);
  });

  it('should have 6 tr', () => {
    expect(component.find('th').length).toBe(6);
  });

  it('should have 6 td', () => {
    expect(component.find('td').length).toBe(6);
  });
});
