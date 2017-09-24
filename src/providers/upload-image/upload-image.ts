import { Review } from './../../interfaces/review.interface';
import { File } from './../../interfaces/file.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { ToastController } from 'ionic-angular';


@Injectable()
export class UploadImageService {

  private ALBUM_IMAGES: string = "img";
  private MOVIES: string = "movies";

  imagenes: any[] = [];

  lastKey: string = null;

  constructor(public af: AngularFireDatabase, public toastCtrl: ToastController) { }

  uploadImage2Firebase(file: File) {

    let promise = new Promise((resolve, eject) => {

      let storageRef = firebase.storage().ref();
      let fileName = new Date().valueOf();

      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.ALBUM_IMAGES}/${fileName}`).putString(file.imageUrl,'base64',{contentType: 'image/jpeg'});
      
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{

      },

      (error)=>{
        this.showToast("Error al cargar "+JSON.stringify(error));
        
      },

      ()=>{
        let url = uploadTask.snapshot.downloadURL;
        this.showToast("Película cargada exitosamente");
        this.createMovie(file.title, file.genre, file.duration, file.rating, file.synopsis, file.reviews, url);
        resolve();
      }
      )

    });

    return promise;

  }

  private createMovie(title:string, genre:string, duration:string, rating:number, synopsis:string, reviews: Review, url:string){
    let movie:File = {
      title: title,
      genre: genre,
      duration: duration,
      rating: rating,
      synopsis:synopsis,
      reviews: reviews,
      imageUrl: url,
    };

    let $key = this.af.database.ref(`/${this.MOVIES}`).push(movie).key;

    movie.$key = $key;

    this.imagenes.push(movie);
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }
}
