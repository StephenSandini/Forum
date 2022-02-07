/***********************************************************************************************************  
*           Importing of Folders to gain access to them
*           {getAuth: uses predefined method in firebase for fetching authentication}
*           {signInWithEmailAndPassword: uses a form to complete the login process with a email & password}
*           {signOut: signs out the current user}
*           {onAuthStateChanged: }
************************************************************************************************************/
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js';
import { routing } from './route.js';
import * as Elements from '../view-page/elements.js'
import * as Util from '../view-page/util.js'
import * as Constants from '../model/constants.js'
import * as WelcomeMessage from '../view-page/messages/welcome_message.js'

/***********************************************************  
*           Creating the Authetication Function 
*                       from Firebase
***********************************************************/
const auth = getAuth();
export let currentUser = null;

/***********************************************************  
*           Exporting Event Listeners
***********************************************************/
export function addEventListeners() {
    /***********************************************************  
    *           Event Listener from Sign In Form
    *   e= event , target = form, 
    *   email= name of input element, value = text in field
    ***********************************************************/
    Elements.formsSignIn.addEventListener('submit', async e => {
        e.preventDefault(); //Prevents refreshing of the current page.
        const email = e.target.email.value;
        const password = e.target.password.value;
        /***********************************************************  
        *    From Firebase Documents on Author for Existing Users
        *   Link:https://firebase.google.com/docs/auth/web/start?authuser=0
        *   JSON.stringify() will print to the browswers console information
        *   that would be displayed as object Object if it were just
        *   ${user} vs ${JSON.stringify(user)}
        ***********************************************************/
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            //This will close the modal when signin occurs
            Elements.modalSignIn.hide();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Util.informationbox('Sign In Error', JSON.stringify(error), Elements.modalSignIn);
            if(Constants.DEV) {
                console.log(`sign in error: ${errorCode} | ${errorMessage}`);
            }
        }
       
    });
    /***********************************************************  
    *           Event Listener from Sign Out Button
    ***********************************************************/
    Elements.navbarSignOut.addEventListener('click', async () =>{
        try{
            await signOut(auth);
        }catch(error){
            Util.informationbox('Sign Out Error', JSON.stringify(error));
            if(Constants.DEV){
            console.log('Sign Out Error'+ error);
            }
        }
    });
    /***********************************************************  
    *           Calling Method to Observe when Signed In/Out
    ***********************************************************/
    onAuthStateChanged(auth, authStateChangeObserver);

}

function authStateChangeObserver(user){
    //Checks for a value to insure a user can log in
    if(user){
        //Exists and signs in
        currentUser = user;
        let elements = document.getElementsByClassName('modal-preauth');
        for(let i = 0; i < elements.length; i++){
            elements[i].style.display = 'none';
        }
        elements = document.getElementsByClassName('modal-postauth');
        for(let i = 0; i < elements.length; i++){
            elements[i].style.display = 'block';
        }

        const pathname = window.location.pathname;
        const hash = window.location.hash;
        routing(pathname, hash);
    }else {
        //User is Null and state moved to signed out
        currentUser = null;
        let elements = document.getElementsByClassName('modal-preauth');
        for(let i = 0; i < elements.length; i++){
            elements[i].style.display = 'block';
        }
        elements = document.getElementsByClassName('modal-postauth');
        for(let i = 0; i < elements.length; i++){
            elements[i].style.display = 'none';
        }

        Elements.root.innerHTML = WelcomeMessage.html;

    }
}
