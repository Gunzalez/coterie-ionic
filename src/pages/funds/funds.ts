import { Component } from '@angular/core';

import { NavController, NavParams, ViewController} from 'ionic-angular';

import { PlansProvider } from "../../providers/plans/plans";

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
  public isPayment:boolean = false;

  public viewHeader:string = '';
  public actionTypeDone:string = '';
  public actionType:string = '';

  private toDoState:string = '';
  private doneState:string = '';

  public toggleDisabled:boolean = false;
  public doneButtonDisabled:boolean = true;
  public cancelButtonDisabled:boolean = false;

  constructor(private viewCtrl: ViewController, public navParams: NavParams, private navCtrl: NavController, private plansProvider: PlansProvider ) {
      this.participant = this.navParams.get('participant');
      this.pot = this.navParams.get('pot');

      this.isCollection = this.participant.id === this.pot.nextParticipantToCollect;
      this.isPayment = !this.isCollection;

      // console.log(this.pot.nextParticipantsToPay);
      // console.log(this.participant.id);
  }

  ionViewDidLoad() {
      if(this.isCollection){

          this.viewHeader = 'Collection';
          this.actionType = 'Collection due';
          this.actionTypeDone = 'Pot collected';
          this.toDoState = 'basket-outline';
          this.doneState = 'basket';

          if(this.pot.nextParticipantsToPay.length){
              this.doneButtonDisabled = true;
              this.toggleDisabled = true;
          }

      } else {

          this.viewHeader = 'Payment';
          this.actionType = 'Payment due';
          this.actionTypeDone = 'Payment received';
          this.toDoState = 'cash-outline';
          this.doneState = 'cash';

          if(this.pot.nextParticipantsToPay.indexOf(this.participant.id) === -1){
              this.fundStatus = true;
              this.doneButtonDisabled = true;
              this.toggleDisabled = true;
          }
      }
  }

  getFundsActionIcon(){
      return this.fundStatus ? this.doneState : this.toDoState;
  }

  getFundsAction(){
      return this.fundStatus ? this.actionTypeDone : this.actionType;
  }

  setToPaidCollected(){

      this.doneButtonDisabled = false;
      this.toggleDisabled = true;
      this.cancelButtonDisabled = true;

      if(this.isPayment){
          this.plansProvider.makePayment(this.participant, this.pot.id).subscribe(response => {
              // if(response.statusText === 'Accepted'){
              //     const index = this.pot['nextParticipantsToPay'].indexOf(this.participant.id);
              //     const deleteCount = 1;
              //     this.pot['nextParticipantsToPay'].splice(index, deleteCount);
              // }

              if(response.statusText !== 'Accepted'){
                  console.log('There was an error')
              }
          })
      }

      if(this.isCollection){

          this.plansProvider.takeCollection(this.participant, this.pot.id).subscribe(response => {
              if(response.statusText !== 'Accepted'){

                  console.log('There was an error')

              }
          })
      }
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

  onDonePaidCollected(){
      this.viewCtrl.dismiss(true)
  }

  onDismiss(){
      this.navCtrl.pop();
  }

}
