import { db } from './main.js';
import {
  addDoc,
  getDocs,
  collection,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

document.getElementById('btn').addEventListener('click', () => {
  console.log('clicked');
});

console.log(db);

// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     first: 'Bill',
//     last: 'Ted',
//     born: 1815,
//   });
//   console.log('Document written with ID: ', docRef.id);
// } catch (e) {
//   console.error('Error adding document: ', e);
// }

const querySnapshot = await getDocs(collection(db, 'users'));
querySnapshot.forEach((doc) => {
  console.log(doc._document.data.value.mapValue.fields.first);
});
