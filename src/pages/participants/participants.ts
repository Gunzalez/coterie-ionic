import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController  } from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsProvider } from '../../providers/participants/participants'

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage {
  private planId;
  public plan = {};
  public participants = [];

  constructor(private toastCrtl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, private participantsProvider: ParticipantsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.planId = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.plansProvider.getAPlan(this.planId)
      .subscribe((response)=>{
        this.plan = response;
        this.participants = this.plan['participants'];
      })
  }

  addParticipant(){

    let addParticipantAlert = this.alertCtrl.create({
      title:'New participant',
      // message: 'Create a new plan',
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
                  let participantId = data.headers.get('location').replace(/\/plans\//gi, "");
                  let participant = {
                    name: participantName,
                    id: participantId
                  };
                  this.participants.unshift(participant);

                  addParticipantAlert.onDidDismiss(()=>{
                    let addTodoToast = this.toastCrtl.create({
                      message: 'Participant added',
                      duration: 2000,
                    });

                    addTodoToast.present();
                  })

                });
            }
          }
        }
      ],
      enableBackdropDismiss: false

    });

    addParticipantAlert.present();

  }

}
