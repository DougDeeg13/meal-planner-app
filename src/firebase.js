import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSxhnxrgXxlFVuZ6mnYwp_XkfKsGT7vCs",
  authDomain: "meal-planner-55fdc.firebaseapp.com",
  projectId: "meal-planner-55fdc",
  storageBucket: "meal-planner-55fdc.firebasestorage.app",
  messagingSenderId: "935809766595",
  appId: "1:935809766595:web:7151bfec65ca85a271fe76"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);