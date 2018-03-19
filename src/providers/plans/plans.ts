import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// const URL: string = 'api';
const URL: string = 'https://coterie-rest-app.herokuapp.com';
const API: string = URL + '/plans/';
@Injectable()
export class PlansProvider {

  public plan = {};
  private headers: Headers;

  constructor(public http: Http) {}

      // ----------------------
      // sets headers
      setHeaders(accessToken){

          // set headers of used for all future calls
          this.headers = new Headers();
          let name = 'Authorization',
              value = 'token:' + accessToken;
          this.headers.append(name, value);
      }


      // ----------------------
      // returns Access Token
      getAccessToken(registrationString){
          let tokenUrl =  URL + '/registrations/' + registrationString;

          // make another get call
          return this.http.get(tokenUrl)
              .map( response => {

                // return just the authorisationToken
                return response.json().authorisationToken
              })
      }


      // ----------------------
      // returns new Registration string
      getRegistrationString(){

          // make post to with empty body
          let registrationsUrl = URL + '/registrations';
          let body = {};

          return this.http.post(registrationsUrl, body)
              .map( response => {

                  let headerPath = response.headers.get('location').split('/');
                  return headerPath[headerPath.length - 1];
              })
      }


      // ----------------------
      // returns all plans
      getPlans(){

          let options = { headers: this.headers };

          return this.http.get(API, options)
            .map( response => response.json())
      }


      // ----------------------
      // returns one plan, accepts plan id
      getAPlan(id){

          let options = { headers: this.headers };
          let url = API + id;

          return this.http.get(url, options)
            .map( response => response.json())
      }

      // ----------------------
      // updates the plan name, accepts new plan name and plan id
      updatePlan(name, id){
        let options = { headers: this.headers };
        let url = API + id;
        let body = [{"op": "replace", "path": "/name", "value": name}];

        return this.http.patch(url, body, options)
          .map( response => {
            return response
          }, error => {
            return error
          })
      }


      // ----------------------
      // add a new plan, accepts plan name
      addPlan(name){

          let options = { headers: this.headers };
          let body = { name: name };

          return this.http.post(API, body, options)
            .map( response => {
            return response
          }, error => {
            return error
          })
      }


      // ----------------------
      // add a participant to a plan, accepts a name + plan id
      addParticipant(name, id){

          let options = { headers: this.headers };
          let url = API + id + '/participants';
          let body = { name: name };

          return this.http.post(url, body, options)
              .map( response => {

                  // returns participant id
                  let headerLocation = response.headers.get('location'),
                    tempArr = headerLocation.split('/');
                  return tempArr[tempArr.length-1];

          }, error => {
              return error
          })
      }


      // ----------------------
      // delete one plan, accepts plan id
      deletePlan(id){

          let options = { headers: this.headers };
          let url = API + id;

          console.log(url);

          return this.http.delete(url, options)
              .map( response => {
              return response.json()
          }, error  => {
              return error
          });
      }



      // ----------------------
      // set savings amount
      setSavingsAmount(value, id){

        let options = { headers: this.headers };
        let url = API + id;
        let body = [{"op": "replace", "path": "/savingsAmount", "value": parseInt(value)}];

        return this.http.patch(url, body, options)
            .map( response => {
            return response
        }, error => {
            return error
        })
      }


      // ----------------------
      // sets order of participants, accepts an array of id + plan id
      setSchedule(schedule, id){

          let options = { headers: this.headers };
          let url = API + id + '/participants';
          let body = { participants: schedule };

          return this.http.patch(url, body, options)
              .map( response => {
              return response
          }, error => {
              return error
          })
      }


      // ----------------------
      // remove a single participant, accepts
      removeParticipant(participant){

          let options = { headers: this.headers };
          let url = API + this.plan['id'] + '/participants/' + participant.id;

          return this.http.delete(url, options)
              .map( response => {
              return response
          }, error => {
              return error
          })
      }


      // ------------------------
      // starts a plan
      startPlan(id){

        let options = { headers: this.headers };
        let url = URL + '/plans.start'
        let body = { planId : id };

        return this.http.post(url, body, options)
            .map( response => {
                // return response.status === 200 ? true : false
                if (response.status === 200){
                    this.plan['status'] = 'in-progress';
                    return true
                } else {
                    return false;
                }
          }, error => {
              console.log(error);
            return error
          })
      }
}
