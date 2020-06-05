const fetchProductsLoading = () => ({
  type: 'FETCH_PRODUCTS_LOADING',
});

const fetchProductsSuccess = products => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  products,
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
