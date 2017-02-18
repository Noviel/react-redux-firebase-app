// Created by snov on 16.02.2017.
//
// Application helper component.
//
//=========================================================================

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../../config/app';

import FirebaseApp from '../Firebase';

export default class App extends Component {
  render() {
    return (
      <div className='app' id='app'>
        <Helmet {...config.head}/>
        <FirebaseApp/>
      </div>
    );
  }
}