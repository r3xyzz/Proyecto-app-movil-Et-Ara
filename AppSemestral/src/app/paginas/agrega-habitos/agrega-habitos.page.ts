import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QueHaceresService } from 'src/app/servicios/que-haceres.service';

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

  constructor(public modalControlador:ModalController, public QueHaceresServicio:QueHaceresService) { }
  
  ngOnInit() {
  }

  async quitar(){
    await this.modalControlador.dismiss(this.objetoHabito)
  }

  categoriaSeleccionada(index:number){
    this.categoriaHabito = this.categorias[index]
  }

  async agregaHabito(){
    this.objetoHabito = ({nombreItem:this.nombreHabito, 
                          fechaItem:this.fechaHabito, 
                          prioridadItem:this.prioridadHabito,
                          categoriaItem:this.categoriaHabito})

    console.log(this.objetoHabito);
    //let uid = this.nombreHabito + this.fechaHabito
    let uid = `habito_${this.nombreHabito}_${this.fechaHabito}`;

    if(uid){
      await this.QueHaceresServicio.agregarHabito(uid,this.objetoHabito)
    }else{
      console.log("No se puede guardar un Hábito vacío")
    }

    this.quitar()

  }
}
