import firebase from 'firebase/app'
// import firebaseui from "firebaseui";
import 'firebase/database'
import 'firebase/auth'
// import "firebaseui/dist/firebaseui.css";

const firebaseConfig = {
  apiKey: "AIzaSyC65eHM-8UQQo8DEU0l5j8S6XiOAS5O12g",
  authDomain: "chatsup-9701d.firebaseapp.com",
  databaseURL: "https://chatsup-9701d.firebaseio.com",
  projectId: "chatsup-9701d",
  storageBucket: "chatsup-9701d.appspot.com",
  messagingSenderId: "765213702773",
  appId: "1:765213702773:web:4c520ca116724c8e6c963c",
  measurementId: "G-Z4X7YBFP1Q"
};


let firebaseApp =  firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };