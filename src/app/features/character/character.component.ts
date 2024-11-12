import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../models/characters.interface';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.interface';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit, OnDestroy{
  character: Character;
  url;
  isLoading: boolean = false;
  movies: Movie[] = [];
  routeSub$: Subscription;
  moviesSub$: Subscription;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.routeSub$ = this.route.queryParams.subscribe(
      data => {
        this.url = data['u'];
      }
    );

    this.isLoading = true;

    this.moviesSub$ = this.movieService.getCharacters(this.url).subscribe( data => {
      this.character = data;
      this.movies = this.movieService.movies.filter( data => data.characters.includes(this.character.url));
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
    this.moviesSub$.unsubscribe();
  }
}
