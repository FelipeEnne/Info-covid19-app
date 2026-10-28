import filterInfoReducer from '../../reducers/filterInfoReducer';

describe('filterInfoReducer', () => {
  it('starts with the total confirmed filter', () => {
    expect(filterInfoReducer(undefined, { type: '@@INIT' })).toEqual({
      filter: 'Total Confirmed',
    });
  });

  it('updates the selected metric without mutating prior state', () => {
    const previousState = { filter: 'Total Confirmed' };
    const nextState = filterInfoReducer(previousState, {
      type: 'UPDATE_FILTER',
      filter: 'Total Deaths',
    });

    expect(nextState).toEqual({ filter: 'Total Deaths' });
    expect(previousState).toEqual({ filter: 'Total Confirmed' });
  });

  it('preserves state for unrelated actions', () => {
    const state = { filter: 'New Deaths' };

    expect(filterInfoReducer(state, { type: 'UNRELATED' })).toBe(state);
  });
});
