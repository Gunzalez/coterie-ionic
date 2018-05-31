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

  private inc = 50;
  private max = 1000;
  private min = 1;

  public schedule = [];
  public created = "Monday";
  public started:string = "-no date-";
  public nextToCollect:string = "-no participant-";
  public round:number = 0;

  public savingsAmount:any = 0;
  public initialAmt:any = 0;

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
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

  amountMinus(){
    this.savingsAmount = parseInt(this.savingsAmount) - this.inc;
    if(this.savingsAmount < this.min){
      this.savingsAmount = this.min
    }
  }

  amountPlus(){
    this.savingsAmount = parseInt(this.savingsAmount) + this.inc;
    if(this.savingsAmount >= (this.max + 1)){
      this.savingsAmount = this.max
    }
  }

  hasReachedMax(){
    return this.savingsAmount >= (this.max + 1)
  }

  hasReachedMin(){
    return this.savingsAmount < this.min
  }

  ionViewWillEnter(){
    let next = plan => {
      this.plan = plan;
      this.schedule = this.plan['participants'];
      this.plansProvider.plan = this.plan;
      this.savingsAmount = this.plan['savingsAmount'];
      this.initialAmt = this.savingsAmount;
    };
    this.plansProvider.getAPlan(this.id).subscribe(next);
  }


  canSetAmount(){
    return this.initialAmt !== this.savingsAmount && this.savingsAmount > 0 && this.savingsAmount < (this.max + 1);
  }

  setAmount(){
    let next = response => {
      if( response.ok ){
        // set screen properties
        this.savingsAmount = parseInt(this.savingsAmount)
        this.initialAmt = parseInt(this.savingsAmount);
        let amountSaveToast = this.toastCtrl.create({
          message: 'Amount set',
          duration: DURATION
        });
        amountSaveToast.present();
      }
    };
    this.plansProvider.setSavingsAmount(this.savingsAmount, this.plan['id']).subscribe(next);
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
