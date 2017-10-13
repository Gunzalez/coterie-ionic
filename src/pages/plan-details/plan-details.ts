import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';
import { CollectionsPage } from '../collections/collections';

@Component({
  selector: 'page-plan-details',
  templateUrl: 'plan-details.html',
})
export class PlanDetailsPage {

  private id;

  public plan = {};
  public participants = [];
  public schedule = [];

  constructor(private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
  }

  ionViewWillEnter(){

    let next = (response) => {
      this.plan = response;
      this.schedule = this.plan['schedule'].participants;
      this.participants = this.plan['participants'];

      // stuffing it into service
      this.plansProvider.plan = this.plan;
    };

    this.plansProvider.getAPlan(this.id)
      .subscribe(next);
  }

  viewParticipants(){
    let plan = {
      id: this.plan['id']
    };
    this.navCtrl.push(ParticipantsPage, plan);
  }

  viewAmountsCollection(){
    this.navCtrl.push(CollectionsPage);
  }

}
