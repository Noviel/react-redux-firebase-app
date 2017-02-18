// Created by snov on 27.08.2016.

import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import App from '../components/App';

//import createStore from '../redux/store';

import defineGlobals from '../../config/global';

defineGlobals(true);

let socket = null;

const initSocket = () => {
  socket = io('');
  socket.emit('client-message', 'Priffki :****');
};

document.addEventListener('DOMContentLoaded', () => {
  initSocket();

  render(<App />,
    document.getElementById('content'));
});