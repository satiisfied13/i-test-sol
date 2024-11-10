import { Routes } from '@angular/router';
import { FilmComponent } from './features/film/film.component';
import { HomeComponent } from './features/home/home.component';
import { CharacterComponent } from './features/character/character.component';

export const routes: Routes = [
    {path: '', redirectTo:'/films', pathMatch:'full'},
    {path: 'films', component: HomeComponent},
    {path: 'films/:id', component: FilmComponent},
    {path: 'character/:id', component: CharacterComponent}
];
