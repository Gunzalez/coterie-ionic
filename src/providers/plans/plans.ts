import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlansProvider {

  constructor(public http: Http) {
    //console.log('Hello PlansProvider Provider');
  }

  getPlans(){
    return this.http.get('/api/plans')
      .map(response => response.json())
  }

  addPlan(planName){
    return this.http.post('/api/plans', {
      name: planName
    }).map((response) => {
      return response
    }, error => {
      return error
    })
  }

}
