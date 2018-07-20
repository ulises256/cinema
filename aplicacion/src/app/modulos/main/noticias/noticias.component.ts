
import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../../models';
import { NoticiaService } from '../../../services';

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.component.pug',
    styleUrls: ['./noticias.component.styl']
})
export class NoticiasComponent implements OnInit {
    noticias: Noticia[] = [];

    constructor() { }

    ngOnInit() {
        NoticiaService.obtenerNoticias()
        .then((respues => respues && respues.data?  this.noticias = respues.data.map(n => new Noticia(n.id, n.titulo, n.descripcion, n.status, n.fecha)): this.noticias = []))
        .then(respuesta => console.log(respuesta))
    }
}
