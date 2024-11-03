import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';
import { ShareModule } from 'src/app/modulos/share/share.module';
import { BotonReversaModule } from 'src/app/componentes/boton-reversa/boton-reversa.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    ShareModule,
    BotonReversaModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}