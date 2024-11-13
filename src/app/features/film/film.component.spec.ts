import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FilmComponent } from './film.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('FilmComponent', () => {
  let component: FilmComponent;
  let fixture: ComponentFixture<FilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmComponent);
    component = fixture.componentInstance;
  });

  it('should get filmId', () => {
    component.ngOnInit();
    expect(component.filmId).toEqual(1);
  });
});
