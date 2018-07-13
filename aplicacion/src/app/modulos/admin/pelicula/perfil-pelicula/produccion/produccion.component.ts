
import { Component, OnInit, Input } from '@angular/core';
import { Produccion, Imagen } from '../../../../../models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.pug',
  styleUrls: ['./produccion.component.styl']
})
export class ProduccionComponent implements OnInit {

  @Input() produccion: Produccion;

  newimagen: Imagen;

  constructor(private domSanitizer: DomSanitizer) { }

  guardarImagen(imagen?) {
    imagen ? this.produccion.setImagenes(imagen) : this.produccion.setImagenes(this.newimagen)
  }

  ngOnInit() {

    this.newimagen = new Imagen(null, null);
  }

}
