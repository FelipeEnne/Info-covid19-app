import {
  capitalize,
  getTenArray,
  returnData,
  sortNewConfirmed,
  sortNewDeaths,
  sortNewRecovered,
  sortTotalConfirmed,
  sortTotalDeaths,
  sortTotalRecovered,
} from '../../helper/helpers';

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

  it.each([
    [sortTotalDeaths, 'TotalDeaths'],
    [sortTotalRecovered, 'TotalRecovered'],
    [sortNewConfirmed, 'NewConfirmed'],
    [sortNewRecovered, 'NewRecovered'],
  ])('sorts by %s without changing its input', (sort, metric) => {
    const countries = [{ [metric]: 4 }, { [metric]: 1 }];

    expect(sort(countries).map(country => country[metric])).toEqual([1, 4]);
    expect(countries.map(country => country[metric])).toEqual([4, 1]);
  });

  it('selects the ten highest entries in descending order', () => {
    const countries = Array.from({ length: 12 }, (_, index) => index);

    expect(getTenArray(countries, countries.length - 1)).toEqual([11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  });

  it('formats the date and capitalizes only the first character', () => {
    expect(returnData('2020-06-08T18:20:35Z')).toBe('2020-06-08');
    expect(capitalize('brazil')).toBe('Brazil');
    expect(capitalize(undefined)).toBe('');
  });
});
