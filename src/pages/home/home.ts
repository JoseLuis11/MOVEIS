import { Review } from './../../interfaces/review.interface';
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

  moviesRef;
  movies = [];
  loadedMovieList;
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
    //cambios a partir de aqui
    this.moviesRef = af.database.ref('/movies');


    this.moviesRef.on('value', movieList => {
      let reviews:Review;
      let files = [];
      movieList.forEach(movie => {
        movie.val().key = movie.key;
        if(movie.val().reviews==null){
          reviews = {userId:"null",user:"null",text:"null"}
        }else{
          reviews = movie.val().reviews;
        }
        files.push({ title: movie.val().title, date: movie.val().date, genre: movie.val().genre, duration:movie.val().duration, rating:movie.val().rating, synopsis:movie.val().synopsis, imageUrl:movie.val().imageUrl,k:movie.key ,reviews:reviews});
        console.log(files);
        return false;
      });

      this.movies = files;
      this.loadedMovieList = files;
    });
    this.showImages = true;
  }

  initializeMovies() {
    this.movies = this.loadedMovieList;
  }

  getItems(ev) {
    // Reset items back to all of the items

    this.initializeMovies();
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (!val) {
      return;
    }

    this.movies = this.movies.filter((v) => {
      if (v.title && val) {
        if (v.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(val, this.movies.length);
  }

  //hasta aqui
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

  showReviews($key: string, title: string) {
    this.navCtrl.push(this.reviewsPage, { $key, title })
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

  addToCollection(movie:any) {
    this.collectionService.addToCollection(movie, this.userId);
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

  switchSegment(){
    if(this.page=="home"){
      this.page="collection";
    }else{
      this.page="home";
    }
  }


}
