import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantsProvider {
  private participants = [];

  constructor(public http: Http) {
    console.log('Hello ParticipantsProvider Provider');
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

  getParticipants(){
    return this.participants
  }

}
