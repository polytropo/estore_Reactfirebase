import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB4Et_pcODty5ZgAVSLv3F0WzZVPIiKKvo",
  authDomain: "reactfirebaseestore.firebaseapp.com",
  databaseURL: "https://reactfirebaseestore.firebaseio.com",
  projectId: "reactfirebaseestore",
  storageBucket: "reactfirebaseestore.appspot.com",
  messagingSenderId: "445608061173",
  appId: "1:445608061173:web:2f608dc38db97c46873dbc"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
