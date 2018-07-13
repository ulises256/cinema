import * as _ from 'lodash';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Component, OnInit, Input } from '@angular/core';
/* import { ImagenesService } from '../../../services/imagenes.service'; */

@Component({
  selector: 'imagen',
  templateUrl: './imagen.component.pug',
  styleUrls: ['./imagen.component.styl'],
  providers: [/* ImagenesService */]
})

export class ImagenComponent implements OnInit {

    @Input() id: Number

    imagen: any;


    constructor(

     /*  private _imagenesServie: ImagenesService, */
      private _sanitizer: DomSanitizer

    ){

    }

    getImage(imagen){
      return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${imagen})`);
    }

    ngOnInit() {
/*         this._imagenesServie.getImagen(this.id)
        .then(response =>  this.imagen = response.data ) */
    }

}
