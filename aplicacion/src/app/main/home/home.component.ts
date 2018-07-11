import { Component, OnInit } from '@angular/core';
import { TimelineLite, TweenMax } from "gsap";
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { PeliculaService, NoticiaService } from '../../services';
import { Pelicula, Noticia } from '../../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.pug',
	styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

	peliculas: Pelicula[];
	noticias: Noticia[];

	img = "assets/images/backgound1.png"
	
	constructor(private router: Router) { }

	async ngOnInit() {

		await PeliculaService.obtenerPeliculas()
		.then(response => response && response.data ? this.peliculas = response.data.map(n => new Pelicula(n.id, n.nombre, n.historia, n.video)): []);

		await NoticiaService.obtenerNoticias()
		.then(response => response && response.data ?  this.noticias = response.data.map(n => new Noticia(n.id, n.titutlo, n.descripcion, n.status)): []);

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

	verProyecto(idProyecto) {
	}
}
