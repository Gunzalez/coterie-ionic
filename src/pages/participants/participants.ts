import { Component } from '@angular/core';
// import { AlertController, ToastController } from 'ionic-angular';

import { Contacts  } from '@ionic-native/contacts';

// import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

  public participants = [];

  constructor(private contacts: Contacts) {}

  ionViewDidLoad() {

    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
      .then(data => {
        this.participants = data
      });

  }



}
