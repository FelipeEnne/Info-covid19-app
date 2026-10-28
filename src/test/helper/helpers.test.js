import { sortTotalConfirmed, sortNewDeaths } from '../../helper/helpers';

describe('sorting helpers', () => {
  it('sorts without mutating the Redux state array', () => {
    const countries = [
      { Country: 'Brazil', TotalConfirmed: 10 },
      { Country: 'Canada', TotalConfirmed: 2 },
    ];

    const sorted = sortTotalConfirmed(countries);

    expect(sorted.map(country => country.Country)).toEqual(['Canada', 'Brazil']);
    expect(countries.map(country => country.Country)).toEqual(['Brazil', 'Canada']);
    expect(sorted).not.toBe(countries);
  });

  it('returns a sorted copy for each metric helper', () => {
    const countries = [
      { Country: 'Brazil', NewDeaths: 5 },
      { Country: 'Canada', NewDeaths: 1 },
    ];

    expect(sortNewDeaths(countries).map(country => country.Country)).toEqual(['Canada', 'Brazil']);
    expect(countries.map(country => country.Country)).toEqual(['Brazil', 'Canada']);
  });
});
