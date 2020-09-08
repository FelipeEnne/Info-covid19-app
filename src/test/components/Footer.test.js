import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FooterApp from '../../components/FooterApp';

Enzyme.configure({ adapter: new Adapter() });
const value = 'string';

const setup = () => {
  const component = shallow(<FooterApp value={value} />);
  return component;
};

describe('FooterApp Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it('should have 1 div', () => {
    expect(component.find('div').length).toBe(1);
  });

  it('should have 1 h5', () => {
    expect(component.find('h5').length).toBe(1);
  });

  it('should have 1 p', () => {
    expect(component.find('p').length).toBe(1);
  });
});
