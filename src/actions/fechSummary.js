import {
  fetchProductsError,
  fetchProductsLoading,
  fetchProductsSuccess,
} from './loader';
import { isValidSummary } from '../helper/validation';

function fetchSummary() {
  return dispatch => {
    dispatch(fetchProductsLoading());

    return fetch('https://api.covid19api.com/summary')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Summary request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(summary => {
        if (!isValidSummary(summary)) {
          throw new Error('Summary response has an invalid format');
        }
        dispatch(fetchProductsSuccess(summary));
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export default fetchSummary;
