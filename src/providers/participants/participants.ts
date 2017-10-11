import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantsProvider {
  private url = '/api/plans/';
  private participants = [];

  constructor(public http: Http) {

    let participant = {
      id: "1",
      name: "john"
    };
    this.participants.push(participant);
    participant = {
      id: "2",
      name: "Mary"
    };
    this.participants.push(participant);
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

  removeParticipant(id){

  }

  getParticipants(){

  }

}
