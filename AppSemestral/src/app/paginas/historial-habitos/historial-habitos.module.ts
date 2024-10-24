import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialHabitosPageRoutingModule } from './historial-habitos-routing.module';

import { HistorialHabitosPage } from './historial-habitos.page';
import { ShareModule } from 'src/app/modulos/share/share.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialHabitosPageRoutingModule,
    ShareModule
  ],
  declarations: [HistorialHabitosPage]
})
export class HistorialHabitosPageModule {}
