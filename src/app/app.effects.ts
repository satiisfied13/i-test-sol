import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieService } from './services/movie.service';
import { GET_CHARACTER, GET_CHARACTERS, GET_MOVIES, getCharacter, getCharacters, getMovies, isLoading } from './reducers/getData';
import { exhaustMap, forkJoin, map } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {

  imageUrls = [
    'https://m.media-amazon.com/images/I/612h-jwI+EL._AC_UF1000,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/71j4eFd2kpL._AC_UF894,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNWEwOTI0MmUtMGNmNy00ODViLTlkZDQtZTg1YmQ3MDgyNTUzXkEyXkFqcGc@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BODVhNGIxOGItYWNlMi00YTA0LWI3NTctZmQxZGUwZDEyZWI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNTgxMjY2YzUtZmVmNC00YjAwLWJlODMtNDBhNzllNzIzMjgxXkEyXkFqcGc@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_FMjpg_UX1000_.jpg'
];

  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private store: Store
  ) {}

  movies$ = createEffect( () => 
    this.actions$.pipe(
      ofType(GET_MOVIES),
      exhaustMap( data => {
        this.store.dispatch(isLoading({value: true}));
        return this.movieService.getMovies().pipe(
          map( data => {
            let arr = [];
            for(let key of data['result']) {
              arr.push({...key['properties'], image: this.imageUrls[arr.length]})
            }
            return getMovies({movies: arr});
          })
        )
      })
    )
  )

  characters$ = createEffect( () => 
    this.actions$.pipe(
      ofType(GET_CHARACTERS),
      exhaustMap( (data) => {
        this.store.dispatch(isLoading({value: true}));
        const requests = data.film.characters.map(characterUrl => 
          this.movieService.getCharacters(characterUrl).pipe(
            map(data => data['result']['properties'])
          )
        );
        return forkJoin(requests).pipe( 
          map(data => {
            return getCharacters({characters: data})
          })
        );
      })
    )
  )

  character$ = createEffect( () => 
    this.actions$.pipe(
      ofType(GET_CHARACTER),
      exhaustMap( data => {
        this.store.dispatch(isLoading({value: true}));
        return this.movieService.getCharacters(data.url).pipe(
          map( data => {
            return getCharacter({character: data['result']['properties']})
          })
        )
      })
    )
  )

}
