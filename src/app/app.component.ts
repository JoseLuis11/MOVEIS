import { Profile } from './../interfaces/profile.interface';
import { LoginService } from './../providers/login/login.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Platform, MenuController, App, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { LoginPage, RegisterPage } from '../pages/index.pages'
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  loginPage = LoginPage;
  registerPage = RegisterPage;

  rootPage: any = LoginPage;
  isLogged = false;

  

  constructor(private menuController: MenuController, platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private loginService: LoginService, private app: App, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuController.enable(false);
    });
  }

  ngOnInit() {
    
  }

  openPage(page: any) {
    this.menuController.close();
    this.rootPage = page;
  }


  signOut(){
    this.loginService.signOut();
    this.app.getRootNav().setRoot(LoginPage);
    this.showToast("Sesión cerrada.")
    this.menuController.enable(false);
    this.menuController.close();
  }
  

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }
}

