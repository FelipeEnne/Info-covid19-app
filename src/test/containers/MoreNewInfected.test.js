import React from 'react';
import { render } from '@testing-library/react';
import { MoreNewInfected } from '../../containers/MoreNewInfected';

it('shows the loading state when there are no country rows', () => {
  const { container } = render(
    <MoreNewInfected
      loading={false}
      resp={[]}
      date="2020-06-08T18:20:35Z"
      fetchSummary={vi.fn()}
      filter="New Confirmed"
      addFilter={vi.fn()}
    />,
  );

  expect(container.querySelector('.spinner-border')).toBeInTheDocument();
});
