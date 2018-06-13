import { Component, ViewChild } from '@angular/core';

import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

import { ViewController, NavController, ToastController, NavParams, Content, reorderArray } from 'ionic-angular';

import { sortList, isEquivalent, filtered } from '../../helpers/helpers';

const DURATION = 1000;

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

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
    private contactsFiltered:any[] = [];

    public myInput:string = '';

    public contactsGrouped:any[] = [];
    public participantsList:any[] = [];
    public participantsListInitial:any[] = [];

    @ViewChild('Content') content: Content;

    constructor(private contacts: Contacts, private viewCtrl: ViewController, public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams) {
        this.participantsList = this.navParams.get('list');
        this.participantsListInitial = this.participantsList.slice();

    }

    ionViewDidLoad(){
        //this.getContacts();
        this.getContactsLocal();
    }

    participantsChanged(){
        return JSON.stringify(this.participantsList) === JSON.stringify(this.participantsListInitial);
    }

    getContacts(){

        let fields:ContactFieldType[] = ['*'];

        const options = new ContactFindOptions();
        options.multiple = true;
        options.hasPhoneNumber = true;

        this.contacts.find(fields, options).then((contacts) => {

            contacts.forEach(contact => {

                let nameToUse:any = null;

                if(contact.displayName && contact.displayName.length){
                    nameToUse = contact.displayName;
                } else if (contact.name.formatted && contact.name.formatted) {
                  nameToUse = contact.name.formatted;
                } else if (contact.name.givenName && contact.name.givenName.length) {
                  nameToUse = contact.name.givenName + ' ' + contact.name.familyName
                } else if (contact.nickname && contact.nickname.length) {
                    nameToUse = contact.nickname;
                }

                if(nameToUse && nameToUse.length){
                    this.contactsList.push({
                        "platformId": contact.id,
                        "name": nameToUse,
                        //"number": contact.phoneNumbers[0].value,
                        "isParticipant": false
                    })
                }

            });

            this.participantsList.forEach(participant => {
                this.contactsList.forEach(contact => {
                    if(participant.platformId === contact.platformId){
                        contact.isParticipant = true;
                    }
                })
            });

            this.contactsFiltered = this.contactsList.slice();
            this.groupContacts();
        })
    }

    getContactsLocal(){

        this.contactsLocal.forEach(contact => {

            let nameToUse:string = '';

            if(contact.displayName && contact.displayName.length){
                nameToUse = contact.displayName;
            } else if (contact.nickname && contact.nickname.length) {
                nameToUse = contact.nickname;
            } else if (contact.name.formatted && contact.name.formatted) {
                nameToUse = contact.name.formatted;
            } else if (contact.name.givenName && contact.name.givenName.length) {
                nameToUse = contact.name.givenName + ' ' + contact.name.familyName
            }

            if(nameToUse.length){
                this.contactsList.push({
                    "platformId": contact.id,
                    "name": nameToUse,
                    "number": contact.phoneNumbers[0].value,
                    "isParticipant": false
                })
            }

        });

        this.participantsList.forEach(participant => {
            this.contactsList.forEach(contact => {
                if(participant.platformId === contact.platformId){
                    contact.isParticipant = true;
                }
            })
        });

        this.contactsFiltered = this.contactsList.slice();
        this.groupContacts();
    }

    onInput(){
        this.contactsFiltered = filtered(this.myInput, this.contactsList);
        this.groupContacts();
    }

    onClickContact(contact){

        if(contact.isParticipant){

            // remove from participants
            this.participantsList.forEach((participant, index) => {

                this.contactsFiltered.forEach(contactCopy => {
                    if(isEquivalent(contactCopy, contact)){
                        contactCopy.isParticipant = false
                    }
                });

                participant.isParticipant = false;
                contact.isParticipant = false;

                if(isEquivalent(participant, contact)){
                    this.participantsList.splice(index, 1).pop();
                }
            })

        } else {

            // add to participants
            this.contactsFiltered.forEach(contactCopy => {
                if(isEquivalent(contactCopy, contact)){
                    contactCopy.isParticipant = true;
                    contact.isParticipant = true;
                    let participant = Object.assign({}, contact);
                    this.participantsList.push(participant);
                }
            });
        }
    }

    onRemoveParticipant(index){
        let participant = this.participantsList.splice(index, 1).pop();
        this.contactsList.forEach(contact => {
            if(isEquivalent(participant, contact)){

                this.contactsFiltered.forEach(contactCopy => {
                    if(isEquivalent(contactCopy, contact)){
                      contactCopy.isParticipant = false
                    }
                });

                delete contact["isParticipant"];
            }
        });
    }

    reorderItems(indexes) {
        this.participantsList = reorderArray(this.participantsList, indexes);
    }

    onSaveParticipants(){
        // console.log('Saves: ');
        // console.log(this.participantsList);
        if(this.participantsList.length){
            let doneSaving = this.toastCtrl.create({
                message: 'Participants saved',
                duration: DURATION
            });
            doneSaving.present();
            this.viewCtrl.dismiss(this.participantsList)
        }
    }

    onDismiss(){
        this.navCtrl.pop();
    }

    scrollToTop() {
        this.content.scrollToTop(1000);
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



