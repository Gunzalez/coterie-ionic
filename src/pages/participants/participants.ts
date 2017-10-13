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
  private participants = [];

  public schedule = [];
  public reorderIsEnabled = false;

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navCtrl: NavController, public navParams: NavParams) {

    this.plan = this.plansProvider.plan;
    this.id = this.plan['id'];
    this.schedule = this.plan['schedule'].participants;
    this.participants = this.plan['participants'];

  }

  ionViewDidLoad() {

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
      message: 'Monikers are acceptable',
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

              let next = (data)=>{

                // getting the new id created when new person was added
                let participantIdString = data.headers.get('location'),
                  participantIdArray = participantIdString.split('/'),
                  participantId = participantIdArray[participantIdArray.length - 1];

                let participant = {
                  name: participantName,
                  id: participantId
                };
                this.participants.unshift(participant);
                this.schedule.unshift(participant);

                let scheduleIds = [];
                let callbackfn = obj => {
                  scheduleIds.push(obj.id)
                };
                this.schedule.forEach(callbackfn);

                let next = (done) => {
                  if(done){

                    let callback = () => {
                      let addParticipantToast = this.toastCtrl.create({
                        message: 'Participant added',
                        duration: 2000,
                      });
                      addParticipantToast.present();
                    };

                    addParticipantAlert.onDidDismiss(callback);
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

      let next = (done) => {
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
}
