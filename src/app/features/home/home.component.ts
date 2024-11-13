import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { isLoading, loadingSelector, moviesSelector } from '../../reducers/getData';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  movies: Movie[] = [];
  isLoading: boolean;
  moviesSub$: Subscription;
  loadingSub$: Subscription;

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.loadingSub$ = this.store.select(loadingSelector).subscribe( data => {
      this.isLoading = data;
    })
    this.moviesSub$ = this.store.select(moviesSelector).subscribe( data => {
      this.movies = data;
      if(this.movies.length > 0) {
        this.store.dispatch(isLoading({value: false}));
      }
    });
  }

  ngOnDestroy(): void {
    this.moviesSub$.unsubscribe();
    this.loadingSub$.unsubscribe();
  }
}
