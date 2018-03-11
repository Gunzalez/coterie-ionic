import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';
import { CollectionsPage } from '../collections/collections';

import { getIcon } from '../../helpers/helpers';
const DURATION = 1000;

@Component({
  selector: 'page-plan-details',
  templateUrl: 'plan-details.html'
})
export class PlanDetailsPage {

  private id;
  private plan = {};
  icon: String = '';

  public schedule = [];
  public created = "Monday";

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
  };

  ionViewWillEnter(){

    let next = plan => {
      this.plan = plan;
      this.schedule = this.plan['participants'];
      this.plansProvider.plan = this.plan;
    };
    this.plansProvider.getAPlan(this.id).subscribe(next);
  }

  getPlanName() {
    return this.plan['name'];
  }

  canAddMembers(){
    return this.plan['_capabilities'] && this.plan['_capabilities'].indexOf('addParticipant') !== 1;
  }

  canAddAmount(){
    return !(this.plan['status'] === 'in-progress' || this.schedule.length < 2);
  }

  getStartButtonLabel(){
    return this.plan['status'] === 'in-progress' ? 'Plan started' : 'Start plan';
  }

  isPlanInProgress(){
    return this.plan['status'] === 'in-progress'
  }

  canStartPlan(){
    return this.plan['_capabilities'] && this.plan['_capabilities'].indexOf('startPlan') !== -1 && this.plan['savingsAmount'] > 0 && this.plan['participants'].length > 0;
  }

  getSavingsAmount(){
    return this.plan['savingsAmount'];
  }

  getPlanStatusColor(){
    return this.plan['status'] === 'in-progress' ? 'secondary' : null
  }

  getPlanIcon(){
    if(this.icon !== ''){
      return this.icon;
    } else {
      return getIcon(this.plan);
    }
  }

  viewParticipants(){
    this.navCtrl.push(ParticipantsPage);
  }

  viewAmountsCollection(){
    this.navCtrl.push(CollectionsPage);
  }

  startPlan(){

    let next = result => {
      if (result){
        this.icon = 'rainy';
        let startPlanToast = this.toastCtrl.create({
          message: 'Plan started',
          duration: DURATION,
        });
        startPlanToast.present();
      }
    };
    this.plansProvider.startPlan(this.plan['id']).subscribe(next)
  }

}
