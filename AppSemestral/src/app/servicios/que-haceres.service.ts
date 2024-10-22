import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class QueHaceresService {

  constructor(private storage: Storage) {
    this.init()
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

  async init(){
    await this.storage.create()
  }
}
