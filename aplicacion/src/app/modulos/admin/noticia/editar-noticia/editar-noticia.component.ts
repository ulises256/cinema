
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Noticia } from '../../../../models/noticia.model';
import { NoticiaService } from '../../../../services/noticia.service';

@Component({
	selector: 'app-editar-noticia',
	templateUrl: './editar-noticia.component.pug',
	styleUrls: ['./editar-noticia.component.styl'],
	encapsulation: ViewEncapsulation.None
})
export class EditarNoticiaComponent implements OnInit {
	noticia: Noticia;
	form: FormGroup
	publico = false;


	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }


	guardarNoticia() {
		if (this.form.controls.titlo.valid && this.form.controls.descripcion.valid) {
			this.noticia.setTitulo(this.form.controls.titlo.value)
			this.noticia.setDescripcion(this.form.controls.descripcion.value)
			console.log(this.noticia)
			this.noticia.getId() ?
				NoticiaService.actualizarNoticia(this.noticia)
				:
				NoticiaService.crearNoticia(this.noticia)
					.then(response => this.noticia = new Noticia(response.data.id, response.data.titulo, response.data.descripcion, response.data.status));
		}
	}

	publicarNoticia(event) {
		event.checked ? this.noticia.setStatus('publico')
			: this.noticia.setStatus('sinpublicar')
	}

	ngOnInit() {

		this.route.params.subscribe(async params => {
			params.id ?
				await NoticiaService.obtenerNoticia(params.id)
					.then(response => response && response.data ? this.noticia = new Noticia(response.data.id, response.data.titulo, response.data.descripcion, response.data.status) : null)
					.then(response => {
						if (response)
							response.getStatus() == 'publico' ? this.publico = true : this.publico = false;
					})
				: this.noticia = new Noticia(null, null, null, 'sinpublicar');
			this.form = await this.formBuilder.group({
				titlo: [this.noticia.getTitulo(), Validators.required],
				descripcion: [this.noticia.getDescripcion(), Validators.required],
			})
		});

	}

}
