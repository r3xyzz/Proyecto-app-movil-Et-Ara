import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agrega-habitos',
  templateUrl: './agrega-habitos.page.html',
  styleUrls: ['./agrega-habitos.page.scss'],
})
export class AgregaHabitosPage implements OnInit {
  categorias = ['Trabajo','Personal','Casa']

  nombreHabito : string = ""
  fechaHabito : string = new Date().toISOString();
  prioridadHabito : string = ""
  categoriaHabito : string = ""

  objetoHabito : { nombreItem: string, fechaItem: string, prioridadItem: string, categoriaItem: string } = {
    nombreItem: '', 
    fechaItem: '', 
    prioridadItem: '', 
    categoriaItem: ''
  };

  constructor(public modalControlador:ModalController) { }
  
  ngOnInit() {
  }

  async quitar(){
    await this.modalControlador.dismiss(this.objetoHabito)
  }

  categoriaSeleccionada(index:number){
    this.categoriaHabito = this.categorias[index]
  }

  agregaHabito(){
    this.objetoHabito = ({nombreItem:this.nombreHabito, 
                          fechaItem:this.fechaHabito, 
                          prioridadItem:this.prioridadHabito,
                          categoriaItem:this.categoriaHabito})

    this.quitar()

  }
}
