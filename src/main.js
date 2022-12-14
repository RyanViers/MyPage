import { db } from './index.js';
import {
  addDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

let array1 = [];
let obj = new Object();

let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  obj.name = e.target.elements[0].value;
  obj.email = e.target.elements[1].value;
  obj.address = e.target.elements[2].value;

  console.log(obj);

  submitForm(obj);
});

let getBtn = document.getElementById('get-btn');

getBtn.addEventListener('click', (e) => {
  e.preventDefault();

  getData();
});

const deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  deleteData();
});

//Add new user to database.
async function submitForm(obj) {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: obj.name,
      email: obj.email,
      address: obj.address,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

//Get user from database by name.
async function getData() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    let container = document.getElementById('container');
    let nameQuery = document.getElementById('read-name').value;
    container.dataset.indexNumber = 456;

    let nameContainer = document.getElementById('names');
    let emailContainer = document.getElementById('emails');
    let addressContainer = document.getElementById('addresses');

    console.log(doc.id);

    if (
      nameQuery === doc._document.data.value.mapValue.fields.name.stringValue
    ) {
      form.classList.add('hide');
      nameContainer.append(
        `${doc._document.data.value.mapValue.fields.name.stringValue}, `
      );
      emailContainer.append(
        `${doc._document.data.value.mapValue.fields.email.stringValue}, `
      );
      addressContainer.append(
        `${doc._document.data.value.mapValue.fields.address.stringValue}, `
      );
    } else {
      console.log('no match');
    }
  });
}

//Delete user from database by name.
async function deleteData() {
  const deleteName = document.getElementById('delete-name').value;

  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    if (
      doc._document.data.value.mapValue.fields.name.stringValue === deleteName
    ) {
      {
        try {
          deleteDoc(doc.ref);
          console.log('Document successfully deleted!');
        } catch (e) {
          console.error('Error deleting document: ', e);
        }
      }
    }
  });
}
