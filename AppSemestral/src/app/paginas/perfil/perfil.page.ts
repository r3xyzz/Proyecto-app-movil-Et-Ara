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
  currentDate: string;
  nombre: string = "";
  uid: string = "";

  constructor(private storage: Storage, private firebaseService: FirebaseLoginService, private afAuth: AngularFireAuth) {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
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
      // Aquí podrías mostrar un mensaje de error similar a MensajeError en login.page.ts
    } else {
      await this.storage.set('nombre', this.nombre);
      if (this.uid) {
        await this.firebaseService.updateUserName(this.uid, this.nombre);
        console.log("Nombre guardado exitosamente en Firebase");
      }
      // Aquí podrías mostrar un mensaje de éxito similar a MensajeCorrecto en login.page.ts
    }
  }
}