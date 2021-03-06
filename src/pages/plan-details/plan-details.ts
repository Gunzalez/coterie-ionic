import { Component } from '@angular/core';

import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

import { currencyConvert } from '../../helpers/helpers';

import {
  NavParams,
  ToastController,
  AlertController,
  ModalController,
  reorderArray,
  LoadingController,
  NavController
} from 'ionic-angular';

import { PlansProvider } from '../../providers/plans/plans';

import { ParticipantsPage } from '../participants/participants';
import { FundsPage } from '../funds/funds';

const DURATION = 2000;

@Component({
    selector: 'page-plan-details',
    templateUrl: 'plan-details.html'
})
export class PlanDetailsPage {

    public id;
    private plan = {};
    public round:string ='';

    private name:string = '';
    private status:string = '';

    private inc = 100;
    public max = 2500;
    private min = 1;

    private loading:any = null;

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
        "givenName":"Adam",
        "honorificSuffix":"",
        "formatted":"",
        "middleName":"",
        "familyName":"Zapple",
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
      "displayName":"Joan Cena",
      "name":{
        "givenName":"John",
        "honorificSuffix":"",
        "formatted":"Joan Cena",
        "middleName":"",
        "familyName":"Cena",
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

    public reorderStatus:boolean = false;

    public nextParticipantToCollect:string = '';
    public nextParticipantsToPay:any[] = [];

    public savingsAmount:any = 0;
    public initialAmt:any = 0;

    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, private contacts: Contacts, private modalCtrl: ModalController, private toastCtrl: ToastController, private alertCtrl: AlertController, private plansProvider: PlansProvider, public navParams: NavParams) {
        this.id = this.navParams.get('id');
    }

    ionViewDidLoad() {
        this.displayLoadingSpinner();
        this.fetchPlan();
    };

    displayLoadingSpinner() {
        this.loading = this.loadingCtrl.create({
            content: 'Pot loading...'
        });
        this.loading.present();
    }

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
        if(this.isPlanCompleted()){
            return true
        }
        return this.savingsAmount >= (this.max)
    }

    hasReachedMin(){
        if(this.isPlanCompleted()){
            return true
        }
        return this.savingsAmount < this.min
    }

    ionViewWillEnter(){
    }

    fetchPlan(){
        this.plansProvider.getAPlan(this.id).subscribe(plan => {
            this.plan = plan;
            if(!this.schedule.length){
                this.plan['participants'].forEach(participant => {
                    this.schedule.push({
                        contactId: parseInt(participant.contactId),
                        id: participant.id
                    })
                });
            }

            this.nextParticipantsToPay = this.plan['nextParticipantsToPay'];
            this.nextParticipantToCollect = this.plan['nextParticipantToCollect'];
            this.savingsAmount = this.plan['savingsAmount'];
            this.initialAmt = this.savingsAmount;
            this.round = this.plan['round'];

            this.loading.dismiss();

            if(!this.contactsList.length) {

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //this.getContactsLocal();
                this.getContacts();
            }
        });
    }

    getCollection(){
        const value = this.savingsAmount * (this.schedule.length - 1);
        return currencyConvert(value);
    }

    getSavingsAmount(){
        return currencyConvert(this.savingsAmount);
    }

    extractContactFromRaw(contact){

      let nameToUse:string = 'No name';
      let numberToUse:any = 'No number';
      let avatarLetters:string = '';

      if (contact.name.givenName && contact.name.givenName.length) {

          nameToUse = contact.name.givenName + ' ' + contact.name.familyName;
          avatarLetters = contact.name.givenName.charAt(0).toUpperCase() + contact.name.familyName.charAt(0).toUpperCase()

      } else if (contact.displayName && contact.displayName.length){
          nameToUse = contact.displayName;
      } else if (contact.nickname && contact.nickname.length) {
          nameToUse = contact.nickname;
      } else if (contact.name.formatted && contact.name.formatted) {
          nameToUse = contact.name.formatted;
      }

      if(avatarLetters === ''){
          avatarLetters = nameToUse.charAt(0).toUpperCase()
      }

      if(contact.phoneNumbers && contact.phoneNumbers[0].value.length){
          numberToUse = contact.phoneNumbers[0].value;
      }

      if(nameToUse && nameToUse.length){

        // add new contact
        let newContact = {
            "contactId": contact.id,
            "name": nameToUse,
            "number": numberToUse,
            "avatar": avatarLetters
        };

        this.contactsList.push(newContact);
      }

    }

    mergeContactDetails(){
      this.schedule.forEach(participant => {
        this.contactsList.forEach(contact => {
          if(participant.contactId === contact.contactId){
            Object.assign(participant, contact);
          }
        });
      });

      if(!this.isPlanInProgress() && !this.isPlanCompleted()){
        this.reorderStatus = true;
      }
    }

    getContactsLocal(){
        this.contactsLocal.forEach(contact => {
            this.extractContactFromRaw(contact);
        });
        if(this.schedule.length){
            this.mergeContactDetails();
        }
    }

    getContacts(){

        let fields:ContactFieldType[] = ['*'];

        const options = new ContactFindOptions();
        options.multiple = true;
        options.hasPhoneNumber = true;

        this.contacts.find(fields, options).then((contacts) => {

            contacts.forEach(contact => {
                this.extractContactFromRaw(contact);
            });

            if(this.schedule.length){
                this.mergeContactDetails();
            }

        });

    }

    reorderItems(indexes) {
        // set new schedule
        this.schedule = reorderArray(this.schedule, indexes);
        // save new schedule
        let schedule = this.schedule.map(participant => { return participant.id });
        this.plansProvider.setSchedule(schedule, this.id).subscribe(response => {
            if(!response.ok){
                console.log('schedule error')
            }
        });
    }

    onSwipeRemoveParticipant(participant, index){
        if(!this.isPlanInProgress()){
            this.plansProvider.removeParticipant(participant, this.id).subscribe(response => {
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
                    message: 'Saving amount set at ' + currencyConvert(this.savingsAmount),
                    duration: DURATION
                });
                amountSaveToast.present();
            }
        });
    }

  openNameEdit(){

      if(this.isPlanInProgress() || this.isPlanCompleted()){
        return false
      }

      let updatePotNameAlert = this.alertCtrl.create({
        title:'Edit pot name',
        inputs: [
          {
            type: "text",
            name: 'potName',
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
              let potName = inputData.potName.trim();
              if(potName.length > 0){
                this.plansProvider.updatePlan(potName, this.id).subscribe(response => {
                  if (response.ok){
                    this.name = potName;
                  } else {
                    // error handling
                  }
                });

              }
            }
          }
        ],
        enableBackdropDismiss: false
      });

      updatePotNameAlert.present();

  }

  openSavingsAmountEdit(){

    let updateSavingsAmountAlert = this.alertCtrl.create({
      title: 'Enter savings amount',
      inputs: [
        {
          type: 'text',
          name: 'savingsAmount',
          max: '4',
          placeholder: '',
          value: this.savingsAmount
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (inputData) => {
            console.log(inputData.savingsAmount)
          }

        }
      ],
      enableBackdropDismiss: false
    });

    updateSavingsAmountAlert.present();

  }

  isNextToCollect(participant){
      return participant.id === this.nextParticipantToCollect
  }

  isNextToPay(participant){
      return this.nextParticipantsToPay.indexOf(participant.id) !== -1
  }

  getPlanName() {
      if(this.name !== ''){
          return this.name;
      }
      return this.plan['name'];
  }

  getStartButtonLabel(){

    if(this.isPlanCompleted()){
      return 'Completed'
    }
      return this.plan['status'] === 'in-progress' ? 'Pot started' : 'Start this pot';
  }

  getAddButtonLabel(){
      return this.isPlanCompleted() ? 'Completed' : 'Add/Remove participants';
  }

  isPlanInProgress(){
      if(this.status !== ''){
          return this.status === 'in-progress'
      }
      return this.plan['status'] === 'in-progress';
  }

  deletePot(){

    let startAlert = this.alertCtrl.create({
      title: 'Delete this pot?',
      message: "It will be gone forever, poof! Last chance now, are you sure?" ,
      buttons: [
        {
          text: 'Hmm',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Yes damnit!",
          handler: () => {

            this.plansProvider.archivePlan(this.id).subscribe(response => {
              if(response){
                this.navCtrl.pop();
              }
            });



          }
        }
      ]
    });
    startAlert.present();




  }

  isPlanCompleted(){
      if(this.status !== ''){
          return this.status === 'completed'
      }
      return this.plan['status'] === 'completed';
  }

  canStartPlan(){
      return this.initialAmt > 0 && this.schedule.length;
  }

  manageFunds(participant){
      const data = { participant: participant, pot: this.plan };

      let fundsModal = this.modalCtrl.create(FundsPage, data);
      fundsModal.onDidDismiss( shouldReload => {
          if(shouldReload){
              //this.nextParticipantsToPay = nextParticipantsToPay
              this.displayLoadingSpinner();
              this.fetchPlan();
          }
      });
      fundsModal.present();
  }

  viewParticipants(){
      const data = { list: this.schedule, potId: this.id, contacts: this.contactsList };
      let participantsModal = this.modalCtrl.create(ParticipantsPage, data);
      participantsModal.onDidDismiss( participants => {
          if(participants){
              this.schedule = participants;
              this.reorderStatus = true;
          }
      });
      participantsModal.present();
  }

  startPlan(){

    let startAlert = this.alertCtrl.create({
      title: 'Start this pot?',
      message: 'You will no longer be able to edit the pot name, saving amount or participants.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Start',
          handler: () => {

            this.plansProvider.startPlan(this.plan['id']).subscribe(result => {
              if (result){
                this.fetchPlan();
                this.reorderStatus = false;

                let startPlanToast = this.toastCtrl.create({
                  message: 'Pot started',
                  duration: DURATION,
                });
                startPlanToast.present();

              }
            })

          }
        }
      ]
    });
    startAlert.present();
  }

}
