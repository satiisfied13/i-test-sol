import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/characters.interface';
import { Store } from '@ngrx/store';
import { charactersSelector, clearData, GET_CHARACTERS, isLoading, loadingSelector, moviesSelector } from '../../reducers/getData';

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
  film: Movie = null; 
  characters: Character[] = [null];
  filmSub$: Subscription;
  charactersSub$: Subscription;
  routeSub$: Subscription;
  loadingSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ){}

  ngOnInit(): void {
    this.routeSub$ = this.route.params.subscribe(
      data => {
        this.filmId = data['id'];
      }
    );

    this.loadingSub$ = this.store.select(loadingSelector).subscribe( data => {
      this.isLoading = data;
    })

    this.filmSub$ = this.store.select(moviesSelector).subscribe( data => {
      this.film = data[this.filmId];
      this.store.dispatch(GET_CHARACTERS({film: data[this.filmId]}));
    });

    this.charactersSub$ = this.store.select(charactersSelector).subscribe( data => {
      this.characters = data;
      if(this.characters.length > 0) {
        this.store.dispatch(isLoading({value: false}));
      }
    })

  }

  ngOnDestroy(): void {
    this.charactersSub$.unsubscribe();
    this.loadingSub$.unsubscribe();
    this.routeSub$.unsubscribe();
    this.filmSub$.unsubscribe();
    this.store.dispatch(clearData());
  }
}
