import React from 'react';
import { render } from '@testing-library/react';
import CountryTag from '../../components/CountryTag';

const value = {};

const setup = () => render(<CountryTag value={value} />);

describe('CountryTag Component', () => {
  let container;
  beforeEach(() => {
    ({ container } = setup());
  });

  it('should have 1 tbody', () => {
    expect(container.querySelectorAll('tbody')).toHaveLength(1);
  });

  it('should have 1 tr', () => {
    expect(container.querySelectorAll('tr')).toHaveLength(1);
  });

  it('should have 4 td', () => {
    expect(container.querySelectorAll('td')).toHaveLength(4);
  });
});
