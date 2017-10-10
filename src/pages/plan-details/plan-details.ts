import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-plan-details',
  templateUrl: 'plan-details.html',
})
export class PlanDetailsPage {
  public plan = 'Baine';

  constructor(private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let planId = this.navParams.get('planId');
    this.plansProvider.getAPlan(planId)
      .subscribe((response)=>{
        this.plan = response.name;
      })
  }



}
