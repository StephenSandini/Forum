/****************************************************************
 *                  ROUTING
 ****************************************************************
 *      This will allow for the '/page' to be navigated to from
 *      the address bar, as well as the forward and backward
 *      buttons on the browswer.
****************************************************************/
import { home_page } from "../view-page/home_page.js";
import { about_page } from "../view-page/about_page.js";

export const routePath = {
    HOME: '/',
    ABOUT: '/about',
}

export const routes = [
    {path: routePath.HOME, page: home_page},
    {path: routePath.ABOUT, page: about_page},
];

export function routing(pathname, hash){
    const route = routes.find(element => element.path == pathname);
    if(route){ route.page(); }
    else{ routes[0].page(); }
}