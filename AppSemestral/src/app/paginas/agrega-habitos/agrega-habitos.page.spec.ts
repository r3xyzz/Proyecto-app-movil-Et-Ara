import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregaHabitosPage } from './agrega-habitos.page';

describe('AgregaHabitosPage', () => {
  let component: AgregaHabitosPage;
  let fixture: ComponentFixture<AgregaHabitosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaHabitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
