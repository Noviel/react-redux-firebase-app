// Created by snov on 10.02.2017.
//
// OSNOVA Server rendering module
// Generates HTML based on Webpack bundle assets and store data
//
//=========================================================================

/* eslint-disable no-unused-vars */

import React from 'react';
import reactDOM from 'react-dom/server';
import Html from '../../helpers/Html';
import Wrapper from '../../helpers/AppWrapper';
import FireBaseApp from '../../components/Firebase';
import { getAssets } from '../../../webpack/utils';
import createStore from '../../redux/store';
import { head } from '../../../config/app';

const defaultStore = createStore({
  messages: [],
  auth: {
    user: null,
    uid: null
  }
});

const getFullHtml = (App, store, head) =>
  '<!doctype html>\n' +
  reactDOM.renderToString(<Html assets={getAssets()}
                                store={store}
                                component={<Wrapper App={App} head={head} store={store}/>} />);

export default function serverRendering({ express, store = defaultStore } = {}) {
  return osnova => {
    const app = express || osnova.express;

    if (!app) {
      throw new Error('No express.js was found.');
    }

    app.get('*', (req, res) => {
      res.send(getFullHtml(FireBaseApp, store, head));
    });

    osnova.next();
  };
}

