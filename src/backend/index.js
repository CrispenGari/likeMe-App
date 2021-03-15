import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAjkOqQ-MIXm-limp5Mqf0CYMSbFfJhBdo",
//   authDomain: "like-me-app-39ad7.firebaseapp.com",
//   projectId: "like-me-app-39ad7",
//   storageBucket: "like-me-app-39ad7.appspot.com",
//   messagingSenderId: "102019436154",
//   appId: "1:102019436154:web:da6d95d7e14ca38ee575c3",
//   measurementId: "G-X0Y7137TZF",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyA6vgXKus8ilVQaqB8P5E4FAni10h0P-CU",
//   authDomain: "like-me-78671.firebaseapp.com",
//   projectId: "like-me-78671",
//   storageBucket: "like-me-78671.appspot.com",
//   messagingSenderId: "51162384651",
//   appId: "1:51162384651:web:21078b68c55c7960ea7a0e",
//   measurementId: "G-Y0JN6JGEJF",
// };

const firebaseConfig = {
  apiKey: "AIzaSyB1gTlqsdwUZMUwJ1MxwFzsjJw-QBC8v28",
  authDomain: "likeme-7c975.firebaseapp.com",
  projectId: "likeme-7c975",
  storageBucket: "likeme-7c975.appspot.com",
  messagingSenderId: "229667542535",
  appId: "1:229667542535:web:a89c76cc888279c0d5bca2",
  measurementId: "G-SZ0JZD10WS",
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
