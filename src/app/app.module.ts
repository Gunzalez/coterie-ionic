import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlansPage } from '../pages/plans/plans';
import { PlanDetailsPage } from '../pages/plan-details/plan-details';
import { ParticipantsPage } from '../pages/participants/participants';
import { CollectionsPage } from '../pages/collections/collections';

import { Keyboard } from '@ionic-native/keyboard';

import { PlansProvider } from '../providers/plans/plans';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlansPage,
    PlanDetailsPage,
    ParticipantsPage,
    CollectionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms:{
        ios:{
          statusPadding: true
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlansPage,
    PlanDetailsPage,
    ParticipantsPage,
    CollectionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlansProvider,
    Keyboard
  ]
})
export class AppModule {}
