import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FilterMoreInfected from '../../components/FilterMoreInfected';
import FilterNewInfected from '../../components/FilterNewInfected';

describe('metric filters', () => {
  it('renders total metrics and reports the selected value', () => {
    const onChange = vi.fn();
    render(<FilterMoreInfected onChange={onChange} value="Total Confirmed" />);

    expect(screen.getByRole('option', { name: 'Total Deaths' })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Total Deaths' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders new metrics with the selected value', () => {
    render(<FilterNewInfected onChange={vi.fn()} value="New Recovered" />);

    expect(screen.getByRole('combobox')).toHaveValue('New Recovered');
    expect(screen.getByRole('option', { name: 'New Deaths' })).toBeInTheDocument();
  });
});
