import { Component } from '@angular/core';

import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

import { NavParams, ToastController, AlertController, ModalController, reorderArray} from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';
import { ParticipantsPage } from '../participants/participants';

const DURATION = 2000;
const CURRENCY = '£';

@Component({
    selector: 'page-plan-details',
    templateUrl: 'plan-details.html'
})
export class PlanDetailsPage {

    public id;
    private plan = {};

    private icon:string= '';
    private name:string = '';
    private status:string = '';

    private inc = 100;
    public max = 2500;
    private min = 1;

    public schedule = [];
    private contactsLocal:any[] = [
    {
      "id":5,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Hank",
        "honorificSuffix":"",
        "formatted":"Hank M. Zakroff",
        "middleName":"M.",
        "familyName":"Zakroff",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"(555) 766-4823",
          "pref":false,
          "id":0,
          "type":"work"
        },
        {
          "value":"(707) 555-1854",
          "pref":false,
          "id":1,
          "type":"other"
        }
      ],
      "emails":[
        {
          "value":"hank-zakroff@mac.com",
          "pref":false,
          "id":0,
          "type":"work"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"San Rafael",
          "region":"CA",
          "id":0,
          "postalCode":"94901",
          "country":"",
          "type":"work",
          "streetAddress":"1741 Kearny Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"Portfolio Manager",
          "name":"Financial Services Inc.",
          "department":"",
          "type":null
        }
      ],
      "birthday":null,
      "note":"",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":13,
      "rawId":null,
      "displayName":"Adam Zapple",
      "name":{
        "givenName":"Hank",
        "honorificSuffix":"",
        "formatted":"Hank M. Zakroff",
        "middleName":"M.",
        "familyName":"Zakroff",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"(555) 766-4823",
          "pref":false,
          "id":0,
          "type":"work"
        },
        {
          "value":"(707) 555-1854",
          "pref":false,
          "id":1,
          "type":"other"
        }
      ],
      "emails":[
        {
          "value":"hank-zakroff@mac.com",
          "pref":false,
          "id":0,
          "type":"work"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"San Rafael",
          "region":"CA",
          "id":0,
          "postalCode":"94901",
          "country":"",
          "type":"work",
          "streetAddress":"1741 Kearny Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"Portfolio Manager",
          "name":"Financial Services Inc.",
          "department":"",
          "type":null
        }
      ],
      "birthday":null,
      "note":"",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":15,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Captain",
        "honorificSuffix":"",
        "formatted":null,
        "middleName":"M.",
        "familyName":"Caveman",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"(555) 766-4823",
          "pref":false,
          "id":0,
          "type":"work"
        },
        {
          "value":"(707) 555-1854",
          "pref":false,
          "id":1,
          "type":"other"
        }
      ]
    },
    {
      "id":16,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"",
        "honorificSuffix":"",
        "formatted":null,
        "middleName":"M.",
        "familyName":"",
        "honorificPrefix":""
      },
      "nickname":"Eric Li-Koo",
      "phoneNumbers":[
        {
          "value":"(555) 766-4823",
          "pref":false,
          "id":0,
          "type":"work"
        },
        {
          "value":"(707) 555-1854",
          "pref":false,
          "id":1,
          "type":"other"
        }
      ]
    },
    {
      "id":1,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Kate",
        "honorificSuffix":"",
        "formatted":"Kate Bell",
        "middleName":"",
        "familyName":"Bell",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"(555) 564-8583",
          "pref":false,
          "id":0,
          "type":"mobile"
        },
        {
          "value":"(415) 555-3695",
          "pref":false,
          "id":1,
          "type":"main"
        }
      ],
      "emails":[
        {
          "value":"kate-bell@mac.com",
          "pref":false,
          "id":0,
          "type":"work"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"Hillsborough",
          "region":"CA",
          "id":0,
          "postalCode":"94010",
          "country":"",
          "type":"work",
          "streetAddress":"165 Davis Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"Producer",
          "name":"Creative Consulting",
          "department":"",
          "type":null
        }
      ],
      "birthday":"1978-01-20T12:00:00.000Z",
      "note":"",
      "photos":null,
      "categories":null,
      "urls":[
        {
          "value":"www.icloud.com",
          "pref":false,
          "id":0,
          "type":"profile"
        }
      ]
    },
    {
      "id":6,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"David",
        "honorificSuffix":"",
        "formatted":"David Taylor",
        "middleName":"",
        "familyName":"Taylor",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"555-610-6679",
          "pref":false,
          "id":0,
          "type":"home"
        }
      ],
      "emails":null,
      "addresses":[
        {
          "pref":"false",
          "locality":"Tiburon",
          "region":"CA",
          "id":0,
          "postalCode":"94920",
          "country":"USA",
          "type":"home",
          "streetAddress":"1747 Steuart Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"",
          "department":"",
          "type":null
        }
      ],
      "birthday":"1998-06-15T12:00:00.000Z",
      "note":"Plays on Cole's Little League Baseball Team\n",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":2,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Daniel",
        "honorificSuffix":"Jr.",
        "formatted":"Daniel Higgins Jr.",
        "middleName":"",
        "familyName":"Higgins",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"555-478-7672",
          "pref":false,
          "id":0,
          "type":"home"
        },
        {
          "value":"(408) 555-5270",
          "pref":false,
          "id":1,
          "type":"mobile"
        },
        {
          "value":"(408) 555-3514",
          "pref":false,
          "id":2,
          "type":"home fax"
        }
      ],
      "emails":[
        {
          "value":"d-higgins@mac.com",
          "pref":false,
          "id":0,
          "type":"home"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"Corte Madera",
          "region":"CA",
          "id":0,
          "postalCode":"94925",
          "country":"USA",
          "type":"home",
          "streetAddress":"332 Laguna Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"",
          "department":"",
          "type":null
        }
      ],
      "birthday":null,
      "note":"Sister: Emily",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":12,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Philip",
        "honorificSuffix":"Jr.",
        "formatted":"",
        "middleName":"",
        "familyName":"Fry",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"555-478-7672",
          "pref":false,
          "id":0,
          "type":"home"
        },
        {
          "value":"(408) 555-5270",
          "pref":false,
          "id":1,
          "type":"mobile"
        },
        {
          "value":"(408) 555-3514",
          "pref":false,
          "id":2,
          "type":"home fax"
        }
      ],
      "emails":[
        {
          "value":"d-higgins@mac.com",
          "pref":false,
          "id":0,
          "type":"home"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"Corte Madera",
          "region":"CA",
          "id":0,
          "postalCode":"94925",
          "country":"USA",
          "type":"home",
          "streetAddress":"332 Laguna Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"",
          "department":"",
          "type":null
        }
      ],
      "birthday":null,
      "note":"Sister: Emily",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":7,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Patrick",
        "honorificSuffix":"",
        "formatted":"Patrick Bateman",
        "middleName":"",
        "familyName":"Bateman",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"02088005566",
          "pref":false,
          "id":0,
          "type":"home"
        }
      ],
      "emails":null,
      "addresses":null,
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"American Pyscho",
          "department":"",
          "type":null
        }
      ],
      "birthday":null,
      "note":"",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":3,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"John",
        "honorificSuffix":"",
        "formatted":"John Appleseed",
        "middleName":"",
        "familyName":"Appleseed",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"888-555-5512",
          "pref":false,
          "id":0,
          "type":"mobile"
        },
        {
          "value":"888-555-1212",
          "pref":false,
          "id":1,
          "type":"home"
        }
      ],
      "emails":[
        {
          "value":"John-Appleseed@mac.com",
          "pref":false,
          "id":0,
          "type":"work"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"Atlanta",
          "region":"GA",
          "id":0,
          "postalCode":"30303",
          "country":"USA",
          "type":"work",
          "streetAddress":"3494 Kuhl Avenue"
        },
        {
          "pref":"false",
          "locality":"Atlanta",
          "region":"GA",
          "id":1,
          "postalCode":"30303",
          "country":"USA",
          "type":"home",
          "streetAddress":"1234 Laurel Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"",
          "department":"",
          "type":null
        }
      ],
      "birthday":"1980-06-22T12:00:00.000Z",
      "note":"College roommate",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":14,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Lets-Go",
        "honorificSuffix":"",
        "formatted":"",
        "middleName":"",
        "familyName":"Dancin",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"888-555-5512",
          "pref":false,
          "id":0,
          "type":"mobile"
        },
        {
          "value":"888-555-1212",
          "pref":false,
          "id":1,
          "type":"home"
        }
      ],
      "emails":[
        {
          "value":"John-Appleseed@mac.com",
          "pref":false,
          "id":0,
          "type":"work"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"Atlanta",
          "region":"GA",
          "id":0,
          "postalCode":"30303",
          "country":"USA",
          "type":"work",
          "streetAddress":"3494 Kuhl Avenue"
        },
        {
          "pref":"false",
          "locality":"Atlanta",
          "region":"GA",
          "id":1,
          "postalCode":"30303",
          "country":"USA",
          "type":"home",
          "streetAddress":"1234 Laurel Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"",
          "department":"",
          "type":null
        }
      ],
      "birthday":"1980-06-22T12:00:00.000Z",
      "note":"College roommate",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":11,
      "rawId":null,
      "displayName":"John Cena",
      "name":{
        "givenName":"John",
        "honorificSuffix":"",
        "formatted":"John Appleseed",
        "middleName":"",
        "familyName":"Appleseed",
        "honorificPrefix":""
      },
      "nickname":"",
      "phoneNumbers":[
        {
          "value":"888-555-5512",
          "pref":false,
          "id":0,
          "type":"mobile"
        },
        {
          "value":"888-555-1212",
          "pref":false,
          "id":1,
          "type":"home"
        }
      ],
      "emails":[
        {
          "value":"John-Appleseed@mac.com",
          "pref":false,
          "id":0,
          "type":"work"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"Atlanta",
          "region":"GA",
          "id":0,
          "postalCode":"30303",
          "country":"USA",
          "type":"work",
          "streetAddress":"3494 Kuhl Avenue"
        },
        {
          "pref":"false",
          "locality":"Atlanta",
          "region":"GA",
          "id":1,
          "postalCode":"30303",
          "country":"USA",
          "type":"home",
          "streetAddress":"1234 Laurel Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"",
          "department":"",
          "type":null
        }
      ],
      "birthday":"1980-06-22T12:00:00.000Z",
      "note":"College roommate",
      "photos":null,
      "categories":null,
      "urls":null
    },
    {
      "id":4,
      "rawId":null,
      "displayName":null,
      "name":{
        "givenName":"Anna",
        "honorificSuffix":"",
        "formatted":"Anna Haro",
        "middleName":"",
        "familyName":"Haro",
        "honorificPrefix":""
      },
      "nickname":"Annie",
      "phoneNumbers":[
        {
          "value":"555-522-8243",
          "pref":false,
          "id":0,
          "type":"home"
        }
      ],
      "emails":[
        {
          "value":"anna-haro@mac.com",
          "pref":false,
          "id":0,
          "type":"home"
        }
      ],
      "addresses":[
        {
          "pref":"false",
          "locality":"Sausalito",
          "region":"CA",
          "id":0,
          "postalCode":"94965",
          "country":"USA",
          "type":"home",
          "streetAddress":"1001  Leavenworth Street"
        }
      ],
      "ims":null,
      "organizations":[
        {
          "pref":"false",
          "title":"",
          "name":"",
          "department":"",
          "type":null
        }
      ],
      "birthday":"1985-08-29T12:00:00.000Z",
      "note":"",
      "photos":null,
      "categories":null,
      "urls":null
    }
  ];
    private contactsList:any[] = [];

    public savingsAmount:any = 0;
    public initialAmt:any = 0;

    constructor(private contacts: Contacts, private modalCtrl: ModalController, private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navParams: NavParams) {
        this.id = this.navParams.get('id');
    }

    ionViewDidLoad() {};

    amountMinus(){
        this.savingsAmount = parseInt(this.savingsAmount) - this.inc;
        if(this.savingsAmount < this.min){
            this.savingsAmount = this.min
        }
    }

    amountPlus(){
        this.savingsAmount = parseInt(this.savingsAmount) + this.inc;
        if(this.savingsAmount >= (this.max + 1)){
            this.savingsAmount = this.max
        }
    }

    hasReachedMax(){
        return this.savingsAmount >= (this.max)
    }

    hasReachedMin(){
        return this.savingsAmount < this.min
    }

    ionViewWillEnter(){
        let next = plan => {
            this.plan = plan;
            this.plan['participants'].forEach(participant => {
                this.schedule.push({
                    contactId: parseInt(participant.contactId),
                    id: participant.id
                })
            });
            this.plansProvider.plan = this.plan;
            this.savingsAmount = this.plan['savingsAmount'];
            this.initialAmt = this.savingsAmount;

            if(this.schedule.length){
                this.getContacts();
            }
        };
        this.plansProvider.getAPlan(this.id).subscribe(next);
    }

  getContactsLocal(){

    this.contactsLocal.forEach(contact => {

      let nameToUse:string = '';
      let numberToUse:any = '';

      if(contact.displayName && contact.displayName.length){
        nameToUse = contact.displayName;
      } else if (contact.nickname && contact.nickname.length) {
        nameToUse = contact.nickname;
      } else if (contact.name.formatted && contact.name.formatted) {
        nameToUse = contact.name.formatted;
      } else if (contact.name.givenName && contact.name.givenName.length) {
        nameToUse = contact.name.givenName + ' ' + contact.name.familyName
      }

      if(contact.phoneNumbers && contact.phoneNumbers[0].value.length){
        numberToUse = contact.phoneNumbers[0].value;
      }

      if(nameToUse && nameToUse.length){

        // add new contact
        let newContact = {
            "contactId": contact.id,
            "name": nameToUse,
            "number": numberToUse
        };

        this.contactsList.push(newContact);
      }

    });


    this.schedule.forEach(participant => {
      this.contactsList.forEach(contact => {
        if(participant.contactId === contact.contactId){
          Object.assign(participant, contact);
        }
      });
    })

  }


  getContacts(){

    let fields:ContactFieldType[] = ['*'];

    const options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;

    this.contacts.find(fields, options).then((contacts) => {

      contacts.forEach(contact => {

        let nameToUse:string = '';
        let numberToUse:any = '';

        if(contact.displayName && contact.displayName.length){
          nameToUse = contact.displayName;
        } else if (contact.nickname && contact.nickname.length) {
          nameToUse = contact.nickname;
        } else if (contact.name.formatted && contact.name.formatted) {
          nameToUse = contact.name.formatted;
        } else if (contact.name.givenName && contact.name.givenName.length) {
          nameToUse = contact.name.givenName + ' ' + contact.name.familyName
        }

        if(contact.phoneNumbers && contact.phoneNumbers[0].value.length){
          numberToUse = contact.phoneNumbers[0].value;
        }

        if(nameToUse && nameToUse.length){

          // add new contact
          let newContact = {
            "contactId": contact.id,
            "name": nameToUse,
            "number": numberToUse
          };

          this.contactsList.push(newContact);
        }

      });

      this.schedule.forEach(participant => {
        this.contactsList.forEach(contact => {
          if(participant.contactId === contact.contactId){
            Object.assign(participant, contact);
          }
        });
      })


    });


  }

  reorderItems(indexes) {
    this.schedule = reorderArray(this.schedule, indexes);

    let schedule = this.schedule.map(participant => { return participant.id });
    this.plansProvider.setSchedule(schedule, this.id).subscribe(response => {
      if(response.ok){
        // schedule saved
      }
    });
  }

  onSwipeRemoveParticipant(participant, index){
      if(!this.isPlanInProgress()){
        this.plansProvider.removeParticipant(participant).subscribe(response => {
          if(response.ok){
            this.schedule.splice(index, 1);
          }
        });
      }

  }


    canSetAmount(){
        return this.initialAmt !== this.savingsAmount && this.savingsAmount > 0 && this.savingsAmount < (this.max + 1);
    }

    setAmount(){
        this.plansProvider.setSavingsAmount(this.savingsAmount, this.id).subscribe(response => {
            if( response.ok ){
                // set screen properties
                this.savingsAmount = parseInt(this.savingsAmount);
                this.initialAmt = parseInt(this.savingsAmount);
                let amountSaveToast = this.toastCtrl.create({
                    message: 'Saving amount set at ' + CURRENCY + this.savingsAmount,
                    duration: DURATION
                });
                amountSaveToast.present();
            }
        });
    }

  editPlanName(){

    let addPlanAlert = this.alertCtrl.create({
      title:'Edit plan name',
      inputs: [
        {
          type: "text",
          name: 'planName',
          placeholder: '',
          value: this.getPlanName()
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Update",
          handler: (inputData)=>{

            let planName = inputData.planName.trim();
            if(planName.length > 0){

              let next = response => {
                if (response.ok){
                  this.name = planName;
                } else {
                  // error handling
                }
              };
              this.plansProvider.updatePlan(planName, this.id).subscribe(next);

            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    addPlanAlert.present();

  }

  getPlanName() {
    if(this.name !== ''){
      return this.name;
    }
    return this.plan['name'];
  }

  getStartButtonLabel(){
      return this.plan['status'] === 'in-progress' ? 'Started' : 'Start Plan';
  }

  isPlanInProgress(){
      if(this.status !== ''){
          return this.status === 'in-progress'
      }
      return this.plan['status'] === 'in-progress';
  }

  canStartPlan(){
    return this.initialAmt > 0 && this.schedule.length;
  }

  getPlanStatusColor(){
    return this.plan['status'] === 'in-progress' ? 'secondary' : null
  }

  viewParticipants(){
      let participantsModal = this.modalCtrl.create(ParticipantsPage, { list: this.schedule, potId: this.id  });
      participantsModal.onDidDismiss( participants => {
          if(participants){
              this.schedule = participants;
          }
      });
      participantsModal.present();
  }

  startPlan(){
      this.plansProvider.startPlan(this.plan['id']).subscribe(result => {
          if (result){
              this.icon = 'rainy';
              let startPlanToast = this.toastCtrl.create({
                  message: 'Pot started',
                  duration: DURATION,
              });
              startPlanToast.present();
          }
      })
  }

}
