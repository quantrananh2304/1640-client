import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCl3AntB1R6qbUHdVS2WVrN6tsdSz52IUA",
  authDomain: "project-1300899936117119693.firebaseapp.com",
  projectId: "project-1300899936117119693",
  storageBucket: "project-1300899936117119693.appspot.com",
  messagingSenderId: "733809067781",
  appId: "1:733809067781:web:e7e1ac489d30e264d7996c",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
