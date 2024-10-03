import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-habitos',
  templateUrl: './historial-habitos.page.html',
  styleUrls: ['./historial-habitos.page.scss'],
})
export class HistorialHabitosPage implements OnInit {
  constructor() {}

  listaHaceres: {nombreItem: string,
                fechaItem: string,
                prioridadItem: string,
                categoriaItem: string}[] = [];

  hoy: number = Date.now()

  ngOnInit() {
  }

}
