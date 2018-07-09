import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


/* Importamos los componentes que se usarán en las rutas
 */
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { PerfilPeliculaComponent } from './pelicula/perfil-pelicula/perfil-pelicula.component';
import { EditarNoticiaComponent } from './noticia/editar-noticia/editar-noticia.component';

const admin_routers: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'peliculas',
        component: PeliculaComponent
      },
      {
        path: 'peliculas/:id',
        component: PerfilPeliculaComponent
      },
      {
        path: 'noticias',
        component: NoticiaComponent
      },
      {
        path: 'noticias/editar',
        component: EditarNoticiaComponent
      },
      {
        path: 'noticias/editar/:id',
        component: EditarNoticiaComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(admin_routers),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, AuthService]
})
export class AdminRoutingModule { }
