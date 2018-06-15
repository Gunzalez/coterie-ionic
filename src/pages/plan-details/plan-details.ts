import { Component } from '@angular/core';
import { NavParams, ToastController, AlertController, ModalController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';

const DURATION = 2000;
const CURRENCY = '£';

@Component({
    selector: 'page-plan-details',
    templateUrl: 'plan-details.html'
})
export class PlanDetailsPage {
    public id;
    private plan = {};

    private icon:string= '';
    private name:string = '';
    private status:string = '';

    private inc = 100;
    public max = 2500;
    private min = 1;

    public schedule = [];
    public created = "Monday";
    public started:string = "not started";
    public rounds:string = "not set";
    public nextToCollect:string = "no participant";

    public savingsAmount:any = 0;
    public initialAmt:any = 0;

    constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navParams: NavParams) {
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
        return this.savingsAmount >= (this.max)
    }

    hasReachedMin(){
        return this.savingsAmount < this.min
    }

    ionViewWillEnter(){
        let next = plan => {
            this.plan = plan;

            // correction
            //this.schedule = this.plan['participants'];
            this.plan['participants'].forEach(participant => {
                this.schedule.push({
                    contactId: parseInt(participant.contactId),
                    id: participant.id
                })
            });
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
        this.plansProvider.setSavingsAmount(this.savingsAmount, this.plan['id']).subscribe(response => {
            if( response.ok ){
                // set screen properties
                this.savingsAmount = parseInt(this.savingsAmount);
                this.initialAmt = parseInt(this.savingsAmount);
                let amountSaveToast = this.toastCtrl.create({
                    message: 'Saving amount set at ' + CURRENCY + this.savingsAmount,
                    duration: DURATION
                });
                amountSaveToast.present();
            }
        });
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

  getStartButtonLabel(){
      return this.plan['status'] === 'in-progress' ? 'Started' : 'Start Plan';
  }

  isPlanInProgress(){
    if(this.status !== ''){
      return this.status === 'in-progress'
    }
    return this.plan['status'] === 'in-progress';
  }

  canStartPlan(){
    return this.savingsAmount > 0 && this.schedule.length;
  }

  getPlanStatusColor(){
    return this.plan['status'] === 'in-progress' ? 'secondary' : null
  }

  viewParticipants(){
      let participantsModal = this.modalCtrl.create(ParticipantsPage, { list: this.schedule, potId: this.id  });
      participantsModal.onDidDismiss( participants => {
          if(participants){
              this.schedule = participants;
              if(this.schedule.length){
                  this.nextToCollect = this.schedule[0].name;
                  this.rounds = "1 of " + this.schedule.length;
              }

          }
      });
      participantsModal.present();
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
