import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { RegisterPage, HomePage } from '../index.pages'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  registerPage = RegisterPage;
  homePage = HomePage;
  email: string;
  pass: string;

  constructor(private navController: NavController){

  }

  seeComponents(){
    console.log(this.email, this.pass);
  }
}
