import { Component, trigger, transition, style, animate } from '@angular/core';

import { ViewController, NavController, ToastController, NavParams, reorderArray } from 'ionic-angular';

import { isEquivalent, filtered } from '../../helpers/helpers';
import {PlansProvider} from "../../providers/plans/plans";

const DURATION = 1000;

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0', 'transform': 'scale3d(.1,.1,.1)' }),
        animate('0.25s ease-out', style({ opacity: '1', 'transform': 'scale3d(1,1,1)' })),
      ]),
    ]),
  ],
})
export class ParticipantsPage {

    private potId:string = '';
    private contactsList:any[] = [];
    private contactsFiltered:any[] = [];

    public myInput:string = '';

    public participantsList:any[] = [
      {
        "id":5,
        "name":"Andrew",
        "number":"07851236201"
      },
      {
        "id":1,
        "name":"Segun",
        "number":"07851246201"
      },
      {
        "id":2,
        "name":"Hasan",
        "number":"02084001826"
      },
      {
        "id":6,
        "name":"Karl",
        "number":"0800836201"
      },
      {
        "id":9,
        "name":"Keon",
        "number":"0760451236"
      },
      {
        "id":4,
        "name":"Titi",
        "number":"0700051236"
      }
    ];
    public participantsListInitial:any[] = [];

    public participantName:string = '';
    public participantNumber:string = '';

    constructor(private viewCtrl: ViewController, public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private plansProvider: PlansProvider) {
        this.participantsList = this.navParams.get('list');
        this.potId = this.navParams.get('potId');
        this.participantsListInitial = this.participantsList.slice();

        //console.log(this.participantsList);

    }

    ionViewDidLoad(){

    }

    participantsChanged(){
        return JSON.stringify(this.participantsList) === JSON.stringify(this.participantsListInitial);
    }


    onInput(){
        this.contactsFiltered = filtered(this.myInput, this.contactsList);
    }

    onClickContact(contact){

        if(contact.isParticipant){

            // remove from participants
            this.participantsList.forEach((participant, index) => {

                this.contactsFiltered.forEach(contactCopy => {
                    if(isEquivalent(contactCopy, contact)){
                        contactCopy.isParticipant = false
                    }
                });

                participant.isParticipant = false;
                contact.isParticipant = false;

                if(isEquivalent(participant, contact)){
                    this.participantsList.splice(index, 1).pop();
                }
            })

        } else {

            // add to participants
            this.contactsFiltered.forEach(contactCopy => {
                if(isEquivalent(contactCopy, contact)){
                    contactCopy.isParticipant = true;
                    contact.isParticipant = true;
                    let participant = Object.assign({}, contact);
                    this.participantsList.push(participant);
                }
            });
        }
    }

    onAddParticipant(){
        let participantName = this.participantName;
        this.plansProvider.addParticipant(participantName, this.potId).subscribe(participantId =>{
            let newParticipant = {
                id: participantId,
                name: this.participantName,
                number: this.participantNumber
            };
            this.participantsList.unshift(newParticipant);
            this.participantName = '';
            this.participantNumber = '';
        });
    }

    onRemoveParticipant(index){
        let participant = this.participantsList.splice(index, 1).pop();
        this.contactsList.forEach(contact => {
            if(isEquivalent(participant, contact)){

                this.contactsFiltered.forEach(contactCopy => {
                    if(isEquivalent(contactCopy, contact)){
                      contactCopy.isParticipant = false
                    }
                });

                delete contact["isParticipant"];
            }
        });
    }

    reorderItems(indexes) {
        this.participantsList = reorderArray(this.participantsList, indexes);
    }

    onSaveParticipants(){
        let schedule:any = [];
        schedule = this.participantsList.map(participant => {
            return participant.id
        });
        this.plansProvider.setSchedule(schedule, this.potId).subscribe(response =>{
            if(response.ok){
                let doneSaving = this.toastCtrl.create({
                    message: 'Participants saved',
                    duration: DURATION
                });
                doneSaving.present();
                this.viewCtrl.dismiss(this.participantsList)
            }
        });
    }

    onDismiss(){
        this.navCtrl.pop();
    }
}



