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

      let key = 'administrator';
      if(localStorage.getItem(key) !== null){
        this.setAccessToken(localStorage.getItem(key));
      } else {

        let whatComesNext = administrator => {
          localStorage.setItem(key, administrator);
          this.setAccessToken(administrator);
        };
        this.plansProvider.getNewAdministrator().subscribe(whatComesNext);
      }
    } else {
      // redirect to error page
    }
  }

  setAccessToken(administrator){
    let whatComesNext = savedToken => {
      if(!savedToken){
        // redirect to error page
      }
    };
    this.plansProvider.setAccessToken(administrator).subscribe(whatComesNext);
  }








}
