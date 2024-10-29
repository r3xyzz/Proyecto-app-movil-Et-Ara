import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; // Importar tap de RxJS

@Injectable({
  providedIn: 'root'
})
export class QueHaceresService {
  private historialSubject = new BehaviorSubject<any[]>([]);
  historial$ = this.historialSubject.asObservable(); // Observable para historial

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.init();
  }

  async init() {
    await this.storage.create();
    await this.obtenerHistorialLocal(); // Cargar historial local al iniciar
  }

  // Guardar hábito en Firebase y Storage
  async agregarHabito(key: string, habit: any) {
    await this.storage.set(key, habit); // Guardar localmente

    const user = await this.afAuth.currentUser;
    if (user && navigator.onLine) { // Solo guarda en Firebase si hay conexión
      await this.firestore.collection(`users/${user.uid}/habits`).doc(key).set(habit);
      console.log("Hábito guardado en Firebase y localmente");
    } else {
      console.log("Hábito guardado solo localmente (sin conexión)");
    }
  }

  // Obtener hábitos del usuario actual con preferencia por Firebase si hay conexión
  async obtenerHabitosUsuarioActual() {
    const user = await this.afAuth.currentUser;
    if (user && navigator.onLine) {
      return this.firestore.collection(`users/${user.uid}/habits`).snapshotChanges();
    } else {
      console.warn("Sin conexión: obteniendo hábitos del almacenamiento local");
      return this.obtenerHabitosLocal();
    }
  }

  // Obtener hábitos desde el almacenamiento local
  async obtenerHabitosLocal() {
    let habitos: any[] = [];
    await this.storage.forEach((value, key) => {
      if (key.startsWith('habito_')) {
        habitos.push({ key, value });
      }
    });
    return habitos;
  }


  // Actualiza el historial local y emite el nuevo historial
  private async actualizarHistorial() {
    const historial = await this.obtenerHistorialLocal();
    this.historialSubject.next(historial); // Emitir historial actualizado
  }


  // Eliminar hábito de Firebase y Storage
  async eliminarHabito(key: string) {
    await this.storage.remove(key); // Eliminar localmente

    const user = await this.afAuth.currentUser;
    if (user && navigator.onLine) {
      await this.firestore.collection(`users/${user.uid}/habits`).doc(key).delete();
      console.log("Hábito eliminado de Firebase y almacenamiento local");
    } else {
      console.log("Hábito eliminado solo localmente (sin conexión)");
    }

    await this.actualizarHistorial(); // Actualizar historial después de eliminar
  }

  // Mover hábito a historial en Firebase y Storage
  async moverAHistorial(key: string, habit: any, estado: string) {
    habit.estado = estado;
    habit.fechaMovimiento = new Date();

    let historialKey = `historial_${key}`;
    await this.storage.set(historialKey, habit); // Guardar en el historial local

    const user = await this.afAuth.currentUser;
    if (user && navigator.onLine) {
      await this.firestore.collection(`users/${user.uid}/historial`).doc(historialKey).set(habit);
      console.log("Hábito movido al historial en Firebase y almacenamiento local");
    } else {
      console.log("Hábito movido al historial solo localmente (sin conexión)");
    }

    await this.eliminarHabito(key); // Eliminar del listado de hábitos
    await this.actualizarHistorial(); // Actualizar historial local
  }

  // Obtener historial desde Firebase si hay conexión, o desde Storage si no la hay
  async obtenerHistorialUsuarioActual() {
    const user = await this.afAuth.currentUser;
    if (user && navigator.onLine) {
      return this.firestore.collection(`users/${user.uid}/historial`).snapshotChanges().pipe(
        tap(() => this.actualizarHistorial()) // Actualizar historial cuando hay cambios en Firebase
      );
    } else {
      console.warn("Sin conexión: obteniendo historial del almacenamiento local");
      return this.obtenerHistorialLocal();
    }
  }

  // Obtener historial local
  async obtenerHistorialLocal() {
    let historialHabitos: any[] = [];
    await this.storage.forEach((value, key) => {
      if (key.startsWith('historial_')) {
        historialHabitos.push({ key, value });
      }
    });
    this.historialSubject.next(historialHabitos); // Emitir historial actualizado
    return historialHabitos;
  }
}
