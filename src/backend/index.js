import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjkOqQ-MIXm-limp5Mqf0CYMSbFfJhBdo",
  authDomain: "like-me-app-39ad7.firebaseapp.com",
  projectId: "like-me-app-39ad7",
  storageBucket: "like-me-app-39ad7.appspot.com",
  messagingSenderId: "102019436154",
  appId: "1:102019436154:web:da6d95d7e14ca38ee575c3",
  measurementId: "G-X0Y7137TZF",
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
