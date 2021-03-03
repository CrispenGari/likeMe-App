import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6vgXKus8ilVQaqB8P5E4FAni10h0P-CU",
  authDomain: "like-me-78671.firebaseapp.com",
  projectId: "like-me-78671",
  storageBucket: "like-me-78671.appspot.com",
  messagingSenderId: "51162384651",
  appId: "1:51162384651:web:21078b68c55c7960ea7a0e",
  measurementId: "G-Y0JN6JGEJF",
};
const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();
const storage = app.storage();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const _ = {
  auth,
  db,
  storage,
  googleAuthProvider,
};
export default _;
