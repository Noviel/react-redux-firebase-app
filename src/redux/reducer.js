// Created by snov on 11.02.2017.
//
// Root Application Reducer
//
//=========================================================================\

import { combineReducers } from 'redux';
import logger from './modules/logger';
import auth from './modules/auth';

export default combineReducers({
  messages: logger,
  auth
});