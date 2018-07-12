
import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AnadirPeliculaComponent } from '../fragments/anadir-pelicula/anadir-pelicula.component';
import { ConfirmDelDialogComponent } from '../fragments/confirm-del-dialog/confirm-del-dialog.component';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.pug',
  styleUrls: ['./pelicula.component.styl']
})
export class PeliculaComponent implements OnInit {
	peliculas: Pelicula [] = []
	private dimensionesMoviles = {altura: '600px', anchura:  '1250px'}
	constructor(private dialog: MatDialog, private _router: Router) { }

	agregarPelicula() {
		let pelicula: Pelicula = new Pelicula(null, null,null,  null, null);
        
        const dialogRef = this.dialog.open(AnadirPeliculaComponent, {
            width: this.dimensionesMoviles.anchura,
            height: this.dimensionesMoviles.altura,
            data: pelicula
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            result ?  (PeliculaService.crearPelicula(result.content)
                        .then(responde => this._router.navigate(['admin/peliculas/' + responde.data.id]))): null
        });
	}

	verPelicula(idPelicula) {
		this._router.navigate(['admin/peliculas/' +idPelicula])
	}

	eliminarPelicula(idPelicula) {
		console.log(idPelicula)
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
            width: '290px',
            height: '200px'
        });

        dialogRef.afterClosed().subscribe(result => {
            result?
            PeliculaService.eleiminarPelicula(idPelicula)
            .then(response => this.peliculas.splice(this.peliculas.indexOf(response.data), 1))
            :
            null;
        })
	}

	ngOnInit() {
		PeliculaService.obtenerPeliculas()
		.then(res => this.peliculas = res ? res.data.map(n => new Pelicula(n.id, n.nombre, n.historia, n.videoLink, n.estreno)) : null)
	}

}
