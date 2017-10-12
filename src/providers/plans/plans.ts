import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlansProvider {
  private url = '/api/plans/';

  constructor(public http: Http) {

  }

  getPlans(){

    return this.http.get(this.url)
      .map(response => response.json())
  }

  addPlan(planName){

    let body = {
      name: planName
    };

    return this.http.post(this.url, body).map((response) => {
      return response
    }, error => {
      return error
    })
  }

  getAPlan(planId){

    let url = this.url + planId;

    return this.http.get(url)
      .map(response => response.json())
  }

  addParticipant(name, planId){

    let url = this.url + planId + '/participants';
    let body = {
      name: name
    };

    return this.http.post(url, body).map((response) => {
      return response
    }, error => {
      return error
    })
  }

  addSchedule(schedule, plainId){

    let url = this.url + plainId + '/schedule';

    let body = {
      participants: schedule
    };

    return this.http.put(url, body).map((response) => {
      return response
    }, error => {
      return error
    })

  }

}
