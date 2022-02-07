//NOTE:Ensure this is the same version as index.html and throughout the project
/*************************************************************************************************************
 *                                      FIRESTORE
 *************************************************************************************************************
 *          getFirestore: allows access to the database
 *          collection:   allows access to the collections in the Firestore
 *          addDoc:       allows access to add documents to the collection
 *          getDocs:      allows access to document ID
 *          query:        queries a collection 
 *          orderBy:      works the same as SQL and allows the sorting of the query
*************************************************************************************************************/
import {getFirestore, collection, addDoc, getDocs, query, orderBy} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js"
import { COLLECTIONS } from "../model/constants.js";
import { Thread } from "../model/thread.js";

const database = getFirestore();

export async function addThread(thread){
    const docRef = await addDoc(collection(database, COLLECTIONS.THREADS), thread.toFirestore());
    //references document id generated from firestore for said document
    return docRef.id;
}

export async function getThreadList(){
    let threadList = [];
    const queries = query(collection(database, COLLECTIONS.THREADS), orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(queries);
    snapShot.forEach(doc =>{
        const thread = new Thread(doc.data());
        thread.set_docID(doc.id);
        threadList.push(thread);
    })
    return threadList;
}