//Brings in firebase functionality

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCRuDswIdTen_rkJbls7Kz2Z60wWbb6iDo',
  authDomain: 'mypage-a8c32.firebaseapp.com',
  databaseURL: 'https://mypage-a8c32-default-rtdb.firebaseio.com',
  projectId: 'mypage-a8c32',
  storageBucket: 'mypage-a8c32.appspot.com',
  messagingSenderId: '948757884091',
  appId: '1:948757884091:web:b272ea1053cc7d3ef0cd9e',
  measurementId: 'G-JLKY6GTYNZ',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
