import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage {

  private id = '';
  private plan = {};

  public schedule = [];
  public reorderIsEnabled = false;
  public created;

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {

    this.plan = this.plansProvider.plan;
    this.id = this.plan['id'];
    this.schedule = this.plan['schedule'].participants;

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

  }

  ionViewCanLeave(){
    if(this.reorderIsEnabled){

      let cannotLeaveToast = this.toastCtrl.create({
        message: 'Exit save mode',
        duration: 2000,
      });
      cannotLeaveToast.present();

      return false;
    }
  }

  addParticipant(){

    let addParticipantAlert = this.alertCtrl.create({
      title:'Participant name',
      message: 'Nicknames are acceptable of course',
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
                    let addParticipantToast = this.toastCtrl.create({
                      message: 'Participant added',
                      duration: 2000,
                    });
                    addParticipantToast.present();
                  }

                };
                this.plansProvider.addSchedule(scheduleIds, this.id).subscribe(next);

              };
              this.plansProvider.addParticipant(participantName, this.id).subscribe(next);

            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    addParticipantAlert.present();
  }

  itemReorded($event){
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
            duration: 2000,
          });
          doneReorderToast.present();
        }
      };
      this.plansProvider.addSchedule(scheduleIds, this.id).subscribe(next);

    }
  }

  removeParticipant(participantIndex, participant){
    this.schedule.splice(participantIndex,1);
    // removes participant


    // let next = response => {
    //   console.log(response);
    // };
    //this.plansProvider.deleteParticipant(this.id, participant).subscribe(next);
    if(this.plansProvider.deleteParticipant(this.id, participant)){
      console.log('Removes index ' + participantIndex);
      console.log(participant.id);
      console.log(participant.name);
    }

  }
}
