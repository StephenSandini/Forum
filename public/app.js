/***********************************************************  
*           Importing of Folders to gain access to them
***********************************************************/
import * as FirebaseAuthentication from './controller/firebase_auth.js'
import * as Home from './view-page/home_page.js'
import * as About from './view-page/about_page.js'
import {routing} from './controller/route.js'

FirebaseAuthentication.addEventListeners();
Home.addEventListeners();
About.addEventListeners();

/*************************************************************
 *              Browser Window
 *************************************************************
 *      pathname: anything after the '/' in the addressbar
 *      hash:     anything after a '#' after pathname 
 *************************************************************/
window.onload = () => {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    routing(pathname, hash);
};

window.addEventListener('popstate', event => {
    //Prevents the refreshing maintaining single page app
    event.preventDefault(); 
    const pathname = event.target.location.pathname;
    const hash = event.target.location.hash;

    routing(pathname,hash )
});
