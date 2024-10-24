import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  currentDate: string; // Fecha y hora actual
  fechaUltimaActividad: string; // Solo la fecha de la última actividad
  nombre: string = "";
  uid: string = "";
  zonaHoraria: string = "GMT-3"; // Valor por defecto

  constructor(private storage: Storage, private firebaseService: FirebaseLoginService, private afAuth: AngularFireAuth) {
    const today = new Date();

    // Formato de fecha y hora (día, mes, año, hora)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true // Formato AM/PM
    };

    this.currentDate = today.toLocaleString('es-ES', options); // Ajuste para mostrar fecha y hora
    this.fechaUltimaActividad = this.formatDate(today); // Inicialmente solo la fecha de la última actividad
  }

  async ngOnInit() {
    await this.storage.create();
    this.nombre = await this.storage.get('nombre') || 'Tu Nombre';
    const user = await this.afAuth.currentUser;
    if (user) {
      this.uid = user.uid;
    }
  }

  async guardarNombre() {
    if (this.nombre === "") {
      console.log("ERROR NOMBRE VACIO");
    } else {
      await this.storage.set('nombre', this.nombre);
      if (this.uid) {
        await this.firebaseService.updateUserName(this.uid, this.nombre);
        console.log("Nombre guardado exitosamente en Firebase");
      }
      // Actualizar solo la fecha de la última actividad al guardar el nombre
      this.fechaUltimaActividad = this.formatDate(new Date()); // Actualizar solo la fecha de la última actividad
    }
  }

  cambiarZonaHoraria() {
    const today = new Date();
    this.currentDate = this.formatDateWithTime(today); // Actualizar fecha y hora al cambiar la zona horaria
    this.fechaUltimaActividad = this.formatDate(today); // Actualizar solo la fecha de la última actividad
  }

  private formatDateWithTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true // Formato AM/PM
    };
    return date.toLocaleString('es-ES', options);
  }

  private formatDate(date: Date): string {
    // Formatear solo la fecha sin hora
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  }
}
