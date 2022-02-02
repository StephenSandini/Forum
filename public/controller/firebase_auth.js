/***********************************************************  
*           Importing of Folders to gain access to them
***********************************************************/

import * as Elements from '../view-page/elements.js'
/***********************************************************  
*           Exporting Event Listeners
***********************************************************/
export function addEventListeners(){
    /***********************************************************  
    *           Event Listener from Sign In Form
    *   e= event , target = form, 
    *   email= name of input element, value = text in field
    ***********************************************************/
    Elements.formsSignIn.addEventListener('submit', e=> {
        e.preventDefault(); //Prevents refreshing of the current page.
        const email = e.target.email.value;
        const password = e.target.password.value;
    });

}

