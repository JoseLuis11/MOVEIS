import { Review } from './review.interface';

export interface File{
    $key?:string;
    date:string;
    title:string;
    genre:string;
    duration:string;
    rating:number;
    synopsis:string;
    imageUrl:string;
}