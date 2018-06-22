import { Component } from '@angular/core';

import { NavController, NavParams, ViewController} from 'ionic-angular';

// import { PlansProvider } from "../../providers/plans/plans";

import { currencyConvert } from '../../helpers/helpers';

@Component({
  selector: 'page-funds',
  templateUrl: 'funds.html',
})
export class FundsPage {

  public pot:any;
  public participant:any;
  public fundStatus:boolean = false;
  public isCollection:boolean = false;
  public controlDisabled:boolean = false;

  public fundsAction:string = '';
  public fundsActionDone:string = '';

  private toDoState:string = '';
  private doneState:string = '';

  constructor(private viewCtrl: ViewController, public navParams: NavParams, private navCtrl: NavController ) {
      this.participant = this.navParams.get('participant');
      this.pot = this.navParams.get('pot');
      this.isCollection = this.participant.id === this.pot.nextParticipantToCollect;

      console.log(this.pot.nextParticipantsToPay);
      console.log(this.participant.id);
  }

  ionViewDidLoad() {
      if(this.isCollection){
          this.fundsAction = 'Collection';
          this.fundsActionDone = 'Collection taken';
          this.toDoState = 'basket-outline';
          this.doneState = 'basket';
      } else {
          this.fundsAction = 'Payment';
          this.fundsActionDone = 'Payment made';
          this.toDoState = 'cash-outline';
          this.doneState = 'cash';
      }
  }

  getFundsActionIcon(){
      return this.fundStatus ? this.doneState : this.toDoState;
  }

  getFundsAction(){
      return this.fundStatus ? this.fundsActionDone : this.fundsAction;
  }

  setToPaidCollected(){



      this.controlDisabled = true
  }

  getCollection(){
      const value = this.pot.savingsAmount * (this.pot.participants.length - 1);
      return currencyConvert(value);
  }

  getSavingsAmount(){
      return currencyConvert(this.pot.savingsAmount);
  }

  getPotName(){
      return this.pot.name;
  }

  getParticipantName(){
      return this.participant.name
  }

  onSaveParticipants(){
      this.viewCtrl.dismiss(this.participant)
  }

  onDismiss(){
      this.navCtrl.pop();
  }

}
