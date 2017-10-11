import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';

@Component({
  selector: 'page-plan-details',
  templateUrl: 'plan-details.html',
})
export class PlanDetailsPage {
  public plan = {};
  private planId;

  constructor(private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.planId = this.navParams.get('planId');
  }

  ionViewDidLoad() {
    this.plansProvider.getAPlan(this.planId)
      .subscribe((response)=>{
        this.plan = response;
      })
  }

  viewParticipants(){
    let plan = {
      id: this.plan['id'],
      name: this.plan['name']
    };
    this.navCtrl.push(ParticipantsPage, plan)
  }
}
