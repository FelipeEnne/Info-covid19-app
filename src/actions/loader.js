const fetchProductsLoading = () => ({
  type: 'FETCH_PRODUCTS_LOADING',
});

const fetchProductsSuccess = resp => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  resp,
});

const fetchProductsError = error => ({
  type: 'FETCH_PRODUCTS_ERROR',
  error,
});


export {
  fetchProductsError,
  fetchProductsLoading,
  fetchProductsSuccess,
};
