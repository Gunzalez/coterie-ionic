import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../../pages/participants/participants';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  private planId;
  private participants;
  public plan = {};
  public schedule = [];

  constructor(private modalCtrl: ModalController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.planId = this.navParams.get('id');
  }

  ionViewWillEnter() {
    this.plansProvider.getAPlan(this.planId)
      .subscribe((response)=>{
        this.plan = response;

        this.schedule = this.plan['schedule'].participants;
        this.participants = this.plan['participants'];
      })
  }

  addParticipants(){
    let plan = {
      id: this.plan['id']
    };
    let participantsModal = this.modalCtrl.create(ParticipantsPage, plan);
    participantsModal.onDidDismiss((data)=>{
      this.schedule = data.schedule;
    });
    participantsModal.present();

  }


  itemReorded(){

  }
}
