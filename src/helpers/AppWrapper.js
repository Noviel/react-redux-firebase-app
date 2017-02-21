// Created by snov on 16.02.2017.
//
// Wrapper helper component.
//
//=========================================================================

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

export default class AppWrapper extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    App: PropTypes.func.isRequired,
    head: PropTypes.object,
  }

  render() {
    const { head, App, store } = this.props;
    return (
      <div id='app-wrapper'>
        <Helmet {...head}/>
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    );
  }
}