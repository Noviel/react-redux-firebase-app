// Created by snov on 11.02.2017.
//
// Redux store entry point
//
//=========================================================================

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export default function(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );
}

// Name of the property by which store data will be available on the client.
export const SERVER_STORE = '__SERVER_STORE__';