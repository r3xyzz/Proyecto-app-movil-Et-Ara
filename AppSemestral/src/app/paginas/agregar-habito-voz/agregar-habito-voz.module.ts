import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarHabitoVozPageRoutingModule } from './agregar-habito-voz-routing.module';

import { AgregarHabitoVozPage } from './agregar-habito-voz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarHabitoVozPageRoutingModule
  ],
  declarations: [AgregarHabitoVozPage]
})
export class AgregarHabitoVozPageModule {}
