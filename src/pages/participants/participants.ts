import { Component } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

  public allContacts:any;

  constructor(private contacts: Contacts) {

    // contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
    // .then(data => {
    //   this.allContacts = data
    // });
    
  }

  ionViewDidLoad(){
   this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
   .then(data => {
     this.allContacts = data
   });
  }

  ionViewCanLeave(){}
}
