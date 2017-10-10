import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlansProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlansProvider {
  private plans = [];

  constructor(public http: Http) {
    console.log('Hello PlansProvider Provider');
    let plan = {
      id: 'xx1',
      name: 'plan 1'
    };
    this.plans.push(plan);
    plan = {
      id: 'xx1',
      name: 'plan 2'
    };
    this.plans.push(plan);
  }


  getPlans(){
    return this.plans
  }

  addPlan(planName){
    let newPlan = {
      id: 'xxx',
      name: planName
    }
    this.plans.unshift(newPlan);
  }

}
