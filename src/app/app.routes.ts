import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'institucion',
    loadComponent: () => import('./pages/institucion/institucion.component').then(m => m.InstitucionComponent)
  },
  {
    path: 'avisos',
    loadComponent: () => import('./pages/avisos/avisos.component').then(m => m.AvisosComponent)
  },
  {
    path: 'avisos/:id',
    loadComponent: () => import('./pages/avisos/aviso-detail/aviso-detail.component').then(m => m.AvisoDetailComponent)
  },
  {
    path: 'eventos',
    loadComponent: () => import('./pages/eventos/eventos.component').then(m => m.EventosComponent)
  },
  {
    path: 'eventos/:id',
    loadComponent: () => import('./pages/eventos/evento-detail/evento-detail.component').then(m => m.EventoDetailComponent)
  },
  {
    path: 'documentos',
    loadComponent: () => import('./pages/documentos/documentos.component').then(m => m.DocumentosComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
