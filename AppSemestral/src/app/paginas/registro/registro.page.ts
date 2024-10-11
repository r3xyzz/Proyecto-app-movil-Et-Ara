import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre:string = '';
  password: string = '';
  usuario: string = '';



  constructor(private acsses:FirebaseLoginService, router:Router) { 

  }

  ngOnInit() { }


  async crearUsuario(){
    await this.acsses.create_user(this.password,this.nombre);
  }

}
