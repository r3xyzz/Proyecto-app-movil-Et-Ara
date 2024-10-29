import { QueHaceresService } from 'src/app/servicios/que-haceres.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-habitos',
  templateUrl: './historial-habitos.page.html',
  styleUrls: ['./historial-habitos.page.scss'],
})
export class HistorialHabitosPage implements OnInit {
  constructor(public QueHaceresServicio: QueHaceresService) {
  }

  historialHaceres: any[] = [];
  today: Date = new Date();  // Fecha actual para comparar con los hábitos

  ngOnInit() {
    this.QueHaceresServicio.historial$.subscribe(historial => {
      this.historialHaceres = historial;  // Actualizar historial cuando cambie
    });
    this.loadHistorialHabitos();
  }

  // Función para cargar el historial de hábitos
  loadHistorialHabitos() {
    this.QueHaceresServicio.obtenerHistorialUsuarioActual().then((observableOrArray: any) => {
      if (Array.isArray(observableOrArray)) {
        // Sin conexión: cargando desde el almacenamiento local
        this.historialHaceres = observableOrArray;
        console.log("Historial de hábitos cargados desde el almacenamiento local:", this.historialHaceres);
      } else {
        // Con conexión: usando el observable de Firebase
        observableOrArray.subscribe((snapshot: any) => {
          this.historialHaceres = snapshot.map((doc: any) => ({
            key: doc.payload.doc.id,
            value: doc.payload.doc.data()
          }));
          console.log("Historial de hábitos cargados desde Firebase:", this.historialHaceres);
        });
      }
    }).catch(error => console.error("Error al cargar historial de hábitos:", error));
  }

  /*
  async obtenerHistorialHabitos() {
    this.historialHaceres = await this.QueHaceresServicio.obtenerHistorialHabitos();

  }
  */

  // Eliminar hábito del historial
  eliminar(key: string) {
    this.QueHaceresServicio.eliminarHabito(key); // Refresca automáticamente gracias a la suscripción
  }

}
