import firebase from "firebase";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import dotenv from "dotenv";
import { firebaseConfig } from "../keys";
dotenv.config();

export const config = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
  appId: `${process.env.APP_ID}`,
  measurementId: `${process.env.MEASUREMENT_ID}`,
};

const app =
  firebase.apps.length > 0
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.firestore();
const storage = app.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const _ = {
  auth,
  db,
  storage,
  timestamp,
};

export default _;
