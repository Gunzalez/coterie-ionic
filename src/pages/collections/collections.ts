import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

import { getIcon } from  '../../helpers/helpers';
const DURATION = 1000;

@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html'
})
export class CollectionsPage {

  private plan = {};

  public amount = 0;
  public collection = 0;
  public participants = 0;

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, private plansProvider: PlansProvider) {
    this.plan = this.plansProvider.plan;
  }

  ionViewDidLoad() {
    this.amount = this.plan['savingsAmount'];
    this.participants = parseInt(this.plan['participants'].length);
    this.collection = parseInt(this.plan['savingsAmount']) * this.participants;
  }

  getPlanIcon(){
    return getIcon(this.plan);
  }

  getPlanName(){
    return this.plan['name'];
  }

  getCollection(){
    return this.participants * this.amount;
  }

  setAmount(value){
    let next = response => {
      if( response.ok ){

        // set screen properties
        this.amount = value;
        this.collection = (parseInt(value) * this.participants);
        this.plan['savingsAmount'] = value;

        // go back to previous screen
        this.navCtrl.pop();

        let amountSaveToast = this.toastCtrl.create({
          message: 'Amount set',
          duration: DURATION
        });
        amountSaveToast.present();

      }
    };
    this.plansProvider.setSavingsAmount(value, this.plan['id']).subscribe(next);
  }

  canSetAmount(){
    return this.amount >= 50;
  }

}
