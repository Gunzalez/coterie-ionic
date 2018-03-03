import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';
import { CollectionsPage } from '../collections/collections';

const DURATION = 1000;

@Component({
  selector: 'page-plan-details',
  templateUrl: 'plan-details.html'
})
export class PlanDetailsPage {

  private id;

  public plan = {};
  public schedule = [];
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
  };

  ionViewWillEnter(){

    let next = plan => {
      this.plan = plan;
      this.schedule = this.plan['participants'];
      this.plansProvider.plan = this.plan;
    };
    this.plansProvider.getAPlan(this.id).subscribe(next);
  }

  canAddMembers(){
    return this.plan['status'] !== 'in-progress'
  }

  canAddAmount(){
    return this.plan['status'] !== 'in-progress'
  }

  canStartPlan(){
    if(this.plan['status'] && this.plan['_capabilities']){
      return this.plan['status'] === 'in-progress' || this.plan['_capabilities'].indexOf('startPlan') === -1 ? false : true
    }
  }

  getPlanStatusColor(){
    return this.plan['status'] === 'in-progress' ? 'secondary' : null 
  }

  getPlanIcon(){
    return this.plansProvider.getPlanIcon();
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
        let startPlanToast = this.toastCtrl.create({
          message: 'Plan started',
          duration: DURATION,
        });
        startPlanToast.present();
      }
    };
    this.plansProvider.startPlan(this.plan['id']).subscribe(next)
  }
  
  viewAmountsCollection(){
    this.navCtrl.push(CollectionsPage);
  }

}
