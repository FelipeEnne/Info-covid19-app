export const getProductsError = state => state.error;
export const getProductsLoading = state => state.loading;
export const getProducts = state => state.resp;

export function numberFormat(i) {
  return new Intl.NumberFormat().format(i);
}

export function sortTotalConfirmed(array) {
  array.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
}

export function sortNewConfirmed(array) {
  array.sort((a, b) => a.NewConfirmed - b.NewConfirmed);
}

export function getTenArray(array, len) {
  const arr = [];
  let count = len;
  for (let i = 0; i < 10; i += 1) {
    arr.push(array[count]);
    count -= 1;
  }
  return arr;
}

export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function returnData(date) {
  const result = date.slice(0, 10);
  return result;
}
