import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import summaryReducer from './summary';

const allReducer = combineReducers({
  summary: summaryReducer,
});

const middlewares = [thunk];

const store = createStore(allReducer, applyMiddleware(...middlewares));

export default store;
