import * as Elements from './elements.js'
import * as ProtectedMessage from './messages/protected_message.js'
import { routePath } from '../controller/route.js';
import { currentUser } from '../controller/firebase_auth.js';

export function addEventListeners(){
    Elements.navbarAbout.addEventListener('click', () => {
        history.pushState(null,null,routePath.ABOUT);
        about_page();
    });
}

export function about_page(){
    if(!currentUser){
        Elements.root.innerHTML=ProtectedMessage.html;
        return;
    }
    Elements.root.innerHTML = `
        <h1>About Page</h1>
    `;
}