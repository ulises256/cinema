import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DropifyComponent } from './dropify/dropify.component';
import { FiltroNombreProyecto } from './pipes/filtroNombreProyecto.pipe';
import {FileUploadComponent} from './file-upload/file-upload.component'
import { VideoJSComponent } from './admin/videojs/videojs.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeImagePipe } from './pipes/safe-image.pipe';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        SafeHtmlPipe,
        SafeImagePipe,
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
        VideoJSComponent,
        SafeHtmlPipe
    ]
  })

  export class ExtrasModule {}
