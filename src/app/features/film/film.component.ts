import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { MovieService } from '../../services/movie.service';
import { filter, forkJoin, Subscription } from 'rxjs';
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
export class FilmComponent implements OnInit, OnDestroy{

  isLoading: boolean = false;
  filmId: number;
  film: Movie; 
  characters: Character[] = [];
  charactersSub$: Subscription;
  routeSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ){}

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe(
      data => {
        this.filmId = data['id'];
      }
    );
    this.film = this.movieService.movies[this.filmId];
    this.isLoading = true;

    const requests = this.film.characters.map(characterUrl => 
      this.movieService.getCharacters(characterUrl)
    );

    this.charactersSub$ = forkJoin(requests).subscribe(
      results => {
        this.characters = results;
        this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.charactersSub$.unsubscribe();
    this.routeSub$.unsubscribe();
  }
}
