const init = () => {

//Create Form
function createForm(){
    const newForm = document.createElement('form');
    const id = document.createAttribute('id');
    id.value = 'monster-form';
    newForm.setAttributeNode(id);

    const grabCreateMonsterDiv = document.querySelector('#create-monster');
    grabCreateMonsterDiv.appendChild(newForm);

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.placeholder = 'name...';
    newForm.appendChild(nameInput);

    const ageInput = document.createElement('input');
    ageInput.setAttribute('type', 'text');
    ageInput.placeholder = 'age...';
    newForm.appendChild(ageInput);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.placeholder = 'description...';
    newForm.appendChild(descriptionInput);

    const btn = document.createElement('button');
    btn.innerText = 'Create';
    newForm.appendChild(btn);

}

createForm();

document.querySelector('#monster-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let inputName = e.target[0].value;
    let inputAge = e.target[1].value;
    let inputDescription = e.target[2].value;

    let inputData = {
        name: inputName,
        age: inputAge,
        description: inputDescription,
    }


    sendMonster = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application.json',
        },
        body: JSON.stringify(inputData),
    };
    postFetch()
});

function postFetch(){
    fetch('http://localhost:3000/monsters', sendMonster)
    .then(res => res.json())
    .then(data => renderOneMonster(data))
};

let count = 1;

document.querySelector('#forward').addEventListener('click', () => {
    count++;
    getMonsters(count);
})

document.querySelector('#back').addEventListener('click', () => {
    count--;
    getMonsters(count);
});

const monstContain = document.querySelector('#monster-container');

function clearPage(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

getMonsters();

// DOM Render Function
function renderOneMonster(monster){
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = monster.name;
    const h4 = document.createElement('h3');
    h4.textContent = `Age: ${monster.age}`;
    const p = document.createElement('p');
    p.textContent = `About: ${monster.description}`;

    document.querySelector('#monster-container').appendChild(div)
    div.append(h2);
    div.append(h4);
    div.append(p);

};

renderOneMonster();

function getMonsters(pageNum){
    clearPage(monstContain);
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then(monsters => {
        monsters.forEach(monster => renderOneMonster(monster))
    })
};

}

document.addEventListener('DOMContentLoaded', init);