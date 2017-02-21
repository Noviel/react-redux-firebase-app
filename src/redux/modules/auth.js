// Created by snov on 19.02.2017.
//
// Authentication module
//
//=========================================================================

import createActionConstants from '../lib/create-action-constants';
import createReducer from '../lib/'

const AWAIT_AUTH = 'AWAIT_AUTH';
const LOGOUT = 'LOGOUT';
const LOGIN = 'LOGIN';

const ACTIONS = createActionConstants(
  'react-redux-firebase-app', 'auth',
  [
    AWAIT_AUTH, LOGOUT, LOGIN
  ]
);

export function login(user, uid) {
  return {
    type: ACTIONS.LOGIN,
    user,
    uid
  }
}

export function logout() {
  return {
    type: ACTIONS.LOGOUT
  }
}


export default createReducer({ user: null, uid: null }, {

  [ACTIONS.LOGIN](state, action) {
    return { ...state, ...{ user: action.user, uid: action.uid }};
  },

  [ACTIONS.LOGOUT](state) {
    return { ...state, ...{ user: null, uid: null }};
  }

});