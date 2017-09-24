import { Injectable } from '@angular/core';


@Injectable() export class GenresService{

    private genres: string[] = 
    
    ["Acción", "Animación", "Aventura", "Sci-Fi", "Comedia", "Documental", "Fantasía", "Romance", "Terror"];

    getGenres(){
        return this.genres;
    }
}





