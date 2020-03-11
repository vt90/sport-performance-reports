import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';

import { appReducer } from '../reducers/app';
import { reportsReducer } from '../reducers/reports';
import { reviewsReducer } from '../reducers/reviews';
import { notificationReducer } from '../reducers/notifications';

const rootReducer = combineReducers({
  app: appReducer,
  reports: reportsReducer,
  reviews: reviewsReducer,
  notifications: notificationReducer,
  router: routerReducer,
});

export const history = createHistory();

const middlewares = [
  thunk,
  routerMiddleware(history),
];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, enhancer);
