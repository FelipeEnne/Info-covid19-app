import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import summaryReducer from './summary';
import selectCountry from './selectCountry';

const allReducer = combineReducers({
  summary: summaryReducer,
  country: selectCountry,
});

const middlewares = [thunk];

const store = createStore(allReducer, applyMiddleware(...middlewares));

export default store;
