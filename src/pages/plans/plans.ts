import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
/**
 * Generated class for the PlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {
  public plans = [];

  constructor(private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlansPage');
    this.plans = this.plansProvider.getPlans();
  }

}
