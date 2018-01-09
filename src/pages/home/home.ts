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

  constructor(public navCtrl: NavController, private plansProvider: PlansProvider,) {

  }


  ionViewDidLoad() {

    if (typeof(Storage) !== "undefined") {

      let key = 'accessToken';
      if(localStorage.getItem(key) === null){
        let whatComesNext = accessToken => {
          accessToken.subscribe(value => {
            localStorage.setItem(key, value);
            this.plansProvider.setHeaders(value);
          })
        };
        this.plansProvider.setNewAccessToken().subscribe(whatComesNext);
      } else {
        let savedToken = localStorage.getItem(key);
        this.plansProvider.setHeaders(savedToken);
      }

    } else {
      // redirect to error page
      // no local storage on this machine
    }
  }








}
