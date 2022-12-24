import { db } from './index.js';
import {
  addDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

import { Pane } from 'https://cdn.skypack.dev/tweakpane';
import Splitting from 'https://cdn.skypack.dev/splitting';
Splitting({
  /* target: String selector, Element, Array of Elements, or NodeList */
  target: '[data-splitting]',
  /* by: String of the plugin name */
  by: 'chars',
  /* key: Optional String to prefix the CSS variables */
  key: null,
});

let array1 = new Array();
let obj = new Object();

const testBtn = document.getElementById('testBtn');

testBtn.addEventListener('mouseenter', (e) => {
  e.preventDefault();

  let child = document.createElement('div');
  child.classList.add('child');
  child.textContent = 'Hello, World!';
  testBtn.appendChild(child);
  setTimeout(() => {
    testBtn.removeChild(child);
  }, 1000);
});

let form = document.getElementById('form');

const options = {
  root: null, //null means the viewport
  rootMargin: '0px',
  threshold: 0.5,
};

console.log(options);

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('intersecting');
      setTimeout(() => {
        entry.target.style.backgroundColor = 'red';
      }, 1000);
      console.log(entry);
      console.log(observer);
    } else {
      console.log('not intersecting');
      entry.target.style.backgroundColor = 'blue';
    }
  });
}, options);

observer.observe(form);

window.addEventListener('scroll', (e) => {
  const scroll = window.scrollY;
  if (scroll > 0) {
    form.classList.remove('form');
    form.classList.add('disapear');
  } else {
    form.classList.remove('disapear');
    form.classList.add('form');
  }
});

const foot = document.getElementById('footer');
foot.addEventListener('scroll', (e) => {
  console.log('scrolling footer');
});

observer.observe(foot);

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
