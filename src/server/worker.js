// Created by snov on 22.06.2016.

import OSNOVA from 'osnova';
import socketEvents from './modules/socket-events';
import serverRendering from './modules/server-rendering';
import expressMiddlewares from './modules/express-middlewares';
import socketIOModule from 'osnova-module-socket.io';

const env = require('../../config/global');

module.exports = (listen) => {

  const osnova = OSNOVA({
    modules: [
      expressMiddlewares(),
      serverRendering(),
      socketIOModule(),
      socketEvents()
    ],
    core: require('../../config/core'),
    listen
  });

  osnova.start(() => {
    console.log(`Hello from worker! [pid=${process.pid}] [ENV=[${env.getEnvString()}]]`);
  });
};