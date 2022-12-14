class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const div = document.createElement('div');
    div.style.backgroundColor = 'lightblue';
    div.classList.add('my-element');
    div.textContent = 'Hello, World!';
    shadow.appendChild(div);
  }
}
customElements.define('my-element', MyElement);

class NewElement extends HTMLElement {
  constructor() {
    super();
    const divTwo = document.createElement('div');
    divTwo.textContent = 'Hello, World!';

    this.appendChild(divTwo);
  }
}
customElements.define('new-element', NewElement);

let ele = document.getElementById('ele');
ele.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('clicked');
  mystuff();
});

function mystuff() {
  console.log('mystuff');
}
