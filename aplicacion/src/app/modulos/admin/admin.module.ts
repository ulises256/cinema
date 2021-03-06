import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { QuillEditorModule } from 'ngx-quill-editor';
import { MaterialModule } from '../../material.module';
import { AgmCoreModule } from '@agm/core';
import { ExtrasModule } from '../../extras.module';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { AnadirPeliculaComponent } from './fragments/anadir-pelicula/anadir-pelicula.component';
import { PerfilPeliculaComponent } from './pelicula/perfil-pelicula/perfil-pelicula.component';
import { AnadirActorComponent } from './fragments/anadir-actor/anadir-actor.component';
import { RepartoComponent } from './pelicula/perfil-pelicula/reparto/reparto.component';
import { ProduccionComponent } from './pelicula/perfil-pelicula/produccion/produccion.component';
import { EditarNoticiaComponent } from './noticia/editar-noticia/editar-noticia.component';
import { AnadirProyectoDialog } from './fragments/anadir-proyecto-dialog/anadir-proyecto-dialog.component';
import { ConfirmDelDialogComponent } from './fragments/confirm-del-dialog/confirm-del-dialog.component'
import { FroalaEditorModule, FroalaViewModule } from '../../../../node_modules/angular-froala-wysiwyg';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    AgmCoreModule,
    ExtrasModule,
    QuillEditorModule,
    FroalaEditorModule, FroalaViewModule
  ],
  exports: [],
  entryComponents: [
    ConfirmDelDialogComponent,
    AnadirProyectoDialog,
    AnadirPeliculaComponent,
    AnadirActorComponent
  ],
  declarations: [
    AdminComponent,
    HomeComponent,
    NoticiaComponent,
    PeliculaComponent,
    ConfirmDelDialogComponent,
    AnadirProyectoDialog,
    AnadirPeliculaComponent,
    PerfilPeliculaComponent,
    AnadirActorComponent,
    RepartoComponent,
    ProduccionComponent,
    EditarNoticiaComponent
  ]
  
})
export class AdminModule { }
