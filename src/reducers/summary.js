
const initialState = {
  pending: false,
  categories: [],
  error: '',
};

const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_LOADING':
      return {
        ...state,
        pending: true,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        pending: false,
        resp: action.resp,
      };
    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default summaryReducer;
