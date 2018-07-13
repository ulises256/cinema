
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Actor, Imagen } from '../../../../models'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-anadir-actor',
	templateUrl: './anadir-actor.component.pug',
	styleUrls: ['./anadir-actor.component.styl']
})
export class AnadirActorComponent implements OnInit {
	public form: FormGroup;
	public imagen;
	public base64textString: string;
	constructor(
		public dialogRef: MatDialogRef<AnadirActorComponent>,
		private formBuilder: FormBuilder,
		public domSanitizer: DomSanitizer,
		@Inject(MAT_DIALOG_DATA) public data: Actor
	) { }

	cancelar() {
		this.dialogRef.close()
	}

	submit(form: FormGroup) {
		if (form.controls.nombre.valid &&
			form.controls.apellidos.valid &&
			form.controls.biblio.valid &&
			form.controls.imagen.valid
		) {
			this.data.setNombre(form.controls.nombre.value)
			this.data.setApellidos(form.controls.apellidos.value)
			this.data.setBiblio(form.controls.biblio.value)
			this.dialogRef.close(this.data)
		}
	}

	handleFileSelect(evt) {
		var files = evt.target.files;
		var file = files[0];

		if (files && file) {
			var reader = new FileReader();

			reader.onload = this._handleReaderLoaded.bind(this);

			reader.readAsBinaryString(file);
		}
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = "data:image/jpeg;base64," + btoa(binaryString);
		this.data.getFoto() ? (
			this.data.getFoto().setImagen(this.base64textString),
			this.data.setFoto(this.data.getFoto()))
			:
			this.data.setFoto(new Imagen(null, this.base64textString));
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			nombre: [this.data.getNombre(), Validators.required],
			apellidos: [this.data.getApellidos()],
			biblio: [this.data.getBiblio(), Validators.required],
			imagen: [this.data.getFoto(), Validators.required],
		});
	}

}
