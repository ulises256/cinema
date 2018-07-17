
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaService } from '../../../../services/pelicula.service';
import { FormBuilder } from '@angular/forms';
import { Pelicula, Imagen } from '../../../../models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-perfil-pelicula',
	templateUrl: './perfil-pelicula.component.pug',
	styleUrls: ['./perfil-pelicula.component.styl']
})
export class PerfilPeliculaComponent implements OnInit, AfterViewInit, OnDestroy {
	public pelicula: Pelicula;
	public portadas: Imagen[]
	public portada: Imagen;
	public editable = {disiabled: true, icon: 'edit', tooltip: 'Editar Campos'};
	constructor( private domSanitizer: DomSanitizer, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {}

	editar() {
		this.editable.disiabled = !this.editable.disiabled
		this.editable.disiabled?
			(this.editable.disiabled = true, this.editable.icon = 'edit', this.editable.tooltip = 'Editar Campos' ,this.pelicula.actualizar()) 
			: 
			(this.editable.disiabled = false, this.editable.icon = 'save', this.editable.tooltip = 'Guardar cambios');
	}

	ngAfterViewInit() {
		 this.route.params.subscribe(params => {
			PeliculaService.obtenerPelicula(+params['id'])
				.then(response => this.pelicula = new Pelicula(response.data.id, response.data.nombre, response.data.historia, response.data.link, response.data.estreno))
		});
	}

	URL() {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(this.pelicula.getVideo());
	}

	agregarPortada() {
		this.pelicula.setPortadas(this.portada);
	}

	quitarPortada(imagen: Imagen) {
		this.pelicula.deletePortada(imagen);
	}

	ngOnDestroy() {

	}

	ngOnInit() {
		this.portada = new Imagen(null, null);
	}

}

