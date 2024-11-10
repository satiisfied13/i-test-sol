import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';
import { filter, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/characters.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent implements OnInit{

  re = /(\d+)$/;
  isLoading: boolean = false;
  filmId: number;
  film: Movie; 
  isFilmChosen: boolean;
  characters: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.filmId = data['id'];
      }
    );
    this.film = this.movieService.movies[this.filmId];
    this.isLoading = true;

    const requests = this.film.characters.map(characterUrl => 
      this.movieService.getCharacters(characterUrl)
    );

    forkJoin(requests).subscribe(
      results => {
        this.characters = results;
        this.isLoading = false;
    });
  }
}
