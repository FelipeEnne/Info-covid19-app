export const getProductsError = state => state.error;
export const getProductsLoading = state => state.loading;
export const getProducts = state => state.resp;

export function numberFormat(i) {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(i);
}
