// Created by snov on 18.02.2017.
//
// Component that can talk with Firebase database
//
//=========================================================================

import React, { Component } from 'react';
import { Firebase as firebase, auth, database } from '../../firebase';

function writeData(root, data) {
  database.ref(root).set({ data });
}

const provider = new firebase.auth.GoogleAuthProvider();
auth.onAuthStateChanged((user) => {
  if (user) {
    alert(`U are ${user.displayName}!`);
  }
});

function authenticate() {
  auth.signInWithRedirect(provider);

  auth.getRedirectResult().then(function(result) {
    if (result.credential) {
      const token = result.credential.accessToken;
      alert(token);
    }
  }).catch(function(error) {
    const { errorCode, errorMessage, email, credential } = error;
    alert(errorCode, errorMessage, email, credential);
  });

}


export default class FirebaseApp extends Component {

  constructor() {
    super();

    this.state = {
      input: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div>
        <button onClick={authenticate}>ENTER WITH GOOGLE ACCOUNT</button>
        <button onClick={ () => { writeData('fromApp', this.state.input) } }>Add to database:</button>
        <input onChange={this.handleInputChange} value={this.state.input}/>
      </div>
    );
  }
}