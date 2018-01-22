import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html',
})
export class CollectionsPage {

  private id = '';
  private plan = {};
  private participants = [];
  public icon;

  constructor(public navCtrl: NavController, private plansProvider: PlansProvider, public navParams: NavParams) {

    this.plan = this.plansProvider.plan;
    this.id = this.plan['id'];
    this.participants = this.plan['participants'];

    if(this.plan['status'] === 'in-progress'){
      this.icon = 'rainy' // started
    } else {
      if(this.plan['_capabilities'].indexOf('startPlan') !== -1){
        this.icon = 'cloud'; // can start plan
      } else {
        this.icon = 'cloud-outline'; // can not start plan
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionsPage');
  }

}
