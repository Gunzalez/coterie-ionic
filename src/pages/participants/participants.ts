import { Component, ViewChild } from '@angular/core';

import { ViewController, NavController, ToastController, NavParams, reorderArray } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

import { sortList, isEquivalent, filtered } from '../../helpers/helpers';

const DURATION = 1000;

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

    private potId:string = null;
    private contactsFiltered:any[] = [];

    public myInput:string = '';
    public contactsList:any[] = [];
    public contactsGrouped:any[] = [];
    public participants:any[] = [];
    public participantsList:any[] = [];
    public participantsListInitial:any[] = [];

    constructor(private viewCtrl: ViewController, public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private plansProvider: PlansProvider) {
        this.participantsList = this.navParams.get('list');
        this.participantsListInitial = this.participantsList.slice();
        this.potId = this.navParams.get('potId');
        this.contactsList = this.navParams.get('contacts');
    }

    ionViewDidLoad(){
        this.updateContactDetails();
    }

    participantsChanged(){
        return JSON.stringify(this.participantsList) === JSON.stringify(this.participantsListInitial);
    }

    updateContactDetails(){
        this.participantsList.forEach(participant => {
            this.contactsList.forEach(contact => {
                if(contact.contactId === participant.contactId){
                    contact.id = participant.id;
                    let newParticipant = Object.assign({}, contact);
                    this.participants.push(newParticipant);
                }
            });
        });
        this.contactsFiltered = this.contactsList.slice();
        this.groupContacts();
    }

    onInput(){
        this.contactsFiltered = filtered(this.myInput, this.contactsList);
        this.groupContacts();
    }

    isParticipant(contact){
        return contact.id && contact.id.length;
    }

    onClickContact(contact){

        if(contact.id){

            let callback = () => {
                this.participants.forEach((participant, index) => {
                    if(participant.id === contact.id){
                        this.participants.splice(index, 1);
                        this.participantsList.splice(index, 1);
                    }
                });
                this.contactsFiltered.forEach(contactCopy => {
                    if(isEquivalent(contactCopy, contact)){
                        contactCopy.id = null;
                        contact.id = null;
                    }
                });
            };
            this.removeParticipant(contact, callback);

        } else {

            this.plansProvider.addParticipant(contact.contactId, this.potId).subscribe(participantId => {

                this.contactsFiltered.forEach(contactCopy => {
                    if(isEquivalent(contactCopy, contact)){

                        contactCopy.id = participantId;
                        contact.id = participantId;

                        let newParticipant = Object.assign({}, contact);
                        this.participants.unshift(newParticipant);
                        this.participantsList.unshift(newParticipant);
                    }
                });
            });

        }
    }

    onClickRemoveParticipant(participant, index){
        let callback = () => {
            this.contactsList.forEach(contact => {
                if(isEquivalent(participant, contact)){

                    this.contactsFiltered.forEach(contactCopy => {
                        if(isEquivalent(contactCopy, contact)){
                            contactCopy.id = null
                        }
                    });

                    contact.id = null;
                    this.participants.splice(index, 1);
                    this.participantsList.splice(index, 1);
                }
            });
        };
        this.removeParticipant(participant, callback)
    }

    onSwipeRemoveParticipant(participant, index){
        let callback = () => {
            this.contactsList.forEach(contact => {
                if(isEquivalent(participant, contact)){

                    this.contactsFiltered.forEach(contactCopy => {
                        if(isEquivalent(contactCopy, contact)){
                            contactCopy.id = null
                        }
                    });

                    contact.id = null;
                    this.participants.splice(index, 1);
                    this.participantsList.splice(index, 1);
                }
            });
        };
        this.removeParticipant(participant, callback)
    }

    removeParticipant(participant, callback){
        this.plansProvider.removeParticipant(participant).subscribe(response => {
            if(response.ok){
                callback();
            }
        });
    }

    reorderItems(indexes) {
        this.participants = reorderArray(this.participants, indexes);
        this.participantsList = reorderArray(this.participantsList, indexes);
    }

    onSaveParticipants(){
        let schedule = this.participants.map(participant => { return participant.id });
        this.plansProvider.setSchedule(schedule, this.potId).subscribe(response => {
            if(response.ok){
                let doneSaving = this.toastCtrl.create({
                    message: 'Participants saved',
                    duration: DURATION
                });
                doneSaving.present();
                this.viewCtrl.dismiss(this.participants)
            }
        });
    }

    onDismiss(){
        this.navCtrl.pop();
    }

    groupContacts(){

        sortList(this.contactsFiltered);
        this.contactsGrouped.length = 0;
        let groupedCollection = {};

        this.contactsFiltered.forEach(contact => {
            let firstLetter = contact.name.charAt(0);
            if(groupedCollection[firstLetter] == undefined){
                groupedCollection[firstLetter] = [];
            }
            groupedCollection[firstLetter].push(contact);
        });

        Object.keys(groupedCollection).map( key => {
            let group = {
                letter: key,
                contacts: groupedCollection[key]
            };
            this.contactsGrouped.push(group);
        });
    }
}



