import { CollectionService } from './../../providers/collection/collection.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { SynopsisPage } from './../synopsis/synopsis';
import { ReviewsPage } from './../reviews/reviews';
import { AddMoviePage } from './../add-movie/add-movie';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, MenuController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  movies: FirebaseListObservable<any[]>;
  collectionIcon = 'ios-bookmark-outline';

  collectionLenght = 0;
  page: string = "home";
  showImages: boolean;
  reviewsPage = ReviewsPage;
  synopsisPage = SynopsisPage;
  collection: Array<any>;
  userId: string;
  constructor(private af: AngularFireDatabase, private navParams: NavParams, public navCtrl: NavController,
    private modalController: ModalController, private menuCtrl: MenuController, private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase, private collectionService: CollectionService, private alertCtrl: AlertController) {
    this.movies = af.list('/movies');
    this.showImages = true;
  }

  ngOnInit() {
    this.loadCollection();
  }

  openModal() {
    let modal = this.modalController.create(AddMoviePage);

    modal.present();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  showSynopsis(title: string, synopsis: string) {
    this.navCtrl.push(this.synopsisPage, { title, synopsis })
  }

  showReviews($key: string) {
    this.navCtrl.push(this.reviewsPage, { $key })
    console.log($key);
  }

  changeToggleState() {
    if (this.showImages) {
      this.showImages = false;
    } else {
      this.showImages = true;
    }
  }

  loadCollection() {

    this.afAuth.authState.subscribe(data => {
      this.userId = data.uid;
      console.log(this.userId);
      this.afDatabase.list(`/profile/${data.uid}/collection`).take(1)
        .subscribe(collection => {
          this.collectionLenght = collection.length;

          this.collection = collection;
        }
        );

    });
  }


  doRefresh(refresher) {
    this.collection = undefined;
    this.loadCollection();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  addToCollection(file: File) {
    this.collectionService.addToCollection(file, this.userId);
  }

  removeFromCollection(movieKey: string) {
    this.collectionService.removeFromCollection(movieKey, this.userId);
    this.loadCollection();
  }

  showConfirm(movieKey: string) {
    let confirm = this.alertCtrl.create({
      title: 'Alerta',
      message: '¿Seguro que quieres remover esta película de tu colección?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No seleccionado');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.removeFromCollection(movieKey);
          }
        }
      ]
    });
    confirm.present();
  }

  /*TODO: getItems(ev) {
     // Reset items back to all of the items
     
 
     // set val to the value of the ev target
     var val = ev.target.value;
    
     // if the value is an empty string don't filter the items
     if(!val){
       return;
     }
 
     this.movies = this.movies.f
     if (val && val.trim() != '') {
       this.items = this.items.filter((item) => {
         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
       })
     }
   }*/
}
