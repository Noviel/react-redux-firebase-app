// Created by snov on 18.02.2017.
//
// Firebase!
//
//=========================================================================

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB_jp9rinp2qbjM8RadMRqyuTTBA4Jhim8",
  authDomain: "sonsnov-e8a3a.firebaseapp.com",
  databaseURL: "https://sonsnov-e8a3a.firebaseio.com",
  storageBucket: "sonsnov-e8a3a.appspot.com",
  messagingSenderId: "1083949478942"
};

export let app = firebase.initializeApp(config);
export let Firebase = firebase;
export const auth = firebase.auth();
export const database = firebase.database();