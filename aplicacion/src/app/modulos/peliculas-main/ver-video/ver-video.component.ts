
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../../models';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
import { PeliculaService } from '../../../services';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
    selector: 'app-ver-video',
    templateUrl: './ver-video.component.pug',
    styleUrls: ['./ver-video.component.styl']
})
export class VerVideoComponent implements OnInit {
    pelicula: Pelicula;
    @Output() selected = new EventEmitter();

    pausa = false;
    repartoOrProduccion = true;
    constructor(private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) { }
    eventClick(item) {
        this.selected.emit(item)
    }

    URL() {
		return this.sanitizer.bypassSecurityTrustResourceUrl(this.pelicula.getVideo());
	}
    ngOnInit() {
        this.route.parent.params.subscribe(async params => {
            console.log(params)
            await PeliculaService.obtenerPelicula(+params['id'])
            .then(response => response && response.data? this.pelicula= new Pelicula(response.data.id, response.data.nombre, response.data.historia, response.data.link, response.data.estreno) : null)
        });        
    }

    irHistoria() {
        this.router.navigate(['/pelicula/' + this.pelicula.getId() + '/historia'])
    }
}
