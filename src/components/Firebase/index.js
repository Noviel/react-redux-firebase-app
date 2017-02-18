// Created by snov on 18.02.2017.
//
// Component that can talk with Firebase
//
//=========================================================================

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Firebase as firebase, auth, database } from '../../firebase';
import Logger from '../Logger';
import { addMessage } from '../../redux/modules/logger';
import { connect } from 'react-redux';


const provider = new firebase.auth.GoogleAuthProvider();

function authenticate() {
  auth.signInWithRedirect(provider);

  auth.getRedirectResult().then(function(result) {
    if (result.credential) {
      const token = result.credential.accessToken;
      console.log(token);
    }
  }).catch(function(error) {
    const { errorCode, errorMessage, email, credential } = error;
    alert(errorCode, errorMessage, email, credential);
  });
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch }
}

const keyProp = 'database-key';
const valueProp = 'database-value';

const messagesRef = database.ref('messages');

function writeData(ref, data) {
  const newRef = ref.push();
  newRef.set(data);
}

const sendMessage = (user, message) => {
  writeData(messagesRef, { user, message});
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FirebaseApp extends Component {

  state = {
    [keyProp]: '',
    [valueProp]: '',
    user: null
  }

  static propTypes = {
    dispatch: React.PropTypes.func
  }

  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(`U are ${user.displayName}!`);
      }
      this.handleUserChange(user);
    });

    messagesRef.on('child_added', (snapshot) => {
      const val = snapshot.val();
      this.props.dispatch(addMessage(`${val.user}: ${val.message}`));
    });
  }

  componentWillUnmount() {

  }

  handleInputChange = (e) =>  {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUserChange = (user) => {
    this.setState({
      user
    });

    this.props.dispatch(addMessage(`User changed.`));
  }

  handleLogout = () => {
    auth.signOut().then(() => {
    }, (error) => {
      console.log(error);
    })
  }

  render() {
    let actionElement = null;
    if (this.state.user) {
      actionElement =
        (<div>
          <h1>Hello, {this.state.user.displayName}!</h1>
          <button onClick={this.handleLogout}>Logout</button>
          <form onSubmit={e => {
            e.preventDefault()
            this.setState({
              [valueProp]: ''
            });
            sendMessage(this.state.user.displayName, this.state[valueProp]);
          }}>
            <input onChange={this.handleInputChange} value={this.state[valueProp]} name={valueProp}/>
            <button>Send</button>
          </form>
        </div>);
    } else {
      actionElement = (
        <div>
          <h1>Login to get access to database.</h1>
          <button onClick={authenticate}>Enter with Google Account</button>
        </div>
      )
    }

    return (
      <div>
        {actionElement}
        <Logger/>
      </div>
    );
  }
}