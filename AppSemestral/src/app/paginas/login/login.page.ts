import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre : string =""
  password : string = ""

  constructor(private router:Router) { }

  ngOnInit() { }

  ingresar() {
    if (this.nombre==="" || this.password===""){

    }
    else{
      this.router.navigate(["/home"])
    }
  }

  redirigir(){
    this.router.navigate(["/registro"]);
  }


}
