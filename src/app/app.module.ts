import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlansPage } from '../pages/plans/plans';
import { PlansProvider } from '../providers/plans/plans';
import { PlanDetailsPage } from '../pages/plan-details/plan-details';
import { ParticipantsProvider } from '../providers/participants/participants';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlansPage,
    PlanDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlansPage,
    PlanDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlansProvider,
    ParticipantsProvider
  ]
})
export class AppModule {}
