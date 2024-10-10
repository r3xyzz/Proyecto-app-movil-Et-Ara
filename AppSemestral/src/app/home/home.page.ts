import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregaHabitosPage } from '../paginas/agrega-habitos/agrega-habitos.page';
import { AgregarHabitoVozPage } from '../paginas/agregar-habito-voz/agregar-habito-voz.page';

import {ApiService} from 'src/app/servicios/api.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public modalControlador:ModalController, private apiservice : ApiService) {}

  listaHaceres: {nombreItem: string,
                fechaItem: string,
                prioridadItem: string,
                categoriaItem: string}[] = [];


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


  async agregaHabitoVoz(){
    const modal = await this.modalControlador.create({
      component: AgregarHabitoVozPage
    })

    modal.onDidDismiss().then(nuevoObjHabito => {
      console.log(nuevoObjHabito.data);
      //this.listaHaceres.push(nuevoObjHabito.data)
      console.log(this.listaHaceres);
    })
    return await modal.present()
  }



  eliminar(index:number){
    this.listaHaceres.splice(index,1)
  }











// consumo api
  ngOnInit() {
    this.init();
  }

  init(){
    this.apiservice.solicitud().subscribe((data:any)=>{
      console.log('Datos recibidos ', data);

    })
  }
}


