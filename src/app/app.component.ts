import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MovieService } from './services/movie.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './core/navbar/navbar.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GET_CHARACTERS, GET_MOVIES, isLoading, moviesSelector } from './reducers/getData';
import { Movie } from './models/movie.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Star Wars App';
  
  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GET_MOVIES());
  }
}
