import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Summary from '../../containers/Summary';
import store from '../../reducers/index';

const setup = () => render(
  <Provider store={store}>
    <Summary />
  </Provider>,
);

describe('Summary Component', () => {
  let container;
  beforeEach(() => {
    ({ container } = setup());
  });

  it('should show loading spinner while fetching', () => {
    expect(container.querySelector('.spinner-border')).toBeInTheDocument();
  });
});
