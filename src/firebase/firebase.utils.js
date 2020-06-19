import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDq1KkNBQecIDXbdxP4v7NYuQx7QxOKMIo",
  authDomain: "e-commerce-backend-react.firebaseapp.com",
  databaseURL: "https://e-commerce-backend-react.firebaseio.com",
  projectId: "e-commerce-backend-react",
  storageBucket: "e-commerce-backend-react.appspot.com",
  messagingSenderId: "336431359919",
  appId: "1:336431359919:web:8272ca4a2bafb10073b15a",
  measurementId: "G-WLLQGKKHZE",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
