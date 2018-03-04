import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html'
})
export class CollectionsPage {

  private plan = {};

  public amount: String = '';
  public collection: String = '';
  public participants = 0;

  constructor(public navCtrl: NavController, private plansProvider: PlansProvider, public navParams: NavParams) {
    this.plan = this.plansProvider.plan;
  }

  ionViewDidLoad() {
    this.amount = '£' + this.plan['savingsAmount'];
    this.participants = parseInt(this.plan['participants'].length)
    this.collection = '£' + parseInt(this.plan['savingsAmount']) * this.participants;
  }

  getPlanIcon(){
    return this.plansProvider.getPlanIcon();
  }

  isNumber(event){
    return event.charCode >= 48 && event.charCode <= 57;
  }

  setAmount(value){
    this.amount = '£' + value
    this.collection = '£' + (parseInt(value) * this.participants)
  }

}
