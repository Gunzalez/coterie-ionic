import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlansProvider {

  private url = '/api/plans/';

  public plan = {};

  constructor(public http: Http) {

  }

  getPlans(){

    return this.http.get(this.url)
      .map(response => response.json())
  }

  addPlan(name){

    let body = {
      name: name
    };

    return this.http.post(this.url, body).map((response) => {
      return response
    }, error => {
      return error
    })
  }

  getAPlan(id){

    let url = this.url + id;
    return this.http.get(url)
      .map(response => response.json())
  }

  // uses plan id
  addParticipant(name, id){

    let url = this.url + id + '/participants';
    let body = {
      name: name
    };

    return this.http.post(url, body).map((response) => {

      // returns participant id
      let headerLocation = response.headers.get('location'),
        tempArr = headerLocation.split('/');
      return tempArr[tempArr.length-1];

    }, error => {
      return error
    })
  }

  // uses plan id
  addSchedule(schedule, id){

    let url = this.url + id + '/schedule';
    let body = {
      participants: schedule
    };

    return this.http.put(url, body).map(response => {
      return response
    }, error => {
      return error
    })

  }

}
