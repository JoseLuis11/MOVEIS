import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { LoginPage, RegisterPage } from '../pages/index.pages'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  loginPage = LoginPage;
  registerPage = RegisterPage;

  rootPage: any = LoginPage;

  constructor( private menuController: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: any) {
    this.rootPage = page;
    this.menuController.close();
  }
}

