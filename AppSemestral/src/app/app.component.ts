import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mostrarMenu: boolean = true;  // Variable para controlar la visibilidad del menú
  
  constructor(public alerta:AlertController, private router:Router, private storage: Storage, private access:FirebaseLoginService) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.comprobarRuta(event.url);
      }
    });
  }

  comprobarRuta(url: string) {
    // Ocultar el menú en las páginas de login y registro
    if (url === '/login' || url === '/registro') {
      this.mostrarMenu = false;
    } else {
      this.mostrarMenu = true;
    }
  }



  async confirmarCerrarSesion() {
    const alert = await this.alerta.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.cerrarSesion();
          }
        }
      ]
    });

    await alert.present();
  }


  async cerrarSesion() {
    // Elimina los datos de sesión almacenados en el Storage
    await this.storage.remove('nombre');
    await this.storage.remove('SessionID');

    // cerrar sesión en Firebase
    await this.access.logout();

    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
