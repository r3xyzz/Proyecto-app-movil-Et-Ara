import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre : string =""
  password : string = ""

  constructor(public mensaje:ToastController,public alerta:AlertController,private router:Router, private storage: Storage, private access:FirebaseLoginService) { }

  

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
    if (this.nombre==="" || this.password===""){
      console.log("ERROR NOMBRE Y CONTRASEÑA: VACIOS")
      this.MensajeError("Nombre y Contraseña NO DEBEN ESTAR VACIOS.")
    }
    else{
      this.access.login(this.nombre,this.password).then(()=>{
        console.log("Inicio de Sesión Exitoso")
        this.access.login(this.nombre,this.password)
        this.storage.set("nombre",this.nombre)
        this.storage.set("SessionID", true)
        this.MensajeCorrecto()
        this.router.navigate(["/home"])

       //DEPENDIENDO DEL ERROR, SE DEBERÁ RECIBIR DE PARAMETRO EN EL MÉTODO "MensajeError()" UNA CADENA DE TEXTO QUE INDIQUE EL ERROR 
      }).catch((error)=>{
        console.log("Error LOGIN!!!")
        this.MensajeError(this.traducirMensajeError(error));
      })
    }
  }

  async ngOnInit() {
    await this.storage.create();
   }
}
