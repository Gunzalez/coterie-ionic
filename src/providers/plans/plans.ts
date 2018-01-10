import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

const API: string = 'api/plans/';
// const API: string = 'https://coterie-rest-app.herokuapp.com/plans/';
@Injectable()
export class PlansProvider {

  public plan = {};
  private headers: Headers;

  constructor(public http: Http) {}

      // ----------------------
      // sets headers
      setHeaders(accessToken){

          // set headers ot used for all future calls
          this.headers = new Headers();
          let name = 'Authorization',
              value = 'token:' + accessToken;
          this.headers.append(name, value);
      }


      // ----------------------
      // returns Access Token
      getAccessToken(registrationString){
          let tokenUrl = 'api/registrations/' + registrationString;

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
          let registrationsUrl = 'api/registrations';
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
      // returns one plan, pass in plan id
      getAPlan(id){

          let options = { headers: this.headers };
          let url = API + id;

          return this.http.get(url, options)
            .map( response => response.json())
      }


      // ----------------------
      // add a new plan, pass in plan name
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
      // add a participant to a plan, via plan id
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
      // delete one plan, pass in plan id
      deletePlan(id){

          let options = { headers: this.headers };
          let url = API + id;

          return this.http.delete(url, options)
              .map( response => {
              return response.json()

          }, error  => {
              return error
          });
      }


      // ----------------------
      // uses plan id
      addSchedule(schedule, id){

          let options = { headers: this.headers };
          let url = API + id + '/schedule';
          let body = { participants: schedule };

          return this.http.put(url, body, options)
              .map( response => {
              return response
          }, error => {
              return error
          })
      }


      // ----------------------
      // remove a single participant
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

}
