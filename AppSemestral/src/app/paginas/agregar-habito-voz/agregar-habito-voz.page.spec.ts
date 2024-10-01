import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarHabitoVozPage } from './agregar-habito-voz.page';

describe('AgregarHabitoVozPage', () => {
  let component: AgregarHabitoVozPage;
  let fixture: ComponentFixture<AgregarHabitoVozPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarHabitoVozPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
