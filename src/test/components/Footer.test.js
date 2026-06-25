import React from 'react';
import { render } from '@testing-library/react';
import FooterApp from '../../components/FooterApp';

const value = 'string';

const setup = () => render(<FooterApp value={value} />);

describe('FooterApp Component', () => {
  let container;
  beforeEach(() => {
    ({ container } = setup());
  });

  it('should have 1 div', () => {
    expect(container.querySelectorAll('div')).toHaveLength(1);
  });

  it('should have 1 h5', () => {
    expect(container.querySelectorAll('h5')).toHaveLength(1);
  });

  it('should have 1 p', () => {
    expect(container.querySelectorAll('p')).toHaveLength(1);
  });
});
