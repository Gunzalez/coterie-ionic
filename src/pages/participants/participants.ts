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

              this.plansProvider.addParticipant(participantName, this.id)
                .subscribe((data)=>{

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
                  this.schedule.forEach(function (obj) {
                    scheduleIds.push(obj.id);
                  });

                  this.plansProvider.addSchedule(scheduleIds, this.id)
                    .subscribe((done)=>{
                      if(done){
                        addParticipantAlert.onDidDismiss(()=>{
                          let addParticipantToast = this.toastCtrl.create({
                            message: 'Participant added',
                            duration: 2000,
                          });
                          addParticipantToast.present();
                        })
                      }
                    });
                });
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
    this.reorderIsEnabled = !this.reorderIsEnabled;

    if(buttonClicked == 'save'){

      let scheduleIds = [];
      this.schedule.forEach( (obj)=>{
        scheduleIds.push(obj.id);
      });

      this.plansProvider.addSchedule(scheduleIds, this.id)
        .subscribe((done)=>{
          if(done){

            let doneReorderToast = this.toastCtrl.create({
              message: 'Order saved',
              duration: 2000,
            });
            doneReorderToast.present();
          }
        });
    }
  }
}
