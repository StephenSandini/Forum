/**************************************************
     *          Created Thread Class
**************************************************/

export class Thread {
    constructor(data) {
        this.uid = data.uid;
        this.email = data.email;
        this.title = data.title;
        this.timestamp = data.timestamp;
        this.content = data.content;
        this.keywordsArray = data.keywordsArray;
    }

    /**************************************************
     *      Setter for the Document ID
    **************************************************/
    set_docID(ID){
        this.docID = ID;
    }

    /**************************************************
     *          toFirestore Method
     *************************************************
     *      This method will serialize the data so 
     *      that it will be compatible with the 
     *      Firestore. A link to supported types:
     *      https://cloud.google.com/firestore/docs/concepts/data-types
     *      Acceptable types:
     *      -boolean
     *      -array
     *      -string
     *      -map
     *      -timestamp
     *      -floating-point & integer
    **************************************************/
    toFirestore(){
        return {
            uid:            this.uid,
            email:          this.email,
            title:          this.title,
            timestamp:      this.timestamp,
            content:        this.content,
            keywordsArray:  this.keywordsArray,
        };
    }
}