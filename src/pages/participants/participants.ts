import { Component } from '@angular/core';
import { AlertController, reorderArray, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

  public contacts = [];

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider ) {



  }

  ionViewDidLoad() {

    this.contacts.push({
      name: "Martin"
    })

  }



}
