import * as Elements from './elements.js'

export function addEventListeners(){
    Elements.navbarHome.addEventListener('click', () =>{
        home_page();
    });
}

function home_page(){
    Elements.root.innerHTML = `
    <h1>Home Page </h1>
    `;
}