
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBhf_z_JouYTVj-fW9UzrfTrCc4b6i6fkY",
  authDomain: "jboree-app.firebaseapp.com",
  projectId: "jboree-app",
  storageBucket: "jboree-app.appspot.com",
  messagingSenderId: "134822158149",
  appId: "1:134822158149:web:9f2b51eba7dd46e9cee82c",
  measurementId: "G-T1PRZ226W0"
};


initializeApp(firebaseConfig);
export const storage = getStorage()