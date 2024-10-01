import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarHabitoVozPage } from './agregar-habito-voz.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarHabitoVozPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarHabitoVozPageRoutingModule {}
