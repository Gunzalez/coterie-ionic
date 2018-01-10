import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlansPage } from '../plans/plans'
import { PlansProvider } from '../../providers/plans/plans';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public plansPage = PlansPage;

    constructor(public navCtrl: NavController, private plansProvider: PlansProvider,) {}

    ionViewDidLoad() {

        if (typeof(Storage) !== "undefined") {

            let key = 'accessToken';

            if(localStorage.getItem(key) === null){
                // no access token saved, create a new one

                let whatComesNext = registrationString => {


                    let whatComesNext = authorisationToken  => {

                      // save new token in local storage
                      localStorage.setItem(key, authorisationToken);

                      // set headers with this new token
                      this.plansProvider.setHeaders(authorisationToken);

                    };
                    this.plansProvider.getAccessToken(registrationString).subscribe(whatComesNext)

                };
                this.plansProvider.getRegistrationString().subscribe(whatComesNext);

            } else {

                // set headers with existing access token in local storage
                this.plansProvider.setHeaders(localStorage.getItem(key));

            }

        } else {

            // redirect to error page
            // no local storage on this machine

        }
    }
}
