import { Component, Input, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { PlanDetailsPage } from '../plan-details/plan-details';

import { getIcon } from  '../../helpers/helpers';

@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html'
})
export class PlansPage {
  public plans = [];
  public created = "Monday";

  constructor(private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController) {

  }

  @ViewChild('input') myInput;



  ionViewDidLoad() {

    //just messing about with the date
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

    let timeout = 600;
    let handler = () => {
      this.myInput.setFocus();
    };
    setTimeout(handler,timeout);

  }

  ionViewWillEnter() {
    this.getAllPlans();
  }

  getAllPlans(){
    let next = data => {
      this.plans = data.plans;
    };
    this.plansProvider.getPlans().subscribe(next);
  }

  getPlanIcon(plan){
    return getIcon(plan)
  }

  canBeDeleted(plan){
    return plan['status'] === 'created'
  }

  deleteOrArchive(plan){
    if(this.canBeDeleted(plan)){
      // let next = response => {
      //   if(response.ok){
      //     this.getAllPlans();
      //   }
      // };
      // this.plansProvider.deletePlan(plan['id']).subscribe(next);
    } else {
      // console.log('Archive')
    }

  }

  getIconColour(plan){
    let icon = this.getPlanIcon(plan);
    let colour = 'new';
    switch(icon){
      case 'rainy':
          colour = 'secondary';
          break;
      case 'cloud':
          colour = 'black';
          break;
      default:
        colour = 'new';
        break;
      }
    return colour;
  }

  addPlan(){

    let addPlanAlert = this.alertCtrl.create({
      title:'Plan name',
      // message: 'Anything descriptive',
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

            let id = '';
            let planName = inputData.planName.trim();

            if(planName.length > 0){

              let next = data => {

                let pathArr = data.headers.get('location').split('/');
                id = pathArr[pathArr.length - 1];
                let params = { id: id };
                this.navCtrl.push(PlanDetailsPage, params);

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

  viewPlan(plan){
    let params = { id: plan.id };
    this.navCtrl.push(PlanDetailsPage, params);
  }

}
