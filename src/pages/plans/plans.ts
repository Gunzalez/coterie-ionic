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

  constructor(private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.plansProvider.getPlans()
      .subscribe((data)=>{
        this.plans = data.plans;
      })
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
            let planName,
              planId;

            planName = inputData.planName;
            if(planName.length > 0){

              this.plansProvider.addPlan(planName)
                .subscribe((data)=>{
                  planId = data.headers.get('location').replace(/\/plans\//gi, "");
                });

              addPlanAlert.onDidDismiss(()=>{
                this.navCtrl.push(PlanDetailsPage, {
                  planId: planId
                });
              });

            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    addPlanAlert.present();

  }

  viewPlan(planId){
    this.navCtrl.push(PlanDetailsPage, {
      planId: planId
    })
  }

}
