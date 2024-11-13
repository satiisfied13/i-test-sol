import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CharacterComponent } from './character.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { GET_CHARACTER, isLoading, loadingSelector } from '../../reducers/getData';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ u: 'character_url' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should get character URL', () => {
    component.ngOnInit();
    expect(component.url).toEqual('character_url');
  });

  it('should dispatch GET_CHARACTER', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(GET_CHARACTER({ url: 'character_url' }));
  });
});
