
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pelicula } from '../../../../models/pelicula.model';

@Component({
	selector: 'app-anadir-pelicula',
	templateUrl: './anadir-pelicula.component.pug',
	styleUrls: ['./anadir-pelicula.component.styl']
})
export class AnadirPeliculaComponent implements OnInit {
	public form: FormGroup;
	fileVideo;
	showSpinner;
	constructor(
		public dialogRef: MatDialogRef<AnadirPeliculaComponent>,
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: Pelicula
	) { }

	cancelar() {
		this.dialogRef.close()
	}

	submit(form: FormGroup) {
		console.log(form)
		if (form.controls.nombre.valid &&
			form.controls.video.valid
		) {
			var formData = new FormData();
			this.showSpinner = true;
			formData.append('file_video', this.fileVideo, this.fileVideo.name);
			formData.append('nombre', form.controls.nombre.value);
			formData.append('historia', form.controls.historia.value);
			console.log(formData)
			var options = { content: formData };
			this.dialogRef.close(options)
		}
	}

	changeListener($event): void {
		const listaArchivos = $event.target.files;
		if (listaArchivos.length > 0) {
			let file: File = listaArchivos[0];
			this.fileVideo = file;
		}
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			nombre: [this.data.getNombre(), Validators.required],
			historia: [this.data.getHistoria()],
			video: [this.data.getVideo(), Validators.required],
		});
	}

}
