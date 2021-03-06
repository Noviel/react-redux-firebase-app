// Created by snov on 27.08.2016.

import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import Wrapper from '../helpers/AppWrapper';
import App from '../components/Firebase';
import { head } from '../../config/app';
import createStore, { SERVER_STORE } from '../redux/store';

import env from '../../config/global';

env(true);

console.log(env.getEnvString());

let socket = null;

const initSocket = () => {
  socket = io('');
  socket.emit('client-message', 'Priffki :****');
};

const store = createStore(window[SERVER_STORE]);

document.addEventListener('DOMContentLoaded', () => {
  initSocket();

  render(<Wrapper App={App} head={head} store={store}/>,
    document.getElementById('content'));
});