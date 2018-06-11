import { Component, ViewChild } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { PlanDetailsPage as PotDetailsPage } from '../plan-details/plan-details';

import { PlansProvider } from '../../providers/plans/plans';

import { getIcon } from "../../helpers/helpers";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public plans = [];
    public created:string = "Monday";
    public newPlanName:string = 'New';

    private addMode:boolean = false;
    private plansHasLoaded:boolean = false;
    private loading:any = null;

    @ViewChild('input') myInput;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private plansProvider: PlansProvider) {
        // nothing to code here
    }

    ionViewDidLoad() {
        this.createAndSetAccessToken();

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

    ionViewWillEnter() {
        this.newPlanName = '';
        this.addMode = false;
        this.displayLoadingSpinner();
        this.getAllPlans();
    }

    createAndSetAccessToken(){

      if (typeof(Storage) !== "undefined") {

        let key = 'accessToken';

        if(localStorage.getItem(key) === null){
          // no access token saved, create a new one

          let whatComesNext = registrationString => {

            let whatComesNext = authorisationToken  => {

              // save new token in local storage
              localStorage.setItem(key, authorisationToken);

              // set headers with this new token
              this.plansProvider.setHeaders(authorisationToken);

            };
            this.plansProvider.getAccessToken(registrationString).subscribe(whatComesNext)

          };
          this.plansProvider.getRegistrationString().subscribe(whatComesNext);

        } else {

          // set headers with existing access token in local storage
          this.plansProvider.setHeaders(localStorage.getItem(key));

        }

      } else {

        // redirect to error page
        // no local storage on this machine

      }

    }

    allowedAction(){
      return this.newPlanName.length ? "Add" : "New"
    }

    displayLoadingSpinner() {
      this.plansHasLoaded = false;
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
    }

    getAllPlans(){
        this.plansProvider.getPlans().subscribe(data => {
            this.plans = data.plans.reverse();
            this.loading.dismiss();
            this.plansHasLoaded = true;
        });
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
          this.navCtrl.push(PotDetailsPage, params);
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
      this.navCtrl.push(PotDetailsPage, params);
    }
}
