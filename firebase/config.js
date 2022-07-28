// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfigDevelopmet = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const firebaseConfigProduction = {
  apiKey: process.env.NEXT_PUBLIC_PRODUCTION_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_PRODUCTION_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PRODUCTION_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_PRODUCTION_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PRODUCTION_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_PRODUCTION_APP_ID,
};

let app;
switch (process.env.NODE_ENV) {
  case "production":
    app = initializeApp(firebaseConfigProduction);
    break;
  case "development":
    app = initializeApp(firebaseConfigDevelopmet);
    break;
}
// getAuth
const auth = getAuth(app);
// getFirestore
const db = getFirestore(app);
// getStorage
const storage = getStorage(app);
// provider
const provider = new GoogleAuthProvider();

export { auth, db, provider, storage };
