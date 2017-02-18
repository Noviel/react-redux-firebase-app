// Created by snov on 18.02.2017.
//
//  Redux logger module
//
//=========================================================================

import createActionConstants from '../lib/create-action-constants';
import createReducer from '../lib/'

const ADD_MESSAGE = 'ADD_MESSAGE';
const CLEAR = 'CLEAR';

const ACTIONS = createActionConstants(
  'react-redux-firebase-app', 'logger',
  [
    ADD_MESSAGE, CLEAR
  ]
);

export function addMessage(message) {
  return {
    type: ACTIONS.ADD_MESSAGE,
    message
  }
}

export function clear() {
  return {
    type: ACTIONS.CLEAR
  }
}

const initialState = [];

export default createReducer(initialState, {

  [ACTIONS.ADD_MESSAGE](state, action) {
    return [...state, action.message];
  },

  [ACTIONS.CLEAR]() {
    return [];
  }

});