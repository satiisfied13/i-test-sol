import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { isLoading, loadingSelector, moviesSelector } from '../../reducers/getData';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  const initialState = { isLoading: false, movies: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;

    store.overrideSelector(loadingSelector, false);
    store.overrideSelector(moviesSelector, []);
  });

  it('should subscribe to loading and movies on init', () => {
    spyOn(store, 'select').and.callThrough();
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(loadingSelector);
    expect(store.select).toHaveBeenCalledWith(moviesSelector);
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    spyOn(component.moviesSub$, 'unsubscribe');
    spyOn(component.loadingSub$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.moviesSub$.unsubscribe).toHaveBeenCalled();
    expect(component.loadingSub$.unsubscribe).toHaveBeenCalled();
  });
});
