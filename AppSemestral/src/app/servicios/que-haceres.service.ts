import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueHaceresService {

  private historialSubject = new BehaviorSubject<any[]>([]);
  historial$ = this.historialSubject.asObservable();  // Observable para historial


  constructor(private storage: Storage) {
    this.init()
   }

   async init(){
    await this.storage.create();
    await this.obtenerHistorialHabitos();
  }

  agregarHabito(key:string, value:any){
    this.storage.set(key, value)
  }

  async eliminarHabito(key:string){
    this.storage.remove(key);
    await this.obtenerHistorialHabitos();
  }

  obtenerHabitos(){
    let habitos: any = []
    this.storage.forEach((key, value, index) => {
      if (value.startsWith('habito_')){
        habitos.push({'key':value, 'value':key})
      }
    });
    return habitos
  }




  // Mover hábito a historial
  async moverAHistorial(key: string, value: any, estado: string) {
    // Agregar al historial (con el estado completado/cancelado)

    value.estado = estado;  // Agregar el estado al valor
    value.fechaMovimiento = new Date();  // Almacenar la fecha en la que se movió al historial

    let historialKey = `historial_${key}`;
    await this.storage.set(historialKey, value);
    
    console.log("STORAGE historialKey:",this.storage.get(historialKey))
    console.log("STORAGE value:",this.storage.get(value))

    // Eliminar el hábito activo
    await this.eliminarHabito(key);
    await this.obtenerHistorialHabitos();
  }


  // Obtener hábitos del historial
  async obtenerHistorialHabitos() {
    let historialHabitos: any[] = [];
    await this.storage.forEach((key, value) => {
      if (value.startsWith('historial_')) {
        historialHabitos.push({ 'key': value, 'value': key });
      }
    });
    this.historialSubject.next(historialHabitos);  // Emitir el historial actualizado
  }

  
}
