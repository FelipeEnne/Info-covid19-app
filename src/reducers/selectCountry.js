const selectCountry = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT-COUNTRY':
      return {
        ...state,
        country: action.country,
      };
    default:
      return state;
  }
};

export default selectCountry;
