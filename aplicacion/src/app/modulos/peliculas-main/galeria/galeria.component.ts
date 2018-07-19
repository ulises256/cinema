
import { Component, OnInit, Input } from '@angular/core';
import { Produccion, Pelicula } from '../../../models';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { PeliculaService } from '../../../services';

@Component({
    selector: 'app-galeria',
    templateUrl: './galeria.component.pug',
    styleUrls: ['./galeria.component.styl']
})
export class GaleriaComponent implements OnInit {

    pelicula: Pelicula;
    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.parent.params.subscribe(async params => {
            console.log(params)
            await PeliculaService.obtenerPelicula(+params['id'])
            .then(response => response && response.data? this.pelicula= new Pelicula(response.data.id, response.data.nombre, response.data.historia, response.data.videoId, response.data.estreno) : null)

        });
    }
}
