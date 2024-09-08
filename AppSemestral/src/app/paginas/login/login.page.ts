import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre : string =""
  password : string = ""

  constructor(public mensaje:ToastController,public alerta:AlertController,private router:Router) { }

  

  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'ERROR',
      subHeader: 'Nombre de Usuario o Contraseña vacíos',
      message: 'Por favor, ingrese su nombre o contraseña',
      buttons: ['Aceptar']
    });
    await alert.present();
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
      this.MensajeError()
    }
    else{
      console.log("Inicio de Sesión Exitoso")
      this.MensajeCorrecto()
      this.router.navigate(["/home"])
    }
  }

  ngOnInit() { }
}
