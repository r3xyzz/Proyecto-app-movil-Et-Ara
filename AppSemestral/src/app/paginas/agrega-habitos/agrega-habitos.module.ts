import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregaHabitosPageRoutingModule } from './agrega-habitos-routing.module';

import { AgregaHabitosPage } from './agrega-habitos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregaHabitosPageRoutingModule
  ],
  declarations: [AgregaHabitosPage]
})
export class AgregaHabitosPageModule {}
