import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialHabitosPage } from './historial-habitos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialHabitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialHabitosPageRoutingModule {}
