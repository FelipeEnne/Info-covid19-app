import {
  fetchProductsError,
  fetchProductsLoading,
  fetchProductsSuccess,
} from './loader';

function fetchSummary() {
  return dispatch => {
    dispatch(fetchProductsLoading());

    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(res => {
        dispatch(fetchProductsSuccess(res));
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export default fetchSummary;
