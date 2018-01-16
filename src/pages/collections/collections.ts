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
  public canStart;
  public status;

  public schedule = [];

  constructor(public navCtrl: NavController, private plansProvider: PlansProvider, public navParams: NavParams) {

    this.plan = this.plansProvider.plan;
    this.id = this.plan['id'];
    this.schedule = this.plan['schedule'].participants;
    this.participants = this.plan['participants'];
    if(this.plan['_capabilities'].length < 1){
      this.status = 'rainy' // started 
    } else {
      if(this.plan['_capabilities'].indexOf('startPlan') !== -1){
        this.status = 'cloud'; // can start plan
      } else {
        this.status = 'cloud-outline'; // can not start plan
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionsPage');
  }

}
