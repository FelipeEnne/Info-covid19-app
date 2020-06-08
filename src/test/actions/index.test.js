import selectCountry from '../../actions/selectCountry';

describe('Select Country', () => {
  it('should return a country', () => {
    const country = 'Brazil';
    const expectedAction = {
      type: 'SELECT-COUNTRY',
      country,
    };
    expect(selectCountry(country)).toEqual(expectedAction);
  });
});
