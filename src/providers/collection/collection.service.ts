import { ToastController } from 'ionic-angular';
import { Review } from './../../interfaces/review.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()

export class CollectionService {
    constructor(private afDatabase: AngularFireDatabase, private toastCtrl:ToastController){
        
    }

    addToCollection(file:File, userId: string){
        this.afDatabase.database.ref(`/profile/${userId}/collection`).push(file).then(()=>{
        this.showToast("Agregada a colección");
        }).catch(error=>{
            console.log(error)
        });
    }

    removeFromCollection(movieKey:string, userId: string){
        this.afDatabase.database.ref(`/profile/${userId}/collection/${movieKey}`).remove().then(result =>{

        }).catch(error =>{
            this.showToast("Algo salió mal borrando la pelicula, intentalo de nuevo.");
        })
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