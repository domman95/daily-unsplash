import firebase from 'firebase/app'
import 'firebase/firestore'

var config = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: "unsplash-daily.firebaseapp.com",
    databaseURL: "https://unsplash-daily.firebaseio.com",
    projectId: "unsplash-daily",
    storageBucket: "unsplash-daily.appspot.com",
    messagingSenderId: "28936312897",
    appId: "1:28936312897:web:f342ca4ae42c06a9434ec0"
  };
  firebase.initializeApp(config);
  
export const db = firebase.firestore()
  