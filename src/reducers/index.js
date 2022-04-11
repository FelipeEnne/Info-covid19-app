import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import summaryReducer from './summary';
import selectCountry from './selectCountry';
import filterInfoReducer from './filterInfoReducer';

const allReducer = combineReducers({
  summary: summaryReducer,
  country: selectCountry,
  filter: filterInfoReducer,
});

const middlewares = [thunk];

const store = createStore(allReducer, applyMiddleware(...middlewares));

export default store;
