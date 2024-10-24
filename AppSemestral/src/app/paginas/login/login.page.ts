import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
      subHeader: 'Inicio de Sesión fallido',
      message: mensajeError,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  traducirMensajeError(error: any): string {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'El formato del correo electrónico es incorrecto.';
      case 'auth/user-not-found':
        return 'No existe un usuario con ese correo.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/invalid-credential':
        return 'Correo o contraseña son incorrectas.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
    }
  }

  async MensajeCorrecto() {
    const toast = await this.mensaje.create({
      message: `¡Un gusto verte, ${this.nombre}!`,
      duration: 2000
    });
    toast.present();
  }

  ingresar() {
    if (this.email === "" || this.password === "" || this.nombre === "") {
      console.log("ERROR EMAIL, NOMBRE Y CONTRASEÑA: VACIOS");
      this.MensajeError("Email, Nombre y Contraseña NO DEBEN ESTAR VACIOS.");
    } else {
      this.access.login(this.email, this.password).then(async (userCredential) => {
        console.log("Inicio de Sesión Exitoso");
        const uid = userCredential.user?.uid;
        if (uid) {
          const userData = await this.access.getUserData(uid); // Recuperar datos del usuario desde la base de datos
          this.nombre = userData.nombre; // Actualizar el nombre con el nombre almacenado en la base de datos
          await this.storage.set("nombre", this.nombre);
          await this.storage.set("SessionID", true);
          this.MensajeCorrecto();
          this.router.navigate(["/home"]);
        } else {
          this.MensajeError("No se pudo obtener el UID del usuario.");
        }
      }).catch((error) => {
        console.log("Error LOGIN!!!");
        this.MensajeError(this.traducirMensajeError(error));
      });
    }
  }

  async ngOnInit() {
    await this.storage.create();
  }
}