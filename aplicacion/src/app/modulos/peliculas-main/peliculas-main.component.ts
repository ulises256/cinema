import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TimelineLite, TweenMax } from "gsap";
import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../services';
import { Pelicula } from '../../models';

@Component({
	selector: 'app-peliculas-main',
	templateUrl: './peliculas-main.component.pug',
	styleUrls: ['./peliculas-main.component.styl'],
	providers: [MediaMatcher]
})
export class PeliculasMainComponent implements OnInit {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	public navs = [{nombre: 'Inicio', mostrar: true}];
	pelicula: Pelicula;
	usuario: Usuario;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private us: AuthService, private route: ActivatedRoute, private router: Router) {
		this.mobileQuery = media.matchMedia('(max-width: 900px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
		this.navs.push({nombre: 'Ver Pelicula', mostrar: false});
		this.navs.push({nombre: 'Historia', mostrar: false});
		this.navs.push({nombre: 'Reparto', mostrar: false});
		this.navs.push({nombre: 'Producción', mostrar: false});
		this.pelicula = new Pelicula(null, 'LA LEYENDA de la condesa de Malibrán', 'Historia chingona', null, null, '')
		 this.route.params.subscribe(async params => {
			await PeliculaService.obtenerPelicula(+params['id'])
			.then(res => res && res.data ? 
									this.pelicula = new Pelicula(res.data.id, res.data.nombre, res.data.historia, res.data.iframe, res.data.estreno)
									: 
									// this.router.navigate([''])
									null
				);
		})
	}

	mostrar(index){
        this.navs.forEach((n, iex)=> iex == index? n.mostrar = true : n.mostrar = false)
	}
	
	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	salir() {
		this.us.salir();
	}

	ngOnInit() {
		this.us.obtenerUsuario().subscribe(user => this.usuario = user);

		let tl = new TimelineLite({delay:0.5})
		TweenMax.set('#linetop', {rotation: 90});
	}

}
