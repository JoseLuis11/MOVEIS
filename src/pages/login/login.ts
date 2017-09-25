import { AngularFireAuth } from 'angularfire2/auth';
import { UserModel } from './../../models/user.model';
import { LoginService } from './../../providers/login/login.service';
import { NavController, MenuController, ToastController, LoadingController } from 'ionic-angular';
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


  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController, private loginService: LoginService,
    private loadingCtrl: LoadingController, private menuCtrl: MenuController, private toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.user.email = '';
    this.user.password = '';
  }

  //video de firebase email login/authentication

  login2() {

    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.loginService.signInWithEmailAndPassword(this.user).then(result => {
      loading.dismiss();
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot(this.homePage);
      
      this.showToast("Bienvenido a MOVEIS, " + this.user.email);
      
    }).catch(error => {
      loading.dismiss();
      if (error.message.includes("There is no user record corresponding to this identifier")) {
        this.showToast('Usuario inexistente.');
      } else if (error.message.includes("The password is invalid")) {
        this.showToast('Contraseña incorrecta.');
      }
      else {
        this.showToast('Ha ocurrido un error inesperado. Por favor intente nuevamente.');
      }
      console.log(error);

    });
  }


  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }


}
