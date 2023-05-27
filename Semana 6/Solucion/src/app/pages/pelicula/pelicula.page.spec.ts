import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeliculaPage } from './pelicula.page';

describe('PeliculaPage', () => {
  let component: PeliculaPage;
  let fixture: ComponentFixture<PeliculaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PeliculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
