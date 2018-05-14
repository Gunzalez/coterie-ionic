import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';

import { PlansProvider } from '../../providers/plans/plans';
import { PlanDetailsPage } from '../plan-details/plan-details';

import { getIcon } from  '../../helpers/helpers';

@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html'
})
export class PlansPage {
  public plans = [];
  public created:string = "Monday";
  public newPlanName:string = '';

  private addMode: Boolean = false;
  private plansHasLoaded: Boolean = false;
  private loading:any = null;

  @ViewChild('input') myInput;

  constructor(private plansProvider: PlansProvider, public loadingCtrl: LoadingController, public navCtrl: NavController) {}


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



  }

  allowedAction(){
    return this.newPlanName.length ? "Save" : "New"
  }

  displayLoadingSpinner() {
    this.plansHasLoaded = false;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ionViewWillEnter() {
    this.newPlanName = '';
    this.addMode = false;
    this.displayLoadingSpinner();
    this.getAllPlans();
  }

  getAllPlans(){
    let next = data => {
      this.plans = data.plans.reverse();
      this.loading.dismiss();
      this.plansHasLoaded = true;
    };
    this.plansProvider.getPlans().subscribe(next);
  }

  isInAddMode(){
    return this.addMode;
  }

  getPlanIcon(plan){
    return getIcon(plan)
  }

  canBeDeleted(plan){
    return plan['_capabilities'].indexOf("cancelPlan") !== -1
  }

  deleteOrArchive(plan){
    if(this.canBeDeleted(plan)){
      let next = response => {
        if(response){
          this.displayLoadingSpinner();
          this.getAllPlans();
        }
      };
      this.plansProvider.deletePlan(plan['id']).subscribe(next);
    } else {
      // console.log('Archive')
      console.log('Snoo[')
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

  addButtonClicked(){
    if(this.newPlanName.trim().length){
      let planName = this.newPlanName.trim();
      let next = data => {
        this.newPlanName = '';
        let pathArr = data.headers.get('location').split('/');
        let id = pathArr[pathArr.length - 1];
        let params = { id: id };
        this.navCtrl.push(PlanDetailsPage, params);
      };
      this.plansProvider.addPlan(planName).subscribe(next);
    } else {
      this.addMode = true;
      this.myInput.setFocus();
    }
  }

  resignFocus(){
    this.addMode = false;
    this.newPlanName = '';
  }

  viewPlan(plan){
    let params = { id: plan.id };
    this.navCtrl.push(PlanDetailsPage, params);
  }

}
