import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './../../interfaces/profile.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../home/home';
import { MenuController, NavController, ToastController, LoadingController } from 'ionic-angular';
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


  user = {} as UserModel;
  profile = {} as Profile;

  loginPage = LoginPage;
  constructor(private userService: UserService, private loginService: LoginService, private menuCtrl: MenuController, private navCtrl: NavController,
    private loadingCtrl: LoadingController, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toastCtrl: ToastController) {

  }


  ngOnInit() {
    this.user.email = '';
    this.user.password = '';
  }

  register() {

    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta. Por favor, espere...'
    });
    loading.present();

    this.loginService.createUserWithEmailAndPassword(this.user).then(result => {
      loading.dismiss();
      
      this.createProfile();
      this.navCtrl.pop();
      this.showToast("Registrado con éxito.")

    }).catch(error => {
      loading.dismiss();

      console.log(error);
      this.showToast("Ha ocurrido un error inesperado. Por favor intente nuevamente.");
    });

  }

  createProfile() {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile).then(() => {
      }).catch(error => {
        this.showToast("Algo salió mal, intentalo de nuevo.");
        console.log(error);
      })
    })
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }


}
