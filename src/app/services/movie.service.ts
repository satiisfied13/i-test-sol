import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Character } from "../models/characters.interface";

@Injectable({providedIn: 'root'})

export class MovieService {

    constructor(
        private http: HttpClient
    ) {}

    getMovies() {
        return this.http.get<Movie>(environment.URL + 'films/');
    }

    getCharacters(url) {
        return this.http.get<Character>(url);
    }
}