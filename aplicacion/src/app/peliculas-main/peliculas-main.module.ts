import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { ExtrasModule } from '../extras.module';
import { SlickModule } from 'ngx-slick';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { PeliculasMainRoutes } from './peliculas-main.routing';

import { PeliculasMainComponent } from './peliculas-main.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { HistoriaComponent } from './historia/historia.component';
import { HomePeliculaComponent } from './home-pelicula/home-pelicula.component';
import { RepartoComponent } from './reparto/reparto.component';
import { VerVideoComponent } from './ver-video/ver-video.component';


@NgModule({
  imports: [
    PeliculasMainRoutes,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    PeliculasMainRoutes,
    MaterialModule,
    ExtrasModule,
    SlickModule,
    LoadingModule
  ],
  declarations: [
    PeliculasMainComponent,
    GaleriaComponent,
    HistoriaComponent,
    HomePeliculaComponent,
    RepartoComponent,
    VerVideoComponent
  ]
})
export class PeliculasMainModule { }
