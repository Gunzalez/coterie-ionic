import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

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

  private icon: String = '';
  private name: String = '';
  private status: String = '';

  public schedule = [];
  public created = "Monday";

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {};

  ionViewWillEnter(){
    let next = plan => {
      this.plan = plan;
      this.schedule = this.plan['participants'];
      this.plansProvider.plan = this.plan;
    };
    this.plansProvider.getAPlan(this.id).subscribe(next);
  }

  editPlanName(){

    let addPlanAlert = this.alertCtrl.create({
      title:'Edit plan name',
      inputs: [
        {
          type: "text",
          name: 'planName',
          placeholder: '',
          value: this.getPlanName()
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Update",
          handler: (inputData)=>{

            let planName = inputData.planName.trim();
            if(planName.length > 0){

              let next = response => {
                if (response.ok){
                  this.name = planName;
                } else {
                  // error handling
                }
              };
              this.plansProvider.updatePlan(planName, this.id).subscribe(next);

            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    addPlanAlert.present();

  }

  getPlanName() {
    if(this.name !== ''){
      return this.name;
    }
    return this.plan['name'];
  }

  canAddMembers(){
    return this.plan['_capabilities'] && this.plan['_capabilities'].indexOf('addParticipant') !== 1;
  }

  canAddAmount(){
    return !(this.plan['status'] === 'in-progress' || this.schedule.length < 2);
  }

  getStartButtonLabel(){
    return this.plan['status'] === 'in-progress' ? 'Started' : 'Start plan';
  }

  isPlanInProgress(){
    if(this.status !== ''){
      return this.status === 'in-progress'
    }
    return this.plan['status'] === 'in-progress';
  }

  canStartPlan(){
    if(this.isPlanInProgress()){
      return false;
    }
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
    }
    return getIcon(this.plan);
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
