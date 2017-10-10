import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
/**
 * Generated class for the PlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {
  public plans = [];

  constructor(private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.plansProvider.getPlans()
      .subscribe((data)=>{
        this.plans = data.plans;
      })
  }

  addPlan(){

    let addPlanAlert = this.alertCtrl.create({
      title:'Title',
      message: 'Create a new plan',
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
            let planName;
            planName = inputData.planName;
            if(planName.length > 0){

              this.plansProvider.addPlan(planName)
                .subscribe((data)=>{
                  console.log(data.statusText)
                })

              // addPlanAlert.onDidDismiss(()=>{
              //   let addTodoToast = this.toastCtrl.create({
              //     message: 'Todo Added',
              //     duration: 2000,
              //   });
              //
              // });


            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    addPlanAlert.present();

  }

}
