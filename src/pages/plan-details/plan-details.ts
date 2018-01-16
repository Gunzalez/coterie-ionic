import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';
import { CollectionsPage } from '../collections/collections';

const DURATION = 2000;

@Component({
  selector: 'page-plan-details',
  templateUrl: 'plan-details.html',
})
export class PlanDetailsPage {

  private id;

  public plan = {};
  public schedule = [];
  public canStart = false;
  public created;

  constructor(private toastCtrl: ToastController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {

    // just messing about with the date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10){
      dd = 0 + dd;
    }
    if(mm<10){
      mm = 0 + mm;
    }
    this.created  = dd + '/' + mm + '/' + yyyy;

  }

  ionViewWillEnter(){

    let next = plan => {
      this.plan = plan;
      this.schedule = this.plan['schedule'].participants;
      if(this.plan['_capabilities'].indexOf('startPlan') !== -1){
        this.canStart = true;
      } else {
        this.canStart = false;
      }

      // stuffing it into service/provider
      this.plansProvider.plan = this.plan;
    };

    this.plansProvider.getAPlan(this.id).subscribe(next);
  }

  viewParticipants(){
    let plan = {
      id: this.plan['id']
    };
    this.navCtrl.push(ParticipantsPage, plan);
  }

  startPlan(){
    
    let next = result => {
      if (result){
        // should hide start button
        let startPlanToast = this.toastCtrl.create({
          message: 'Plan started',
          duration: DURATION,
        });
        startPlanToast.present();
      }
    }
    this.plansProvider.startPlan(this.plan['id']).subscribe(next)
  }

  viewAmountsCollection(){
    this.navCtrl.push(CollectionsPage);
  }

}
