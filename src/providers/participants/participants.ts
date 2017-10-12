import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantsProvider {
  private url = '/api/plans/';

  constructor(public http: Http) {

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

  removeParticipant(id){

  }

  getParticipants(){

  }

}
