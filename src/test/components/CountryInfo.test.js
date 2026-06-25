import React from 'react';
import { render } from '@testing-library/react';
import CountryInfo from '../../components/CountryInfo';

const value = {};

const setup = () => render(<CountryInfo value={value} />);

describe('CountryInfo Component', () => {
  let container;
  beforeEach(() => {
    ({ container } = setup());
  });

  it('should have 1 div', () => {
    expect(container.querySelectorAll('div')).toHaveLength(1);
  });

  it('should have 2 table', () => {
    expect(container.querySelectorAll('table')).toHaveLength(2);
  });

  it('should have 6 tr', () => {
    expect(container.querySelectorAll('th')).toHaveLength(6);
  });

  it('should have 6 td', () => {
    expect(container.querySelectorAll('td')).toHaveLength(6);
  });
});
