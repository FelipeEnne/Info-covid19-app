import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavbarApp from '../../components/NavbarApp';

const setup = () => render(
  <MemoryRouter>
    <NavbarApp />
  </MemoryRouter>,
);

describe('NavbarApp Component', () => {
  let container;
  beforeEach(() => {
    ({ container } = setup());
  });

  it('should have 1 div', () => {
    expect(container.querySelectorAll('div')).toHaveLength(1);
  });

  it('should have 1 h2', () => {
    expect(container.querySelectorAll('h2')).toHaveLength(1);
  });

  it('should have 3 h3', () => {
    expect(container.querySelectorAll('h3')).toHaveLength(3);
  });
});
