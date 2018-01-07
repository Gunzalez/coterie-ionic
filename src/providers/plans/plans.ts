import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

const API: string = 'api/plans/';
@Injectable()
export class PlansProvider {

  public plan = {};
  private headers: Headers;

  constructor(public http: Http) {}

  setAccessToken(administrator){

    let url = 'api/registrations/'+ administrator;

    return this.http.get(url)
      .map(response => {
        this.headers = new Headers();
        let name = 'Authorization',
          value = 'token:' + response.json().authorisationToken;
        this.headers.append(name, value);
        return true
      })
  }

  getNewAdministrator(){

    let url = 'api/registrations';
    let body = {};

    return this.http.post(url, body)
      .map(response => {
        let headerPath = response.headers.get('location').split('/');
        return(headerPath[headerPath.length - 1]);
      })
  }

  getPlans(){

    let options = { headers: this.headers };

    return this.http.get(API, options)
      .map(response => response.json())
  }

  getAPlan(id){

    let url = API + id;
    let options = { headers: this.headers };

    return this.http.get(url, options)
      .map(response => response.json())
  }

  addPlan(name){

    let options = { headers: this.headers };
    let body = { name: name };

    return this.http.post(API, body, options)
      .map((response) => {
      return response
    }, error => {
      return error
    })
  }

  addParticipant(name, id){

    let url = API + id + '/participants';
    let body = { name: name };
    let options = { headers: this.headers };

    return this.http.post(url, body, options)
      .map((response) => {

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
    let options = { headers: this.headers };

    return this.http.delete(url, options)
      .map(response => {
      return response.json()
    }, error  => {
      return error
    });
  }

  // uses plan id
  addSchedule(schedule, id){

    let url = API + id + '/schedule';
    let body = { participants: schedule };
    let options = { headers: this.headers };

    return this.http.put(url, body, options)
      .map(response => {
      return response
    }, error => {
      return error
    })
  }

  // remove a single participant
  removeParticipant(participant){

    let url = API + this.plan['id'] + '/participants/' + participant.id;
    let options = { headers: this.headers };

    return this.http.delete(url, options)
      .map(response => {
      return response
    }, error => {
      return error
    })

  }
}
