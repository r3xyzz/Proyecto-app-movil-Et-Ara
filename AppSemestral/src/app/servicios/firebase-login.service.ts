import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAuth:AngularFireAuth, private router:Router, private firestore : AngularFirestore) { }
  login(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password);

  }
  logout(){
    this.afAuth.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }

  async create_user (password:string,nombre:string){
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(nombre,password);
    const uid = userCredential.user?.uid;
    await this.firestore.doc(`users/${uid}`).set({
      nombre : nombre,
      password : password,
      uid : uid
    });
    return userCredential;


  }

}
