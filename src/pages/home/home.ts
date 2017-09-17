import { AddMoviePage } from './../add-movie/add-movie';
import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  movies: FirebaseListObservable<any[]>;
  collectionIcon= 'ios-bookmark-outline';

  constructor(private af: AngularFireDatabase, public navCtrl: NavController, private modalController: ModalController) {
    this.movies = af.list('/movies');
    
  }

  
  openModal(){
    let modal = this.modalController.create(AddMoviePage);

    modal.present();
  }

}
