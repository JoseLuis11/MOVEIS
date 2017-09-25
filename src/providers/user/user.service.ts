import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';

@Injectable() export class UserService {

    //private users: UserModel[] = [{ name: 'José Luis', lastName: 'Castro', email: 'joseluis@hotmail.com', password: 'pass' }];

    currentUser: UserModel;

    setCurrentUser(currentUser: UserModel): void {
        this.currentUser = currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}