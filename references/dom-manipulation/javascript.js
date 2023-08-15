const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

const paragraph = document.createElement('p');
paragraph.classList.add('paragraph');
paragraph.textContent = "Hey I'm red!";
paragraph.style.color = 'red';

const headerThree = document.createElement('h3');
headerThree.classList.add('headerThree');
headerThree.textContent = "I'm a blue h3!";
headerThree.style.color = 'blue';

const div = document.createElement('div');
div.classList.add('div');
div.setAttribute('style', 'background: pink; border: 5px solid black;');

const headerOne = document.createElement('h1');
headerOne.classList.add('headerOne');
headerOne.textContent = "I'm in a div";
div.appendChild(headerOne);

const paraTwo = document.createElement('p');
paraTwo.classList.add('paraTwo');
paraTwo.textContent = "ME TOO!";
div.appendChild(paraTwo);



container.appendChild(content);
container.appendChild(paragraph);
container.appendChild(headerThree);
container.appendChild(div);