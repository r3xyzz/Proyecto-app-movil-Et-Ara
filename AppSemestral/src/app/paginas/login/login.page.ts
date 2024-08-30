import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private router:Router) { 
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  ingresar() {
    
    // Aquí puedes agregar la lógica para manejar el login
    console.log('Ingresando con', this.formularioLogin.value);
   this.router.navigate(["/registro"])
  }

  redirigir(){
    this.router.navigate(["/registro"]);
  }


}
