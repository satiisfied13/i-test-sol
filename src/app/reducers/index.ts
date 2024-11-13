import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { GetDataState, getDataReducer } from './getData';

export interface State {
  getData: GetDataState
}

export const reducers: ActionReducerMap<State> = {
  getData: getDataReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
