import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyAM3yUYyfZXyABym4Cyc4GBUHjLD_GKsqw",
    authDomain: "crwn-db-e461b.firebaseapp.com",
    projectId: "crwn-db-e461b",
    storageBucket: "crwn-db-e461b.appspot.com",
    messagingSenderId: "455643297014",
    appId: "1:455643297014:web:cec520e01f253eb92da8d7",
    measurementId: "G-N3CN49K4R7"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`)

      const snapShot = await userRef.get()
      
      if(!snapShot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.log('error creating user', error.message)
        }
      }
      return userRef
    }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' }) //show the google prompt
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase