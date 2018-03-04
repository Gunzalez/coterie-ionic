import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

const DURATION = 1000;

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

  private id = '';
  private plan = {};

  public schedule = [];
  public reorderIsEnabled = false;
  public created;
  public icon;

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {

    this.plan = this.plansProvider.plan;
    this.id = this.plan['id'];
    this.schedule = this.plan['participants'];
  }

  ionViewDidLoad() {

    // just messing about with the date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10){
      dd = 0 + dd;
    }
    if(mm<10){
      mm = 0 + mm;
    }
    this.created  = dd + '/' + mm + '/' + yyyy;

    this.icon = this.plansProvider.getPlanIcon();
  }

  ionViewCanLeave(){
    if(this.reorderIsEnabled){

      let cannotLeaveToast = this.toastCtrl.create({
        message: 'Exit save mode',
        duration: DURATION,
      });
      cannotLeaveToast.present();

      return false;
    }
  }

  addParticipant(){

    let addParticipantAlert = this.alertCtrl.create({
      title:'Participant name',
      // message: 'Nicknames are acceptable of course',
      inputs: [
        {
          type: "text",
          name: 'participantName',
          placeholder: '',
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Add",
          handler: (inputData)=>{

            let participantName = inputData.participantName;
            if(participantName.length > 0){

              let next = participantId => {

                // Gets back id, uses it
                let participant = {
                  name: participantName,
                  id: participantId
                };
                this.schedule.unshift(participant);

                let scheduleIds = [];
                let callback = obj => {
                  scheduleIds.push(obj.id)
                };
                this.schedule.forEach(callback);

                let next = done => {

                  if(done.ok){

                    if(this.schedule.length > 1){
                      this.icon = 'cloud'; // can start plan
                    } else {
                      this.icon = 'cloud-outline'; // can not start plan
                    }

                    let addParticipantToast = this.toastCtrl.create({
                      message: 'Participant added',
                      duration: DURATION,
                    });
                    addParticipantToast.present();
                  }

                };
                this.plansProvider.setSchedule(scheduleIds, this.id).subscribe(next); // save new schedule

              };
              this.plansProvider.addParticipant(participantName, this.id).subscribe(next); // new participant

            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    addParticipantAlert.present();
  }

  itemReordered($event){
    reorderArray(this.schedule, $event);
  }

  toggleReorder(buttonClicked){

    // toggle edit/save mode
    this.reorderIsEnabled = !this.reorderIsEnabled;

    if(buttonClicked == 'save'){

      let scheduleIds = [];
      let callback = obj => {
        scheduleIds.push(obj.id);
      };
      this.schedule.forEach(callback);

      let next = done => {
        if(done){
          let doneReorderToast = this.toastCtrl.create({
            message: 'Order saved',
            duration: DURATION,
          });
          doneReorderToast.present();
        }
      };
      this.plansProvider.setSchedule(scheduleIds, this.id).subscribe(next);
    }
  }

  // removes a single participant
  removeParticipant(participantIndex, participant){

    let next = response => {
      if(response.status === 204){
        let count = 1;
        this.schedule.splice(participantIndex, count);

        if(this.schedule.length > 1){
          this.icon = 'cloud'; // can start plan
        } else {
          this.icon = 'cloud-outline'; // can not start plan
        }

        let participantRemovedToast = this.toastCtrl.create({
          message: 'Participant removed',
          duration: DURATION,
        });
        participantRemovedToast.present();
      }

    };
    this.plansProvider.removeParticipant(participant).subscribe(next);

  }
}
