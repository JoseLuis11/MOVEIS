import { SynopsisPage } from './../synopsis/synopsis';
import { ReviewsPage } from './../reviews/reviews';
import { AddMoviePage } from './../add-movie/add-movie';
import { Component } from '@angular/core';
import { NavController, ModalController, MenuController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  movies: FirebaseListObservable<any[]>;
  collectionIcon = 'ios-bookmark-outline';

  reviewsPage = ReviewsPage;
  synopsisPage = SynopsisPage;

  constructor(private af: AngularFireDatabase, public navCtrl: NavController, private modalController: ModalController, private menuCtrl: MenuController) {
    this.movies = af.list('/movies');
  }


  openModal() {
    let modal = this.modalController.create(AddMoviePage);

    modal.present();
  }

  openMenu(){
    this.menuCtrl.open();
  }

}
