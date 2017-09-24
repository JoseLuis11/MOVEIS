import { UserModel } from './../../models/user.model';
import { LoginPage } from './../../pages/login/login';
import { HomePage } from './../../pages/home/home';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, Promise } from 'firebase/app'

@Injectable()
export class LoginService {

    user:User;

    constructor(public angularFireAuth: AngularFireAuth){
        angularFireAuth.authState.subscribe((user:User)=>{
            this.user = user;
        })
    }

    get authenticated(): boolean{
        return this.user !=null;
    }

    signInWithEmailAndPassword(userModel: UserModel):Promise<any>{
        return this.angularFireAuth.auth.signInWithEmailAndPassword(userModel.email,userModel.password);
    }

    createUserWithEmailAndPassword(userModel: UserModel): Promise<any> {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password);
        this.angularFireAuth.auth.currentUser.upd
    }
    
    let $key = this.af.database.ref(`/${this.MOVIES}`).push(movie).key;

    private login: boolean = false;

    isLogged() {
        return this.login;
    }

    changeState(): void {
        if (this.login == false) {
            this.login = true
        } else {
            this.login = false;
            
        }
    }

    c: number = 0;
    users = this.af.list('/users');




    validate(email: string, password: string) {
        
        this.users.
        while (this.c < this.users.) {
            if (email == this.users[this.c].email && password == this.users[this.c].password) {
                this.userService.setCurrentUser(this.users[this.c]);
                this.c = 0;
                return true;
            }
            this.c++;
        }
        this.c = 0;
        return false;
    }

}