// Created by snov on 16.02.2017.
//
// Application helper component.
//
//=========================================================================

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../../config/app';
import { Provider } from 'react-redux';
import FirebaseApp from '../Firebase';

export default class App extends Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Helmet {...config.head}/>
        <Provider store={this.props.store}>
          <FirebaseApp/>
        </Provider>
      </div>
    );
  }
}