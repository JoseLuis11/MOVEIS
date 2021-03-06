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
    }
    
    signOut(): Promise<any> {
        return this.angularFireAuth.auth.signOut();
    }


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






}