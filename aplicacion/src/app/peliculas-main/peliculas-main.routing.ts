import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services';
import { PeliculasMainComponent } from './peliculas-main.component';
import { HomePeliculaComponent } from './home-pelicula/home-pelicula.component';
import { VerVideoComponent } from './ver-video/ver-video.component';
import { HistoriaComponent } from './historia/historia.component';
import { RepartoComponent } from './reparto/reparto.component';
import { GaleriaComponent } from './galeria/galeria.component';

const routes: Routes = [
  { 
    path: ':id',
    component: PeliculasMainComponent,
    canActivate: [AuthGuard]
    // children: [
    //   {
    //     path:'',
    //     component: HomePeliculaComponent
    //   },
    //   {
    //     path:'ver',
    //     component: VerVideoComponent
    //   },
    //   {
    //     path:'historia',
    //     component: HistoriaComponent
    //   },
    //   {
    //     path:'galeria',
    //     component: GaleriaComponent
    //   },
    //   {
    //     path:'reparto',
    //     component: RepartoComponent
    //   },
    // ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, AuthService]
})
export class PeliculasMainRoutes { }
