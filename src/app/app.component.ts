import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './services/movie.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './core/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'iteam-test-solution';

  isDataLoading = false;

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.isDataLoading = true;
    this.movieService.getMovies().subscribe(data => {
      this.isDataLoading = false;
    });
  }
}
