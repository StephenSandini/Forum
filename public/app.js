/***********************************************************  
*           Importing of Folders to gain access to them
***********************************************************/
import * as FirebaseAuthentication from './controller/firebase_auth.js'
import * as Home from './view-page/home_page.js'
import * as About from './view-page/about_page.js'

FirebaseAuthentication.addEventListeners();
Home.addEventListeners();
About.addEventListeners();