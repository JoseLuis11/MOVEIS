import { genres } from './../../providers/genres/genres';
import { UploadImageService } from './../../providers/upload-image/upload-image';
import { Component } from '@angular/core';
import { ViewController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-add-movie',
  templateUrl: 'add-movie.html'
})
export class AddMoviePage {

  imagePreview: string = null;
  title: string;
  genre: string;
  duration: string;
  rating: number=0;
  synopsis: string;
  img: string = "";
  genres= genres;
  isImageSelected= false;
  

  constructor(private ViewCtrl: ViewController, private uploadImageService: UploadImageService, private camera: Camera, private platform: Platform, private alerCtrl: AlertController, private loadingCtrl: LoadingController) {
    console.log(this.genre);
  }

  uploadMovie() {
    let file = {
      'title': this.title,
      'genre': this.genre,
      'duration': this.duration,
      'rating': this.rating,
      'synopsis': this.synopsis,
      'reviews': { 'user': "man", 'text': "jeje" },
      'imageUrl': this.img
    }


    let loader = this.loadingCtrl.create({
      content: "Subiendo...",
      duration: 3000
    });
    loader.present();


    this.uploadImageService.uploadImage2Firebase(file).then(
      () => {
        loader.dismiss();
        this.closeModal();
      },
      (error) => {
        loader.dismiss();
        this.showAlert("Error", "Error al subir: " + error);
      }
    );
  }

  pickImage() {

    if (!this.platform.is("cordova")) {
      console.error("Debe ser desde celular");
      return;
    }

    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      allowEdit: true,
      targetWidth: 265,
      targetHeight: 360
    };

    if (Camera['installed']()) {
      this.camera.getPicture(options).then((data) => {
        this.imagePreview = 'data:image/jpg;base64,' + data
        this.img = data;
        this.isImageSelected = true;

      }, (err) => {
        if (err == "Selection cancelled.") {
          return;
        } else {
          this.showAlert("Error", "Fallo en la elección.");
        }
      });
    }

  }






  showAlert(errorTitle: string, subtitle: string): void {
    let alert = this.alerCtrl.create({
      title: errorTitle,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  closeModal() {
    this.ViewCtrl.dismiss();
  }

}
