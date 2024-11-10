import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { map, tap } from "rxjs";
import { Character } from "../models/characters.interface";

@Injectable({providedIn: 'root'})

export class MovieService {

    movies: Movie[] = [];
    characters: Character[] = [];

    imageUrls = [
        'https://m.media-amazon.com/images/I/612h-jwI+EL._AC_UF1000,1000_QL80_.jpg',
        'https://m.media-amazon.com/images/I/71j4eFd2kpL._AC_UF894,1000_QL80_.jpg',
        'https://m.media-amazon.com/images/M/MV5BNWEwOTI0MmUtMGNmNy00ODViLTlkZDQtZTg1YmQ3MDgyNTUzXkEyXkFqcGc@._V1_.jpg',
        'https://m.media-amazon.com/images/M/MV5BODVhNGIxOGItYWNlMi00YTA0LWI3NTctZmQxZGUwZDEyZWI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        'https://m.media-amazon.com/images/M/MV5BNTgxMjY2YzUtZmVmNC00YjAwLWJlODMtNDBhNzllNzIzMjgxXkEyXkFqcGc@._V1_.jpg',
        'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_FMjpg_UX1000_.jpg'
    ];

    constructor(
        private http: HttpClient
    ) {}

    getMovies() {
        return this.http.get(environment.URL + 'films/').pipe(map( data => {
            let temp = data['result'];
            for (let key of temp) {
                let clonnedProp = {...key['properties'], image: this.imageUrls[this.movies.length]}
                this.movies.push(clonnedProp)
            }
        }));
    }

    getCharacters(url: string) {
        return this.http.get<Character>(url).pipe(
            map(data => data['result']['properties'])
        );
    }
}