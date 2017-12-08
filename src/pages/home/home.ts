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

    let whatComesNext = administrator => {
      console.log(administrator);
    };
    this.plansProvider.setAdministrator().subscribe(whatComesNext);

  }








}
