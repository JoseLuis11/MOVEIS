import { ReviewService } from './../../providers/review/review.service';
import { Profile } from './../../interfaces/profile.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavParams, AlertController } from 'ionic-angular';
import { Review } from './../../interfaces/review.interface';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html'
})
export class ReviewsPage {


  reviewsData: FirebaseListObservable<any[]>;
  movieKey: string;
  movieTitle:string;
  public profileData: FirebaseListObservable<any>;
  text:string;
  review = {} as Review;
  userId: string;
  constructor(private afDatabase: AngularFireDatabase, private navParams: NavParams,
    private afAuth: AngularFireAuth, private reviewService: ReviewService, private alertCtrl:AlertController) {

    this.movieKey = navParams.get('$key')
    this.movieTitle = navParams.get('title');
    this.reviewsData = this.afDatabase.list(`movies/${this.movieKey}/reviews`);
    this.text = '';
    console.log(this.movieKey);




  }

  ngOnInit() {
    this.afAuth.authState.subscribe(data => {
      this.userId = data.uid;
      this.afDatabase.object(`/profile/${data.uid}`)
        .subscribe(user => {
          console.log(user)
          this.review.user = user.firstName;
        }
        );

    });

    this.profileData = this.afDatabase.list(`/profile`);

  }

  uploadReview() {
    this.review.text= this.text;
    this.review.userId = this.userId;
    this.reviewService.uploadReview(this.review, this.movieKey);
    this.text='';
  }

  removeReview(reviewKey:string){
    this.reviewService.removeKey(reviewKey, this.movieKey);
  }

  showConfirm(reviewKey:string) {
    let confirm = this.alertCtrl.create({
      title: 'Alerta',
      message: '¿Seguro que quieres eliminar esta reseña?',
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
            this.removeReview(reviewKey);
          }
        }
      ]
    });
    confirm.present();
  }


}
