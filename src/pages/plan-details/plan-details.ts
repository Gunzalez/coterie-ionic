import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';
import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-plan-details',
  templateUrl: 'plan-details.html',
})
export class PlanDetailsPage {
  private planId;
  public plan = {};
  public participants = [];
  public schedule = [];

  constructor(private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.planId = this.navParams.get('planId');
  }

  ionViewWillEnter() {
    this.plansProvider.getAPlan(this.planId)
      .subscribe((response)=>{
        this.plan = response;
        this.schedule = this.plan['schedule'].participants;
        this.participants = this.plan['participants'];
      })
  }

  viewParticipants(){
    let plan = {
      id: this.plan['id']
    };
    this.navCtrl.push(ParticipantsPage, plan);
  }

  viewSchedule(){
    let plan = {
      id: this.plan['id']
    };
    this.navCtrl.push(SchedulePage, plan);
  }

}
