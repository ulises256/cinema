import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DropifyComponent } from './dropify/dropify.component';
import { FiltroNombreProyecto } from './pipes/filtroNombreProyecto.pipe';
import {FileUploadComponent} from './file-upload/file-upload.component'
import { VideoJSComponent } from './admin/videojs/videojs.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        AutocompleteComponent,
        DropifyComponent,
        FiltroNombreProyecto,
        FileUploadComponent,
        VideoJSComponent
    ],
    exports: [
        AutocompleteComponent,
        DropifyComponent,
        FiltroNombreProyecto,
        FileUploadComponent,
        VideoJSComponent
    ]
  })

  export class ExtrasModule {}
