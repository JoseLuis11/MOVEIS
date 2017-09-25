import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';


@Component({
  selector: 'page-synopsis',
  templateUrl: 'synopsis.html'
})
export class SynopsisPage {
  title:string;
  synopsis:string;
  constructor(private navParams:NavParams){
    this.title = navParams.get('title');
    this.synopsis = navParams.get('synopsis');
  }  

}
