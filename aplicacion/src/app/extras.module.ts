import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltroNombreProyecto } from './pipes/filtroNombreProyecto.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeImagePipe } from './pipes/safe-image.pipe';
import { AutocompleteComponent } from './extras/autocomplete/autocomplete.component';
import { DropifyComponent } from './extras/dropify/dropify.component';
import { FileUploadComponent } from './extras/file-upload/file-upload.component';
import { VideoJSComponent } from './extras/videojs/videojs.component';
import { VimeoComponent } from './extras/vimeo/vimeo.component';
import { SlickModule } from 'ngx-slick';
import { DragScrollModule } from 'ngx-drag-scroll';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SlickModule,
        DragScrollModule,
    ],
    declarations: [
        SafeHtmlPipe,
        SafeImagePipe,
        AutocompleteComponent,
        DropifyComponent,
        FiltroNombreProyecto,
        FileUploadComponent,
        VideoJSComponent,
        VimeoComponent
    ],
    exports: [
        AutocompleteComponent,
        DropifyComponent,
        FiltroNombreProyecto,
        FileUploadComponent,
        VideoJSComponent,
        SafeHtmlPipe,
        VimeoComponent
    ]
  })

  export class ExtrasModule {}
