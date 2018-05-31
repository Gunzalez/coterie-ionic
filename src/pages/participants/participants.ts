import { Component } from '@angular/core';

import { Contacts } from '@ionic-native/contacts';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html'
})
export class ParticipantsPage {

    // allContacts = [
    //   {
    //     "_objectInstance":{
    //       "id":5,
    //       "rawId":null,
    //       "displayName":null,
    //       "name":{
    //         "givenName":"Hank",
    //         "honorificSuffix":"",
    //         "formatted":"Hank M. Zakroff",
    //         "middleName":"M.",
    //         "familyName":"Zakroff",
    //         "honorificPrefix":""
    //       },
    //       "nickname":"",
    //       "phoneNumbers":[
    //         {
    //           "value":"(555) 766-4823",
    //           "pref":false,
    //           "id":0,
    //           "type":"work"
    //         },
    //         {
    //           "value":"(707) 555-1854",
    //           "pref":false,
    //           "id":1,
    //           "type":"other"
    //         }
    //       ],
    //       "emails":[
    //         {
    //           "value":"hank-zakroff@mac.com",
    //           "pref":false,
    //           "id":0,
    //           "type":"work"
    //         }
    //       ],
    //       "addresses":[
    //         {
    //           "pref":"false",
    //           "locality":"San Rafael",
    //           "region":"CA",
    //           "id":0,
    //           "postalCode":"94901",
    //           "country":"",
    //           "type":"work",
    //           "streetAddress":"1741 Kearny Street"
    //         }
    //       ],
    //       "ims":null,
    //       "organizations":[
    //         {
    //           "pref":"false",
    //           "title":"Portfolio Manager",
    //           "name":"Financial Services Inc.",
    //           "department":"",
    //           "type":null
    //         }
    //       ],
    //       "birthday":null,
    //       "note":"",
    //       "photos":null,
    //       "categories":null,
    //       "urls":null
    //     },
    //     "rawId":null
    //   },
    //   {
    //     "_objectInstance":{
    //       "id":1,
    //       "rawId":null,
    //       "displayName":null,
    //       "name":{
    //         "givenName":"Kate",
    //         "honorificSuffix":"",
    //         "formatted":"Kate Bell",
    //         "middleName":"",
    //         "familyName":"Bell",
    //         "honorificPrefix":""
    //       },
    //       "nickname":"",
    //       "phoneNumbers":[
    //         {
    //           "value":"(555) 564-8583",
    //           "pref":false,
    //           "id":0,
    //           "type":"mobile"
    //         },
    //         {
    //           "value":"(415) 555-3695",
    //           "pref":false,
    //           "id":1,
    //           "type":"main"
    //         }
    //       ],
    //       "emails":[
    //         {
    //           "value":"kate-bell@mac.com",
    //           "pref":false,
    //           "id":0,
    //           "type":"work"
    //         }
    //       ],
    //       "addresses":[
    //         {
    //           "pref":"false",
    //           "locality":"Hillsborough",
    //           "region":"CA",
    //           "id":0,
    //           "postalCode":"94010",
    //           "country":"",
    //           "type":"work",
    //           "streetAddress":"165 Davis Street"
    //         }
    //       ],
    //       "ims":null,
    //       "organizations":[
    //         {
    //           "pref":"false",
    //           "title":"Producer",
    //           "name":"Creative Consulting",
    //           "department":"",
    //           "type":null
    //         }
    //       ],
    //       "birthday":"1978-01-20T12:00:00.000Z",
    //       "note":"",
    //       "photos":null,
    //       "categories":null,
    //       "urls":[
    //         {
    //           "value":"www.icloud.com",
    //           "pref":false,
    //           "id":0,
    //           "type":"profile"
    //         }
    //       ]
    //     },
    //     "rawId":null
    //   },
    //   {
    //     "_objectInstance":{
    //       "id":6,
    //       "rawId":null,
    //       "displayName":null,
    //       "name":{
    //         "givenName":"David",
    //         "honorificSuffix":"",
    //         "formatted":"David Taylor",
    //         "middleName":"",
    //         "familyName":"Taylor",
    //         "honorificPrefix":""
    //       },
    //       "nickname":"",
    //       "phoneNumbers":[
    //         {
    //           "value":"555-610-6679",
    //           "pref":false,
    //           "id":0,
    //           "type":"home"
    //         }
    //       ],
    //       "emails":null,
    //       "addresses":[
    //         {
    //           "pref":"false",
    //           "locality":"Tiburon",
    //           "region":"CA",
    //           "id":0,
    //           "postalCode":"94920",
    //           "country":"USA",
    //           "type":"home",
    //           "streetAddress":"1747 Steuart Street"
    //         }
    //       ],
    //       "ims":null,
    //       "organizations":[
    //         {
    //           "pref":"false",
    //           "title":"",
    //           "name":"",
    //           "department":"",
    //           "type":null
    //         }
    //       ],
    //       "birthday":"1998-06-15T12:00:00.000Z",
    //       "note":"Plays on Cole's Little League Baseball Team\n",
    //       "photos":null,
    //       "categories":null,
    //       "urls":null
    //     },
    //     "rawId":null
    //   },
    //   {
    //     "_objectInstance":{
    //       "id":2,
    //       "rawId":null,
    //       "displayName":null,
    //       "name":{
    //         "givenName":"Daniel",
    //         "honorificSuffix":"Jr.",
    //         "formatted":"Daniel Higgins Jr.",
    //         "middleName":"",
    //         "familyName":"Higgins",
    //         "honorificPrefix":""
    //       },
    //       "nickname":"",
    //       "phoneNumbers":[
    //         {
    //           "value":"555-478-7672",
    //           "pref":false,
    //           "id":0,
    //           "type":"home"
    //         },
    //         {
    //           "value":"(408) 555-5270",
    //           "pref":false,
    //           "id":1,
    //           "type":"mobile"
    //         },
    //         {
    //           "value":"(408) 555-3514",
    //           "pref":false,
    //           "id":2,
    //           "type":"home fax"
    //         }
    //       ],
    //       "emails":[
    //         {
    //           "value":"d-higgins@mac.com",
    //           "pref":false,
    //           "id":0,
    //           "type":"home"
    //         }
    //       ],
    //       "addresses":[
    //         {
    //           "pref":"false",
    //           "locality":"Corte Madera",
    //           "region":"CA",
    //           "id":0,
    //           "postalCode":"94925",
    //           "country":"USA",
    //           "type":"home",
    //           "streetAddress":"332 Laguna Street"
    //         }
    //       ],
    //       "ims":null,
    //       "organizations":[
    //         {
    //           "pref":"false",
    //           "title":"",
    //           "name":"",
    //           "department":"",
    //           "type":null
    //         }
    //       ],
    //       "birthday":null,
    //       "note":"Sister: Emily",
    //       "photos":null,
    //       "categories":null,
    //       "urls":null
    //     },
    //     "rawId":null
    //   },
    //   {
    //     "_objectInstance":{
    //       "id":7,
    //       "rawId":null,
    //       "displayName":null,
    //       "name":{
    //         "givenName":"Patrick",
    //         "honorificSuffix":"",
    //         "formatted":"Patrick Bateman",
    //         "middleName":"",
    //         "familyName":"Bateman",
    //         "honorificPrefix":""
    //       },
    //       "nickname":"",
    //       "phoneNumbers":[
    //         {
    //           "value":"02088005566",
    //           "pref":false,
    //           "id":0,
    //           "type":"home"
    //         }
    //       ],
    //       "emails":null,
    //       "addresses":null,
    //       "ims":null,
    //       "organizations":[
    //         {
    //           "pref":"false",
    //           "title":"",
    //           "name":"American Pyscho",
    //           "department":"",
    //           "type":null
    //         }
    //       ],
    //       "birthday":null,
    //       "note":"",
    //       "photos":null,
    //       "categories":null,
    //       "urls":null
    //     },
    //     "rawId":null
    //   },
    //   {
    //     "_objectInstance":{
    //       "id":3,
    //       "rawId":null,
    //       "displayName":null,
    //       "name":{
    //         "givenName":"John",
    //         "honorificSuffix":"",
    //         "formatted":"John Appleseed",
    //         "middleName":"",
    //         "familyName":"Appleseed",
    //         "honorificPrefix":""
    //       },
    //       "nickname":"",
    //       "phoneNumbers":[
    //         {
    //           "value":"888-555-5512",
    //           "pref":false,
    //           "id":0,
    //           "type":"mobile"
    //         },
    //         {
    //           "value":"888-555-1212",
    //           "pref":false,
    //           "id":1,
    //           "type":"home"
    //         }
    //       ],
    //       "emails":[
    //         {
    //           "value":"John-Appleseed@mac.com",
    //           "pref":false,
    //           "id":0,
    //           "type":"work"
    //         }
    //       ],
    //       "addresses":[
    //         {
    //           "pref":"false",
    //           "locality":"Atlanta",
    //           "region":"GA",
    //           "id":0,
    //           "postalCode":"30303",
    //           "country":"USA",
    //           "type":"work",
    //           "streetAddress":"3494 Kuhl Avenue"
    //         },
    //         {
    //           "pref":"false",
    //           "locality":"Atlanta",
    //           "region":"GA",
    //           "id":1,
    //           "postalCode":"30303",
    //           "country":"USA",
    //           "type":"home",
    //           "streetAddress":"1234 Laurel Street"
    //         }
    //       ],
    //       "ims":null,
    //       "organizations":[
    //         {
    //           "pref":"false",
    //           "title":"",
    //           "name":"",
    //           "department":"",
    //           "type":null
    //         }
    //       ],
    //       "birthday":"1980-06-22T12:00:00.000Z",
    //       "note":"College roommate",
    //       "photos":null,
    //       "categories":null,
    //       "urls":null
    //     },
    //     "rawId":null
    //   },
    //   {
    //     "_objectInstance":{
    //       "id":4,
    //       "rawId":null,
    //       "displayName":null,
    //       "name":{
    //         "givenName":"Anna",
    //         "honorificSuffix":"",
    //         "formatted":"Anna Haro",
    //         "middleName":"",
    //         "familyName":"Haro",
    //         "honorificPrefix":""
    //       },
    //       "nickname":"Annie",
    //       "phoneNumbers":[
    //         {
    //           "value":"555-522-8243",
    //           "pref":false,
    //           "id":0,
    //           "type":"home"
    //         }
    //       ],
    //       "emails":[
    //         {
    //           "value":"anna-haro@mac.com",
    //           "pref":false,
    //           "id":0,
    //           "type":"home"
    //         }
    //       ],
    //       "addresses":[
    //         {
    //           "pref":"false",
    //           "locality":"Sausalito",
    //           "region":"CA",
    //           "id":0,
    //           "postalCode":"94965",
    //           "country":"USA",
    //           "type":"home",
    //           "streetAddress":"1001  Leavenworth Street"
    //         }
    //       ],
    //       "ims":null,
    //       "organizations":[
    //         {
    //           "pref":"false",
    //           "title":"",
    //           "name":"",
    //           "department":"",
    //           "type":null
    //         }
    //       ],
    //       "birthday":"1985-08-29T12:00:00.000Z",
    //       "note":"",
    //       "photos":null,
    //       "categories":null,
    //       "urls":null
    //     },
    //     "rawId":null
    //   }
    // ];
    allContacts = [];
    contactList = [];
    participants = [];

    constructor(private contacts: Contacts) {}

    ionViewDidLoad(){

        this.getAllContacts();

        //this.doLocal()
    }

    getAllContacts(){

        this.contacts.find(["displayName", "phoneNumbers"], {multiple: true, hasPhoneNumber: true}).then((contacts) => {

            contacts.map(contact => {
                let displayContact = {
                    "name": contact["_objectInstance"].name.formatted,
                    "number": contact["_objectInstance"].phoneNumbers[0].value
                };
                this.contactList.push(displayContact);
            });
        })
    }

    doLocal(){

        this.allContacts.map(contact => {
            let displayContact = {
                "name": contact["_objectInstance"].name.formatted,
                "number": contact["_objectInstance"].phoneNumbers[0].value
            };
            this.contactList.push(displayContact);
        });
    }

    onAddParticipant(index){
        let participant = this.contactList.splice(index, 1);
        this.participants.push(participant.pop())
    }

    onRemoveParticipant(index){
        let participant = this.participants.splice(index, 1);
        this.contactList.push(participant.pop())
    }

}





