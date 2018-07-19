
import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../../models';
import { TimelineLite, TweenMax } from 'gsap';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { PeliculaService } from '../../../services';

@Component({
    selector: 'app-home-pelicula',
    templateUrl: './home-pelicula.component.pug',
    styleUrls: ['./home-pelicula.component.styl']
})
export class HomePeliculaComponent implements OnInit {
    
    pelicula: Pelicula;
    constructor(private domSanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) { 
    }

    ngOnInit() {
        this.route.parent.params.subscribe(async params => {
            console.log(params)
            await PeliculaService.obtenerPelicula(+params['id'])
            .then(response => response && response.data? this.pelicula= new Pelicula(response.data.id, response.data.nombre, response.data.historia, response.data.videoId, response.data.estreno, '') : null)

        });
        let tl = new TimelineLite({delay:0.5})
		TweenMax.set('#lineLeft', {marginTop:50, marginLeft:3});
        TweenMax.set('#lineRight', {marginTop:25, marginLeft:404});
        TweenMax.set('#line1', {marginTop:50, marginLeft:3});
        TweenMax.set('#line2', {marginTop:50, marginLeft:3});

		tl.addLabel("start", "");
		tl.from("#lineLeft", 1, {scaleX:0, transformOrigin:"left"})
        tl.from("#lineRight", 1, {scaleX:0, transformOrigin:"right"}, "start")
        tl.from("#line1", 1, {scaleX:0, transformOrigin:"left"})
        tl.from("#line2", 1, {scaleX:0, transformOrigin:"right"}, "start")
        tl.from("#line", 1, {scaleX:0, transformOrigin:"right"}, "start")

		$(".titulo").on("click", function() {
			tl.restart();
		})
    }

    makeTrustedImage(item) {
		const imageString =  JSON.stringify(item).replace(/\\n/g, '');
		const style = 'url(' + imageString + ')';
		return this.domSanitizer.bypassSecurityTrustStyle(style);
    }

    verGaleria() {
        this.router.navigate(['/pelicula/' + this.pelicula.getId() + '/galeria']);
    }

    verPelicula() {
        this.router.navigate(['/pelicula/' + this.pelicula.getId() + '/ver']);
    }

    conocerLeyenda() {
        this.router.navigate(['/pelicula/' + this.pelicula.getId() + '/historia']);
    }

}
