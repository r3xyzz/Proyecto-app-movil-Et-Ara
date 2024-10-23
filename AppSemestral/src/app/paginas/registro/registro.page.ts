import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre:string = '';
  password: string = '';
  usuario: string = '';



  constructor(private acsses:FirebaseLoginService, public router:Router,public alerta:AlertController) { 

  }

  traducirMensajeError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este correo ya está en uso.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico es incorrecto.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
    }
  }
  

  async MensajeError(mensajeError: string) {
    const alert = await this.alerta.create({
      header: 'ERROR',
      subHeader: 'Registro fallido',
      message: mensajeError,
      buttons: ['Aceptar']
    });
    await alert.present();
    }

  async MensajeCorrecto() {
      const alert = await this.alerta.create({
        header: '¡ÉXITO!',
        subHeader: 'Registro Exitoso',
        message: 'Puedes Iniciar Sesión :-D',
        buttons: [{
          text: 'Dirigeme Allí',
          handler: () => {
            this.router.navigate(['/login']);  // Redirige a la página de login
          }}]
      });
      await alert.present();
      }

  ngOnInit() { }


  async crearUsuario(){
    try{
      await this.acsses.create_user(this.password,this.nombre);
      console.log("Usuario creado exitosamente");
      this.MensajeCorrecto();
    }catch(error){
      console.log("ERROR EN REGISTRO!!!!!!!!!!!!!!!")
      this.MensajeError(this.traducirMensajeError(error));
    }
    
  }

}
