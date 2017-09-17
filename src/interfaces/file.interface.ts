import { Review } from './review.interface';

export interface File{
    $key?:string;
    title:string;
    genre:string;
    duration:string;
    rating:number;
    synopsis:string;
    reviews : Review;
    imageUrl:string;
    
}