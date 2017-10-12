import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsProvider } from '../../providers/participants/participants'

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage {
  private planId;

  public plan = {};
  public schedule = [];
  public participants = [];
  public reorderIsEnabled = false;

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, private participantsProvider: ParticipantsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.planId = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.plansProvider.getAPlan(this.planId)
      .subscribe((response)=>{
        this.plan = response;
        this.participants = this.plan['participants'];
        this.schedule = this.plan['schedule'].participants;

        console.log(this.participants);
        console.log(this.schedule);
      })
  }

  addParticipant(){

    let addParticipantAlert = this.alertCtrl.create({
      title:'New participant',
      message: 'Enter in a name',
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

              this.participantsProvider.addParticipant(participantName, this.planId)
                .subscribe((data)=>{

                  //let stringToRemove = '/plans/'+this.planId+'/;'
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

                  this.participantsProvider.addSchedule(scheduleIds, this.planId)
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
      this.schedule.forEach(function (obj) {
        scheduleIds.push(obj.id);
      });

      this.participantsProvider.addSchedule(scheduleIds, this.planId)
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
