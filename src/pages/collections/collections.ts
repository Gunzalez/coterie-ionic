import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

const DURATION = 1000;

@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html'
})
export class CollectionsPage {

  private plan = {};

  public amount: String = '';
  public collection: String = '';
  public participants = 0;

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, public navCtrl: NavController, private plansProvider: PlansProvider, public navParams: NavParams) {
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

  getPlanName(){
    return this.plan['name'];
  }

  setAmount(value){
    // todo: validation on value
    this.amount = '£' + value
    this.collection = '£' + (parseInt(value) * this.participants)   

    let next = returnValue => {      
      console.log(returnValue);
      // this.amount = '£' + returnValue
      // this.collection = '£' + (returnValue * this.participants)      
    };
    this.plansProvider.setSavingsAmount(value, this.plan['id']).subscribe(next);
  }

  getCustomAmount(){

    let getCustomAmountAlert = this.alertCtrl.create({
      title:'Amount per participant',
      // message: 'Paid in by each member each time',
      inputs: [
        {
          type: "number",
          // pattern: "\\d*",
          name: 'savingsAmount',
          placeholder: ''
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Set",
          handler: (inputData)=>{
            if(inputData.savingsAmount.length > 0){
              this.setAmount(inputData.savingsAmount);
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    getCustomAmountAlert.present();
  }

}
