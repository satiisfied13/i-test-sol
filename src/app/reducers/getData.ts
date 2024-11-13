import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Movie } from "../models/movie.interface";
import { Character } from "../models/characters.interface";

//actions
export const GET_MOVIES = createAction('[GET DATA] start getting movies');
export const GET_CHARACTERS = createAction('[GET DATA] start getting characters', props<{film: Movie}>());
export const GET_CHARACTER = createAction('[GET DATA] start getting character', props<{url: string}>());

export const getMovies = createAction('[GET DATA] movies got', props<{movies: Movie[]}>());
export const getCharacters = createAction('[GET DATA] characters got', props<{characters: Character[]}>());
export const getCharacter = createAction('[GET DATA] character got', props<{character: Character}>());
export const isLoading = createAction('[GET DATA] loading status', props<{value: boolean}>());
export const clearData = createAction('[GET DATA] data was cleared');

//state interfaces
export interface GetDataState {
    movies: Movie[];
    characters: Character[];
    character: Character;
    isLoading: boolean;
}

//initial states
export const initialData: GetDataState = {
    movies: null,
    characters: null,
    character: null,
    isLoading: false
}

//reducers
export const getDataReducer = createReducer(
    initialData,
    on(getMovies, (state, action) => ({
        ...state,
        movies: [...action.movies]
    })),
    on(isLoading, (state, action) => ({
        ...state,
        isLoading: action.value
    })),
    on(getCharacters, (state, action) => ({
        ...state,
        characters: [...action.characters]
    })),
    on(getCharacter, (state, action) => ({
        ...state,
        character: action.character
    })),
    on(clearData, state => ({
        ...state,
        characters: null,
        character: null
    }))
)

//selectors
export const featureSelector = createFeatureSelector<GetDataState>('getData');

export const moviesSelector = createSelector(
    featureSelector,
    state => state.movies
);
export const loadingSelector = createSelector(
    featureSelector,
    state => state.isLoading
)
export const charactersSelector = createSelector(
    featureSelector,
    state => state.characters
)
export const characterSelector = createSelector(
    featureSelector,
    state => state.character
)