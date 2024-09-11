import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregaHabitosPage } from './agrega-habitos.page';

const routes: Routes = [
  {
    path: '',
    component: AgregaHabitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregaHabitosPageRoutingModule {}
