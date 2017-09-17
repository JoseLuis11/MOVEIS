import { Component } from '@angular/core';
import { LoginPage } from '../index.pages'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {


  loginPage = LoginPage;
  /*constructor(private userService: UserService, private loginService: LoginService) {
    
      }
    
      user = new User('', '', '', '');
      alert = false;
    
      ngOnInit() {
        if (this.loginService.isLogged()) {
          //this.router.navigate(['../movies']);
        }
      }
    
      fieldVer(): void {
        if (this.user.name == '' || this.user.lastName == '' || this.user.email == '' || this.user.password == '') {
          this.alert = true;
        }
        else {
          this.alert = false;
        }
      }
    
      addUser(): void {
        this.fieldVer();
        if (!this.alert) {
          console.log(this.user);
          //this.router.navigate(['../login']);
          this.userService.addUser(this.user);
    
        }
      }*/
    

}
