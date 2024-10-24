import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  email: string = "";
  password: string = "";
  nombre: string = "";

  constructor(
    public mensaje: ToastController,
    public alerta: AlertController,
    private router: Router,
    private storage: Storage,
    private access: FirebaseLoginService
  ) {}

  async MensajeError(mensajeError: string) {
    const alert = await this.alerta.create({
      header: 'ERROR',
      subHeader: 'Registro fallido',
      message: mensajeError,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  traducirMensajeError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico es incorrecto.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
    }
  }

  async MensajeCorrecto() {
    const toast = await this.mensaje.create({
      message: `¡Registro exitoso, ${this.nombre}!`,
      duration: 2000
    });
    toast.present();
  }

  crearUsuario() {
    if (this.email === "" || this.password === "" || this.nombre === "") {
      console.log("ERROR EMAIL, NOMBRE Y CONTRASEÑA: VACIOS");
      this.MensajeError("Email, Nombre y Contraseña NO DEBEN ESTAR VACIOS.");
    } else {
      this.access.create_user(this.email, this.password, this.nombre).then(async () => {
        console.log("Registro Exitoso");
        await this.storage.set("nombre", this.nombre);
        await this.storage.set("SessionID", true);
        this.MensajeCorrecto();
        this.router.navigate(["/home"]);
      }).catch((error) => {
        console.log("Error REGISTRO!!!");
        this.MensajeError(this.traducirMensajeError(error));
      });
    }
  }

  async ngOnInit() {
    await this.storage.create();
  }
}