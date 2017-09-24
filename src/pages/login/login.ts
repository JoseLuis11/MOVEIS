import { UserModel } from './../../models/user.model';
import { LoginService } from './../../providers/login/login.service';
import { NavController, MenuController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { RegisterPage, HomePage } from '../index.pages'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  registerPage = RegisterPage;
  homePage = HomePage;
  user = {} as UserModel;

  constructor(private navController: NavController, private loginService: LoginService, private menuCtrl: MenuController, private toastCtrl:ToastController){

  }

  ngOnInit() {
    
  }

  //video de firebase email login/authentication
  
  login2(){
    
  }


  //aqui termina
  authentication(): void {
    if (this.loginService.validate(this.email, this.pass)) {
      this.showToast("Sesion iniciada.");
      this.login();
    }
    else {
      this.showToast("Usuario o contraseña incorrectos.")
    }
  }

  login(){
    console.log(this.email, this.pass);

    this.menuCtrl.enable(true);
    this.loginService.changeState();
    console.log(this.loginService);

    this.navController.setRoot(HomePage);
  }



  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

  
}
