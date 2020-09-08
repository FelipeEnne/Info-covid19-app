import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavbarApp from '../../components/NavbarApp';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const component = shallow(<NavbarApp />);
  return component;
};

describe('NavbarApp Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it('should have 1 div', () => {
    expect(component.find('div').length).toBe(1);
  });

  it('should have 1 h2', () => {
    expect(component.find('h2').length).toBe(1);
  });

  it('should have 3 h3', () => {
    expect(component.find('h3').length).toBe(3);
  });
});
