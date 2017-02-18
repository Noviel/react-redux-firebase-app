// Created by snov on 15.02.2017.
//
// Defining global constants for universal application
//
//=========================================================================

/* eslint-disable no-undef */

module.exports = function setEnvironment(
  isOnClient = false,
  isProduction = process.env.NODE_ENV === 'production')
{
  global.__CLIENT__ = isOnClient;
  global.__SERVER__ = !isOnClient;
  global.__DEV__ = !isProduction;
  global.__PROD__ = isProduction;
};

module.exports.getEnvString = (sign = ' = ') => {
  return `PROD${sign}${__PROD__}, DEV${sign}${__DEV__}, SERVER${sign}${__SERVER__}, CLIENT${sign}${__CLIENT__}`;
}