import { Component, OnInit } from '@angular/core';
import { TweenLite } from "gsap";
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
	
	constructor(private router: Router) { }

	async ngOnInit() {
		// let photo = document.getElementsByClassName("nosotros");
		// TweenLite.to(photo, 2, {width:"200px", height:"550px"});

		await PeliculaService.obtenerPeliculas()
		.then(response => response && response.data ? this.peliculas = response.data.map(n => new Pelicula(n.id, n.nombre, n.historia, n.video)): []);

		await NoticiaService.obtenerNoticias()
		.then(response => response && response.data ?  this.noticias = response.data.map(n => new Noticia(n.id, n.titutlo, n.descripcion, n.status)): []);

		await console.log(this.peliculas)
		await console.log(this.noticias)
	}

	verProyecto(idProyecto) {
		this.router.navigate(['proyectos/' + idProyecto]);
	}
}
