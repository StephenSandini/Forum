import { modalInformationBox } from "./elements.js";

export function informationbox(title, body, closeModal){
    if(closeModal) {closeModal.hide();}
    modalInformationBox.title.innerHTML=title;
    modalInformationBox.body.innerHTML=body;
    modalInformationBox.modal.show();
}