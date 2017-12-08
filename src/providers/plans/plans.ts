import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const API: string = 'api/plans/';
@Injectable()
export class PlansProvider {

  public plan = {};
  private administrator = null;

  constructor(public http: Http) {



  }

  setAdministrator(){
    if (typeof(Storage) !== "undefined") {
      if(localStorage.getItem("administrator") !== null){
        this.administrator = localStorage.getItem("administrator")
      } else {

        let url = 'api/registrations',
          body = {};
        return this.http.post(url,body)
          .map(response => {
            let headerPath = response.headers.get('location').split('/');
              this.administrator = headerPath[headerPath.length - 1];

              return(this.administrator);
          })
      }
    }
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
    return this.http.delete(url).map(response => {
      return response.json()
    }, error  => {
      return error
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

  removeParticipant(participant){

    let url = API + this.plan['id'] + '/participants/' + participant.id;

    return this.http.delete(url).map(response => {
      return response
    }, error => {
      return error
    })


  }

}
