import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class QueHaceresService {

  constructor(private storage: Storage) {
    this.init()
   }

   async init(){
    await this.storage.create()
  }

  agregarHabito(key:string, value:any){
    this.storage.set(key, value)
  }

  eliminarHabito(key:string){
    this.storage.remove(key);
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
  }


  // Obtener hábitos del historial
  async obtenerHistorialHabitos() {
    let historialHabitos: any[] = [];
    await this.storage.forEach((key, value) => {
      if (value.startsWith('historial_')) {
        historialHabitos.push({ 'key': value, 'value': key });
      }
    });
    return historialHabitos;
  }

  
}
