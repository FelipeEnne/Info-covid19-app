import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchCountry } from '../../containers/SearchCountry';

const createProps = overrides => ({
  loading: false,
  resp: [{ Country: 'Brazil' }],
  date: '2020-06-08T18:20:35Z',
  country: [{}],
  fetchSummary: vi.fn(),
  selectCountry: vi.fn(),
  ...overrides,
});

describe('SearchCountry', () => {
  it('does not select an undefined country when there is no match', () => {
    const props = createProps();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<SearchCountry {...props} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Atlantis' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(props.selectCountry).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith('Your country was not found');
    consoleError.mockRestore();
  });

  it('selects a matching country', () => {
    const props = createProps();
    render(<SearchCountry {...props} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'brazil' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(props.selectCountry).toHaveBeenCalledWith({ Country: 'Brazil' });
  });
});
