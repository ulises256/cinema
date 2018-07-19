
import { Component, OnInit, Input } from '@angular/core';
import { Reparto, Pelicula } from '../../../models';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { PeliculaService } from '../../../services';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';


@Component({
    selector: 'app-reparto',
    templateUrl: './reparto.component.pug',
    styleUrls: ['./reparto.component.styl']
})
export class RepartoComponent implements OnInit {

    pelicula: Pelicula;

    constructor(private router: Router, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        this.route.parent.params.subscribe(async params => {
            console.log(params)
            await PeliculaService.obtenerPelicula(+params['id'])
            .then(response => response && response.data? this.pelicula= new Pelicula(response.data.id, response.data.nombre, response.data.historia, response.data.link, response.data.estreno) : null)
        });  
    }

    makeTrustedImage(item) {
		const imageString = JSON.stringify(item).replace(/\\n/g, '');
		const style = 'url(' + imageString + ')';
		return this.domSanitizer.bypassSecurityTrustStyle(style);
	}
}
