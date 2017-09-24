import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MyApp } from './app.component';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "../config/firebase.config";

//pages
import { HomePage, RegisterPage, AddMoviePage, LoginPage, ReviewsPage, SynopsisPage } from '../pages/index.pages';

//services
import {UploadImageService, LoginService, UserService} from '../providers/index.providers'

//plugins
import { Camera } from '@ionic-native/camera';



@NgModule({
  declarations: [
    MyApp, HomePage, RegisterPage, AddMoviePage, LoginPage, ReviewsPage, SynopsisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, RegisterPage, LoginPage, AddMoviePage, ReviewsPage, SynopsisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UploadImageService,
    LoginService,
    UserService
  ]
})
export class AppModule { }
