import { initializeApp, getApps, getApp } from '@firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth, GoogleAuthProvider } from '@firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyCraU1jIiz5wbZov5jSt1MIVBHYrNYnJLA",
    authDomain: "whatsapp-2-697ae.firebaseapp.com",
    projectId: "whatsapp-2-697ae",
    storageBucket: "whatsapp-2-697ae.appspot.com",
    messagingSenderId: "74009777465",
    appId: "1:74009777465:web:3e6da76b8fc860ef4844e8"
};
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
export { db, auth, provider }