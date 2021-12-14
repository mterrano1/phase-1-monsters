const init = () => {


// DOM Render Function
function renderOneMonster(monster){
    const div = document.createElement('div');
    const textnode = document.createTextNode('test');
    const container = document.querySelector('#monster-container');
    const h2 = document.createElement('h2');
    const h4 = document.createElement('h3');
    const p = document.createElement('p');

    div.appendChild(textnode);
    document.querySelector('#monster-container').appendChild(div)
    container.append(h2);
    container.append(h4);
    container.append(p);

}

renderOneMonster();






}

document.addEventListener('DOMContentLoaded', init);