import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TimelineLite, TweenMax } from "gsap";
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { PeliculaService, NoticiaService } from '../../services';
import { Pelicula, Noticia } from '../../models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.pug',
	styleUrls: ['./home.component.styl'],
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

	peliculas: Pelicula[];
	noticias: Noticia;
	
	paginacion = {
		pagina: 0,
		items: 3,
		totalPaginas: undefined
	}

	img = "assets/images/backgound1.png"
	constructor(private router: Router, private domSanitizer: DomSanitizer) { }

	async ngOnInit() {

		await this.paginar();

		await NoticiaService.ultimaNoticia()
		.then(response => response && response.data ? this.noticias = new Noticia(response.data.id, response.data.titulo, response.data.descripcion, response.data.status, response.data.createdAt): null)

		let tl = new TimelineLite({delay:0.5})
		TweenMax.set('#lineLeft', {marginTop:50, marginLeft:3});
		TweenMax.set('#lineRight', {marginTop:-40, marginLeft:404});

		tl.addLabel("start", "");
		tl.from("#lineLeft", 1, {scaleX:0, transformOrigin:"left"})
		tl.from("#lineRight", 1, {scaleX:0, transformOrigin:"right"}, "start")

		$(".titulo").on("click", function() {
			tl.restart();
		})
		await console.log(this.peliculas)
		await console.log(this.noticias)
	}

	verProyecto(idPelicula) {
		this.router.navigate(['pelicula/' + idPelicula])
	}

	anterior() {
		console.log(this.paginacion)
		this.paginacion.pagina==0? null : (this.paginacion.pagina--, this.paginar()) ;
	}

	siguiente() {
		this.paginacion.pagina == (this.paginacion.totalPaginas - 1) ? null : (this.paginacion.pagina++, this.paginar());
	}

	paginar() {
		PeliculaService.paginacion(this.paginacion.items, this.paginacion.pagina)
		.then(response => {
			if(response && response.data && response.data.items){
				this.paginacion.totalPaginas = response.data.totalPaginas;
				return response.data.items.map(n => new Pelicula(n.id, n.nombre, n.historia, n.video, ''))
			}
		})
		.then(pelis => pelis ? this.peliculas = pelis : null)
	}

	makeTrustedImage(item) {
		const imageString =  JSON.stringify(item).replace(/\\n/g, '');
		const style = 'url(' + imageString + ')';
		return this.domSanitizer.bypassSecurityTrustStyle(style);
	  }
}
