import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async create_user(email: string, password: string, nombre: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;
    await this.firestore.doc(`users/${uid}`).set({
      email: email,
      nombre: nombre,
      uid: uid
    });
    return userCredential;
  }

  async getUserData(uid: string) {
    const doc = await this.firestore.doc(`users/${uid}`).get().toPromise();
    if (doc && doc.exists) {
      return doc.data() as { nombre: string }; // Aseguramos el tipo de retorno
    } else {
      throw new Error('No such document!');
    }
  }

  async updateUserName(uid: string, nombre: string) {
    await this.firestore.doc(`users/${uid}`).update({ nombre: nombre });
  }
}