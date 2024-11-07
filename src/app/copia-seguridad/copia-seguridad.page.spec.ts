import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CopiaSeguridadPage } from './copia-seguridad.page';

describe('CopiaSeguridadPage', () => {
  let component: CopiaSeguridadPage;
  let fixture: ComponentFixture<CopiaSeguridadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CopiaSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
