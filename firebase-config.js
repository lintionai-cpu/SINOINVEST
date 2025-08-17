// firebase-config.js
const firebaseConfig = {
   apiKey: "AIzaSyAmAwp7hoJ0aXIuvJ4QmmbGqBtJFg1Xxrw",
    authDomain: "sinoinvest-d0593.firebaseapp.com",
    projectId: "sinoinvest-d0593",
    storageBucket: "sinoinvest-d0593.firebasestorage.app",
    messagingSenderId: "676999129836",
    appId: "1:676999129836:web:7c582892c0d94f7c9a13c9",
    measurementId: "G-L14SSD4V50"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
