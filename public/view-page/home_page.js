import * as Elements from './elements.js'
import * as ProtectedMessage from './messages/protected_message.js'
import * as Constants from '../model/constants.js'
import * as FirestoreController from '../controller/firestore_controller.js'
import * as Util from './util.js'
import { routePath } from '../controller/route.js';
import { currentUser } from '../controller/firebase_auth.js';
import { Thread } from '../model/thread.js';

export function addEventListeners(){
    Elements.navbarHome.addEventListener('click', () =>{
        history.pushState(null,null,routePath.HOME);
        home_page();
    });

    Elements.formCreateAThread.addEventListener('submit', addNewThread);
}

async function addNewThread(event){
    event.preventDefault();
    //Comes from the form
    const title = event.target.title.value;
    const content = event.target.content.value;
    const keywords = event.target.keywords.value;
    //Comes from Current User
    const uid = currentUser.uid;
    const email = currentUser.email;
    //Date Function
    const timestamp = Date.now();
    //Firebase Uses LowerCase and \S+ finds whitespace /g is find all of them
    const keywordsArray = keywords.toLowerCase().match(/\S+/g);

    const thread = new Thread({
        title,uid,content,email,timestamp,keywordsArray
    });

    try{
        //Creates Document within the Collection
        const docID = await FirestoreController.addThread(thread);
        //Creates a document ID
        thread.set_docID(docID);
        //Refreshes after a new Thread
        home_page();
        Util.informationbox('Success','You have successfully created a thread.', Elements.modalCreateAThread.hide());

    } catch (error){
        if(Constants.DEV) {console.log(error);}
        Util.informationbox('Failed',JSON.stringify(error), Elements.modalCreateAThread.hide());

    }
}

export async function home_page(){
    if(!currentUser){
        Elements.root.innerHTML=ProtectedMessage.html;
        return;
    } 

    let threadList;
    try{
        threadList = await FirestoreController.getThreadList();

    }catch(error){
        if(Constants.DEV){console.log(error);}
        Util.informationbox('Error to get thread list', JSON.stringify(error));
        return;
    }
    buildHomeScreen(threadList);
}

function buildHomeScreen(threadList){
    //Clears All HTML so it doesn't double
    let html = '';
    //This allows for the create a new Thread Button
    html +=`
        <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modal-createathread"> + New Thread</button>
    `
    //This contains the table beginning, completed head, and beginning of the body
    html+=` 
        <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Action</th>
                <th scope="col">Title</th>
                <th scope="col">Keywords</th>
                <th scope="col">Posted By</th>
                <th scope="col">Content</th>
                <th scope="col">Posted At</th>
            </tr>
        </thead>
        <tbody>
    `;
    //Iterates through all the threads to populate as rows in a table.
    threadList.forEach(thread => {
        html+= `
            <tr>
                ${buildThreadView(thread)}
            </tr>
        `;
    })
    //This will close off the table after the list populates
    html+= `</tbody></table>`;

    Elements.root.innerHTML=html;
}

function buildThreadView(thread){
    return `
        <td>View</td>
        <td>${thread.title}</td>
        <td>${!thread.keywordsArray || !Array.isArray(thread.keywordsArray) ? '' : thread.keywordsArray.join(' ')}</td>
        <td>${thread.email}</td>
        <td>${thread.content}</td>
        <td>${new Date(thread.timestamp).toString()}</td>
    `;
}