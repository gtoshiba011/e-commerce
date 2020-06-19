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

//  initialize Web App based on your Firebase config
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// create Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userDocRef = firestore.doc(`users/${userAuth.uid}`);
  const userDocSnapshot = await userDocRef.get();
  if (!userDocSnapshot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userDocRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error create user", error.message);
    }
  }

  return userDocRef;
};

export default firebase;
