import { QueHaceresService } from 'src/app/servicios/que-haceres.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-habitos',
  templateUrl: './historial-habitos.page.html',
  styleUrls: ['./historial-habitos.page.scss'],
})
export class HistorialHabitosPage implements OnInit {
  constructor(public QueHaceresServicio: QueHaceresService) {
    this.obtenerHistorialHabitos();
  }

  historialHaceres: any[] = [];
  today: Date = new Date();  // Fecha actual para comparar con los hábitos

  ngOnInit() {
    this.init()
  }

  init(){
    this.obtenerHistorialHabitos();
  }

  async obtenerHistorialHabitos() {
    this.historialHaceres = await this.QueHaceresServicio.obtenerHistorialHabitos();
  }

  eliminar(key:string){
    this.QueHaceresServicio.eliminarHabito(key);
    this.obtenerHistorialHabitos()
  }

}
