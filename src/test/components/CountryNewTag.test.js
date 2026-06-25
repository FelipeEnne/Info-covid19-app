import React from 'react';
import { render } from '@testing-library/react';
import CountryNewTag from '../../components/CountryNewTag';

const value = {};

const setup = () => render(<CountryNewTag value={value} />);

describe('CountryNewTag Component', () => {
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
