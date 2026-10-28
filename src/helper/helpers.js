export const getProductsLoading = state => state.loading;
export const getProducts = state => state.resp;

const TOP_COUNTRIES_COUNT = 10;
const DATE_LENGTH = 10;

function sortByMetric(array, metric) {
  return [...array].sort((a, b) => a[metric] - b[metric]);
}

export function numberFormat(i) {
  return new Intl.NumberFormat().format(i);
}

export function sortTotalConfirmed(array) {
  return sortByMetric(array, 'TotalConfirmed');
}

export function sortTotalDeaths(array) {
  return sortByMetric(array, 'TotalDeaths');
}

export function sortTotalRecovered(array) {
  return sortByMetric(array, 'TotalRecovered');
}

export function sortNewConfirmed(array) {
  return sortByMetric(array, 'NewConfirmed');
}

export function sortNewDeaths(array) {
  return sortByMetric(array, 'NewDeaths');
}

export function sortNewRecovered(array) {
  return sortByMetric(array, 'NewRecovered');
}

export function getTenArray(array, len) {
  const arr = [];
  let count = len;
  for (let i = 0; i < TOP_COUNTRIES_COUNT; i += 1) {
    arr.push(array[count]);
    count -= 1;
  }
  return arr;
}

export function returnData(date) {
  const result = date.slice(0, DATE_LENGTH);
  return result;
}

export const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
