import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'agrega-habitos',
    loadChildren: () => import('./paginas/agrega-habitos/agrega-habitos.module').then( m => m.AgregaHabitosPageModule)
  },
  {
    path: 'historial-habitos',
    loadChildren: () => import('./paginas/historial-habitos/historial-habitos.module').then( m => m.HistorialHabitosPageModule)
  },
  {
    path: 'agregar-habito-voz',
    loadChildren: () => import('./paginas/agregar-habito-voz/agregar-habito-voz.module').then( m => m.AgregarHabitoVozPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
