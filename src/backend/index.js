import firebase from "firebase";
// import "firebase/storage";
// import "firebase/auth";
// import "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyAvKDtDctNsp0HNmRkQmQRpCWC0kgy0Xns",
  authDomain: "likeme-a104d.firebaseapp.com",
  projectId: "likeme-a104d",
  storageBucket: "likeme-a104d.appspot.com",
  messagingSenderId: "1008058655210",
  appId: "1:1008058655210:web:72169a269d424ea5835293",
  measurementId: "G-6W89H8PRX9",
};
const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();
const storage = app.storage();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const _ = {
  auth,
  db,
  storage,
};
export default _;
