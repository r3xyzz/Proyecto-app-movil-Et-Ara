import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregaHabitosPage } from '../paginas/agrega-habitos/agrega-habitos.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalControlador:ModalController) {}

  listaHaceres: {nombreItem: string,
                fechaItem: string,
                prioridadItem: string,
                categoriaItem: string}[] = [];

  hoy: number = Date.now()



  async agregaHabito(){
    const modal = await this.modalControlador.create({
      component: AgregaHabitosPage
    })

    modal.onDidDismiss().then(nuevoObjHabito => {
      console.log(nuevoObjHabito.data);
      this.listaHaceres.push(nuevoObjHabito.data)
      console.log(this.listaHaceres);
    })
    return await modal.present()
  }



  eliminar(index:number){
    this.listaHaceres.splice(index,1)
  }
}


