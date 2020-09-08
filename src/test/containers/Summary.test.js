import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Summary from '../../containers/Summary';
import store from '../../reducers/index';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const component = shallow((<Provider store={store}><Summary /></Provider>));
  return component;
};

describe('Summary Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  it('should return empty', () => {
    expect(component.find('div').length).toBe(0);
  });
});
