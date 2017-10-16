import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const API: string = 'api/plans/';
@Injectable()
export class PlansProvider {

  public plan = {};

  constructor(public http: Http) {

  }

  getPlans(){

    return this.http.get(API)
      .map(response => response.json())
  }

  addPlan(name){

    let body = {
      name: name
    };

    return this.http.post(API, body).map((response) => {
      return response
    }, error => {
      return error
    })
  }

  getAPlan(id){

    let url = API + id;
    return this.http.get(url)
      .map(response => response.json())
  }

  // uses plan id
  addParticipant(name, id){

    let url = API + id + '/participants';
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

  deletePlan(id){
    let url = API + id;
    console.log(url);
    return this.http.delete(url)
      .map((response) => { response.json()
    });
  }

  // uses plan id
  addSchedule(schedule, id){

    let url = API + id + '/schedule';
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
