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
import { addMessage, clear } from '../../redux/modules/logger';
import { login, logout } from '../../redux/modules/auth';
import { connect } from 'react-redux';

const provider = new firebase.auth.GoogleAuthProvider();

function authenticate() {

  auth.signInWithPopup(provider).then(function(result) {
    if (result.credential) {
      const token = result.credential.accessToken;
    }
  }).catch(function(error) {
    const { message } = error;
    console.log(message);
  });
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


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FirebaseApp extends Component {

  state = {
    [keyProp]: '',
    [valueProp]: ''
  }

  static propTypes = {
    dispatch: React.PropTypes.func,
    user: React.PropTypes.string
  }

  componentDidMount() {

    messagesRef.on('child_added', (snapshot) => {
      const val = snapshot.val();
      this.props.dispatch(addMessage(`${val.user}: ${val.message}`));
    });

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch(login(user.displayName, user.id));
        this.handleUserChange(user.displayName);
        messagesRef.on('value', (snapshot) => {
          this.props.dispatch(clear());
          const data = snapshot.val();
          Object.keys(data).forEach(val => {
            this.props.dispatch(addMessage(`${data[val].user}: ${data[val].message}`));
          });
        });
      }
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
    this.props.dispatch(addMessage(`You are logged in as ${user}`));
  }

  handleLogout = () => {
    auth.signOut().then(() => {
      this.props.dispatch(logout());
      this.props.dispatch(addMessage(`You are logged out`));

    }, (error) => {
      console.log(error);
    })
  }

  handleSendMessage = (e) => {
    e.preventDefault()
    sendMessage(this.props.user, this.state[valueProp]);

    this.setState({
      [valueProp]: ''
    });
  }

  render() {
    let actionElement = null;
    const { user }  = this.props;
    if (user) {
      actionElement =
        (<div className='jumbotron'>
          <h3>Hello, {user}!</h3>
          <p>Enter your message: </p>
          <form onSubmit={this.handleSendMessage} className="input-group">
            <input className="form-control" onChange={this.handleInputChange} value={this.state[valueProp]} name={valueProp}/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.handleSendMessage}>Send</button>
            </span>
          </form>
          <p>
          <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
          </p>

          <Logger/>
        </div>);
    } else {
      actionElement = (
        <div className='jumbotron'>
          <h3>Login to get access to the database!</h3>
          <p>
            <button className="btn btn-primary" onClick={authenticate}>Enter with Google Account</button>
          </p>
        </div>
      )
    }

    return (
      <div className='container'>
       <div className='page-header'><h1>React Redux Firebase demo</h1></div>
        <h4><a href='https://github.com/Noviel/react-redux-firebase-app/tree/dev'>Source code on Github</a></h4>
        {actionElement}
      </div>
    );
  }
}