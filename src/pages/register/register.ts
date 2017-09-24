import { HomePage } from './../home/home';
import { MenuController, NavController, ToastController } from 'ionic-angular';
import { UserModel } from './../../models/user.model';
import { LoginService } from './../../providers/login/login.service';
import { UserService } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { LoginPage } from '../index.pages'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {


  

  loginPage = LoginPage;
  constructor(private userService: UserService, private loginService: LoginService, private menuCtrl:MenuController, private navCtrl:NavController,
  private toastCtrl: ToastController ) {

  }

  user = new UserModel('','', '', '', '');

  ngOnInit() {

  }

  addUser(): void {
    console.log(this.user);
    this.userService.addUser(this.user);
    this.menuCtrl.enable(true);
    this.showToast("Registro con éxito.")
    this.navCtrl.setRoot(HomePage);
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }


}
