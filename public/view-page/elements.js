/******************************************************************************************************
 *                                      ROOT ELEMENT
*******************************************************************************************************/
export const root = document.getElementById('root');

/*******************************************************************************************************
 *                                      FORMS
*******************************************************************************************************/
export const formsSignIn = document.getElementById('form-signin');

/*******************************************************************************************************
 *                                NAVIGATION BAR BUTTONS
*******************************************************************************************************/
export const navbarSignOut = document.getElementById('navbar-signout');
export const navbarHome = document.getElementById('navbar-home');
export const navbarAbout = document.getElementById('navbar-about');


/******************************************************************************************************
 *                                  POPUP INFORMATION BOX 
******************************************************************************************************
 *        This allows for a versatile modal that could be implemented as needed to display information.
 *        modal: 'static' so the user cannot click off of it to close the window, forcing the user to
 *               acknowledge the popup.  Information to modify this is on said link:
 *               https://getbootstrap.com/docs/5.1/components/modal/   search for Via JavaScript.
 *        title: pulled from the index.html that is the ID name for the modal's title.  This area will
 *               be the title of the window that is displayed to the user.  Should be relavent to the
 *               information we are wanting to depict.
 *        body: pulled from the index.html that is the ID name for the modal's body. This area will
 *              dictate what we display or convey to the user like but not limited to signing out or
 *              items purchased or bug reported, etc.
******************************************************************************************************/
export const modalInformationBox = {
    modal:  new bootstrap.Modal(document.getElementById('modal-informationbox'), {backdrop: 'static'}),
    title:  document.getElementById('modal-informationbox-title'),
    body:   document.getElementById('modal-informationbox-body'),
}
/******************************************************************************************************
 *                                  SIGN IN MODAL  
*******************************************************************************************************
 *          This to allow editing of the sign in modal for users, similar to the one above.
******************************************************************************************************/ 
export const modalSignIn = new bootstrap.Modal(document.getElementById('modal-signin-form'), {backdrop:'static'});
