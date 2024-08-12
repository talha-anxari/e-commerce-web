
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import { 
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc,
   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

   const firebaseConfig = {
    apiKey: "AIzaSyAfx3WvYPrAibnT40HOtOcP6Gpm6i8KjsA",
    authDomain: "ecommerce-firebase-22d7e.firebaseapp.com",
    projectId: "ecommerce-firebase-22d7e",
    storageBucket: "ecommerce-firebase-22d7e.appspot.com",
    messagingSenderId: "531904609526",
    appId: "1:531904609526:web:f53cca772bfe342cea40d7",
    measurementId: "G-YPVC31PP0Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {
    auth,
    db,
    storage, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    doc,
    setDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    signOut,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc,
  };

