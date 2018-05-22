import { Component } from '@angular/core';
// import { AlertController, ToastController } from 'ionic-angular';

// import { Contacts, ContactFieldType  } from '@ionic-native/contacts';

// import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

  public participants = [];

  constructor() {}

  ionViewDidLoad() {

    //const contactFieldType = ['displayName', 'name', 'phoneNumbers', 'emails'];

    // const options = {
    //   filter: "",
    //   multiple: true
    // };

    // this.contacts.find(fields, options)
    //   .then(data => {
    //     this.participants = data
    //   });

  }



}


