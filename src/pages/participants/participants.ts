import { Component, ViewChild, trigger, transition, style, animate } from '@angular/core';

import { ViewController, NavController, ToastController, NavParams, TextInput, reorderArray } from 'ionic-angular';

import { PlansProvider } from "../../providers/plans/plans";

import { isEquivalent } from '../../helpers/helpers';

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

    public participantsList:any[] = [];
    public participantsListInitial:any[] = [];
    public participantName:string = '';
    public participantNumber:string = '';

    @ViewChild('nameInput') nameInput: TextInput;

    constructor(private viewCtrl: ViewController, public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private plansProvider: PlansProvider) {
        this.participantsList = this.navParams.get('list');
        this.potId = this.navParams.get('potId');
        this.participantsListInitial = this.participantsList.slice();
    }

    ionViewDidLoad(){
        let timer = setTimeout(()=>{
          this.nameInput.setFocus();
          console.log('M--onday')
          clearTimeout(timer);

        }, 1000)



        this.nameInput.setFocus();

    }

    ionViewDidEnter(){
        //console.log('Did')
    }

    participantsChanged(){
        return JSON.stringify(this.participantsList) === JSON.stringify(this.participantsListInitial);
    }

    onAddParticipant(){
        let participantName = this.participantName;
        if(participantName.trim().length){
            this.plansProvider.addParticipant(participantName, this.potId).subscribe(participantId =>{
                let newParticipant = {
                    id: participantId,
                    name: this.participantName,
                    number: this.participantNumber
                };
                this.participantsList.unshift(newParticipant);
                this.participantName = '';
                this.participantNumber = '';
                this.nameInput.setFocus();
            });
        }
    }

    onRemoveParticipant(participant){
        this.plansProvider.removeParticipant(participant).subscribe(response => {
            if(response.ok){
                this.participantsList.forEach((participantInList, index) => {
                    if(isEquivalent(participantInList, participant)){
                        this.participantsList.splice(index, 1).pop();
                    }
                });
            }
        });
    }

    reorderItems(indexes) {
        this.participantsList = reorderArray(this.participantsList, indexes);
    }

    onSaveParticipants(){
        let schedule = this.participantsList.map(participant => { return participant.id });
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



