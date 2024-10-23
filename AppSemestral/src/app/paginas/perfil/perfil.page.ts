import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  currentDate: string;
  nombre: string = "";

  constructor(private storage: Storage) {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
  }

  async ngOnInit() {
    await this.storage.create();
    this.nombre = await this.storage.get('nombre') || 'Tu Nombre';
  }

  async guardarNombre() {
    if (this.nombre === "") {
      console.log("ERROR NOMBRE VACIO");
      // muestrar un mensaje de error similar a MensajeError en login.page.ts
    } else {
      await this.storage.set('nombre', this.nombre);
      console.log("Nombre guardado exitosamente");
      // muestrar un mensaje de éxito similar a MensajeCorrecto en login.page.ts
    }
  }
}