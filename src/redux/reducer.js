// Created by snov on 11.02.2017.
//
// Root Application Reducer
//
//=========================================================================\

import { combineReducers } from 'redux';
import logger from './modules/logger';

export default combineReducers({
  messages: logger
});