// Created by snov on 18.02.2017.
//
// Logger component
//
//=========================================================================

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import styles from './style.scss';

/* eslint-disable no-unused-vars */
const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

@connect(mapStateToProps)
class Logger extends Component {

  static propTypes = {
    messages: React.PropTypes.array
  }

  render() {
    const messages = this.props.messages;
    return (
      <div>
        {messages ? messages.map((m,i) => <div className="alert alert-success" key={i}><i className="fa fa-envelope-open"/> {m}</div>) : null }
      </div>
    );
  }
}

export default Logger;