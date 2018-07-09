
import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../models/noticia.model';
import { NoticiaService } from '../../services/noticia.service';
import { Router } from '@angular/router';
import { ConfirmDelDialogComponent } from '../fragments/confirm-del-dialog/confirm-del-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'app-noticia',
	templateUrl: './noticia.component.pug',
	styleUrls: ['./noticia.component.styl']
})
export class NoticiaComponent implements OnInit {
	noticias: Noticia[] = [];
	constructor(private _router: Router, private dialog: MatDialog) { }

	ver(idNoticia) {
		this._router.navigate(['admin/noticias/editar/' + idNoticia])
	}

	agregar() {
		this._router.navigate(['admin/noticias/editar'])
	}

	eliminar(idNoticia) {
		console.log(idNoticia)
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
            width: '290px',
            height: '200px'
        });

        dialogRef.afterClosed().subscribe(result => {
            result?
            NoticiaService.eleiminarNoticia(idNoticia)
            .then(response => this.noticias.splice(this.noticias.indexOf(response.data), 1))
            :
            null;
        })
	}

	ngOnInit() {
		NoticiaService.obtenerNoticias()
		.then(response => this.noticias = response.data.map(n => new Noticia(n.id, n.titulo, n.descripcion, n.status)))
		.then(n => console.log(n))
	}

}
