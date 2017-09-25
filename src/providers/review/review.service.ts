import { ToastController } from 'ionic-angular';
import { Review } from './../../interfaces/review.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()

export class ReviewService {
    constructor(private afDatabase: AngularFireDatabase, private toastCtrl:ToastController){
        
    }

    uploadReview(review:Review, movieKey: string){
        console.log(review);
        console.log(movieKey);
        this.afDatabase.database.ref(`/movies/${movieKey}/reviews`).push(review).then(()=>{
          
        }).catch(error=>{
            console.log(error)
        });
    }

    removeKey(reviewKey:string, movieKey:string){
        this.afDatabase.object(`/movies/${movieKey}/reviews/${reviewKey}`).remove().then(result =>{

        }).catch(error =>{
            this.showToast("Algo salió mal borrando la reseña, intentalo de nuevo.");
        })
    }

    private showToast(text: string) {
        this.toastCtrl.create({
          message: text,
          duration: 2500
    
        }).present();
      }
    
}