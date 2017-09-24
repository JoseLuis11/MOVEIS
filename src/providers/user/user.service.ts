import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';

@Injectable() export class UserService {

    private users: UserModel[] = [{ name: 'José Luis', lastName: 'Castro', email: 'joseluis@hotmail.com', password: 'pass' }];

    currentUser = new UserModel(null, null, null, null);

    setCurrentUser(currentUser: UserModel): void {
        this.currentUser = currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    addUser(user: UserModel): void {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }

}