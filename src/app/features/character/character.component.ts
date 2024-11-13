import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../models/characters.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.interface';
import { Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { characterSelector, clearData, GET_CHARACTER, isLoading, loadingSelector, moviesSelector } from '../../reducers/getData';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit, OnDestroy{
  character: Character;
  url: string;
  isLoading: boolean;
  movies: Movie[] = [];
  routeSub$: Subscription;
  characterSub$: Subscription;
  loadingSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ){}

  ngOnInit(): void {
    this.routeSub$ = this.route.queryParams.subscribe(
      data => {
        this.url = data['u'];
      }
    );

    this.loadingSub$ = this.store.select(loadingSelector).subscribe( data => {
      this.isLoading = data;
    })

    this.characterSub$ = this.store.select(moviesSelector).pipe(
      switchMap(movies => {
        this.movies = movies;
        this.store.dispatch(GET_CHARACTER({url: this.url}));
        return this.store.select(characterSelector)
      })
    ).subscribe(char => {
      this.character = char;
      this.movies = this.movies.filter(movie => movie.characters.includes(this.character.url));
      if (this.movies.length > 0) {
        this.store.dispatch(isLoading({ value: false }));
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
    this.loadingSub$.unsubscribe();
    this.characterSub$.unsubscribe();
    this.store.dispatch(clearData());
  }
}
