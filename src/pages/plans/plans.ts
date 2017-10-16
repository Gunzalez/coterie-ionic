import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { PlanDetailsPage } from '../plan-details/plan-details';

@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {
  public plans = [];
  public created;

  constructor(private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
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

  ionViewWillEnter() {

    let next = (data) => {
      this.plans = data.plans;
    };
    this.plansProvider.getPlans().subscribe(next);
  }

  addPlan(){

    let addPlanAlert = this.alertCtrl.create({
      title:'Plan title',
      message: 'Short but descriptive',
      inputs: [
        {
          type: "text",
          name: 'planName',
          placeholder: '',
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Add",
          handler: (inputData)=>{

            let planName, id = '';
            planName = inputData.planName;

            if(planName.length > 0){

              let next = data => {

                let pathArr = data.headers.get('location').split('/');
                id = pathArr[pathArr.length - 1];
                let params = { id: id };
                if(id.length > 5){
                  this.navCtrl.push(PlanDetailsPage, params);
                } else {
                  alert('Nowt')
                }
              };
              this.plansProvider.addPlan(planName).subscribe(next);

            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    addPlanAlert.present();

  }

  viewPlan(id){
    let params = { id: id };
    this.navCtrl.push(PlanDetailsPage, params);
  }

}
