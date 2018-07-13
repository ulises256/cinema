
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Noticia } from '../../../../models/noticia.model';
import { NoticiaService } from '../../../../services/noticia.service';

@Component({
	selector: 'app-editar-noticia',
	templateUrl: './editar-noticia.component.pug',
	styleUrls: ['./editar-noticia.component.styl']
})
export class EditarNoticiaComponent implements OnInit {
	noticia: Noticia;
	form: FormGroup
	publico = false;
	public editor;
	public editorContent = ``;
	public editorOptions = {
		placeholder: "insert content..."
	};

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {}

	onEditorBlured(quill) {
		// console.log('editor blur!', quill);
	}

	onEditorFocused(quill) {
		// console.log('editor focus!', quill);
	}

	onEditorCreated(quill) {
		this.editor = quill;
		// console.log('quill is ready! this is current quill instance object', quill);
	}

	onContentChanged({ quill, html, text }) {
		// console.log('quill content is changed!', quill, html, text);
		this.noticia.setDescripcion(html)
	}

	guardarNoticia() {
		if(this.form.controls.titlo.valid){
			this.noticia.setTitulo(this.form.controls.titlo.value)
			this.noticia.getId()?
			NoticiaService.actualizarNoticia(this.noticia)
			:
			NoticiaService.crearNoticia(this.noticia)
			.then(response => this.noticia = new Noticia(response.data.id, response.data.titulo, response.data.descripcion, response.data.status));
		}
	}

	publicarNoticia(event) {
		console.log(event)
		event.checked ? this.noticia.setStatus('publico')
		: this.noticia.setStatus('sinpublicar')
	}

	ngOnInit() {

		this.route.params.subscribe(async params => {
			console.log(params)
			params.id ?
				await NoticiaService.obtenerNoticia(params.id)
					.then(response => response && response.data ? this.noticia = new Noticia(response.data.id, response.data.titulo, response.data.descripcion, response.data.status) : null)
					.then(response => {
						if(response)
							response.getStatus() == 'publico'? this.publico = true : this.publico = false;
						this.editorContent = ``+response.getDescripcion()+``
					})
				: this.noticia = new Noticia(null, null, null, 'sinpublicar');
			this.form = await this.formBuilder.group({
				titlo: [this.noticia.getTitulo(), Validators.required],
				descripcion: [this.noticia.getDescripcion(), Validators.required],
			})
		});

	}

}
