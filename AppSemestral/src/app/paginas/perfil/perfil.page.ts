import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  currentDate: string;

  constructor() {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
  }
}
