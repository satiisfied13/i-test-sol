import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.interface';
import { filter, map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  movies: Movie[] = [];
  moviesSub$: Subscription;

  constructor(
    private movieService: MovieService
  ){}

  ngOnInit(): void {
    this.moviesSub$ = this.movieService.moviesSubject$.subscribe( data => {
      this.movies = data;
    })
  }

  ngOnDestroy(): void {
    this.moviesSub$.unsubscribe();
  }
}
