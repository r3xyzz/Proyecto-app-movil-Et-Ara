import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialHabitosPage } from './historial-habitos.page';

describe('HistorialHabitosPage', () => {
  let component: HistorialHabitosPage;
  let fixture: ComponentFixture<HistorialHabitosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialHabitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
