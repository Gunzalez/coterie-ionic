import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import {PlansProvider} from "../../providers/plans/plans";

@Component({
  selector: 'page-funds',
  templateUrl: 'funds.html',
})
export class FundsPage {

  public pot:any;
  public participant:any;
  public fundsAction:string = '';

  constructor(public navParams: NavParams, private plansProvider: PlansProvider) {
      this.participant = this.navParams.get('participant');
      this.pot = this.navParams.get('pot');
  }

  ionViewDidLoad() {
      if(this.participant.awaitingCollection){
          this.fundsAction = 'Collection'
      } else {
          this.fundsAction = 'Payment'
      }
      console.log(this.participant);
  }

  getPotName(){
      return this.pot.name;
  }

  getParticipantName(){
      return this.participant.name
  }

}
