import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlanDetailsPage } from '../pages/plan-details/plan-details';
import { ParticipantsPage } from '../pages/participants/participants';
import { Contacts } from '@ionic-native/contacts';

import { PlansProvider } from '../providers/plans/plans';

import { AutoHideDirective } from '../directives/auto-hide/auto-hide';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlanDetailsPage,
    ParticipantsPage,
    AutoHideDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    PlanDetailsPage,
    ParticipantsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlansProvider,
    Contacts
  ]
})
export class AppModule {}
