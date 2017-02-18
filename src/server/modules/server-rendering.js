// Created by snov on 10.02.2017.
//
// OSNOVA Server rendering module
// Generates HTML based on Webpack bundle assets and store data
//
//=========================================================================

import React from 'react';
import reactDOM from 'react-dom/server';
import App from '../../components/App';
import Html from '../../components/Html';
import { getAssets } from '../../../dev/webpack-utils';
import createStore from '../../redux/store';

const serverStore = createStore({
  messages: ['I was retrieved from the server', 'Me too']
});

const getFullHtml = (Component, store) =>
  '<!doctype html>\n' + reactDOM.renderToString(
      <Html assets={ getAssets() }
            component={<Component store={store}/>}
            store={store}/>);


export default function serverRendering(opts = {}) {
  return osnova => {
    const app = opts.express || osnova.express;

    if (!app) {
      throw new Error('No express.js was found.');
    }

    app.get('*', (req, res) => {
      res.send(getFullHtml(App, serverStore));
    });

    osnova.next();
  };
}