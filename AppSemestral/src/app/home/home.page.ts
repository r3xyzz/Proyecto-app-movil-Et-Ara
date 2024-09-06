import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  listaHaceres = [{
    nomItem: 'Codear',
    fecVencItem: '01-10-24',
    prioridadItem: 'alto',
    categoriaItem: 'Trabajo'
  },
  {
    nomItem: 'Diseño',
    fecVencItem: '10-28-24',
    prioridadItem: 'bajo',
    categoriaItem: 'Trabajo'
  },
  {
    nomItem: 'Compras',
    fecVencItem: '10-30-24',
    prioridadItem: 'medio',
    categoriaItem: 'Personal'
  },
  {
    nomItem: 'Ejercicios',
    fecVencItem: '10-25-24',
    prioridadItem: 'alto',
    categoriaItem: 'Personal'
  }
  ]

  hoy: number = Date.now()
}


