
import { Component, OnInit, Input } from '@angular/core';
import { Reparto } from '../../../../models/reparto.model';
import { MatDialog } from '@angular/material';
import { AnadirActorComponent } from '../../../fragments/anadir-actor/anadir-actor.component';
import { Actor } from '../../../../models/actor.model';
import { ConfirmDelDialogComponent } from '../../../fragments/confirm-del-dialog/confirm-del-dialog.component';

@Component({
	selector: 'app-reparto',
	templateUrl: './reparto.component.pug',
	styleUrls: ['./reparto.component.styl']
})
export class RepartoComponent implements OnInit {

	@Input() reparto: Reparto;
	private dimensionesMoviles = {altura: '600px', anchura:  '1250px'}
	constructor(private dialog: MatDialog,) { }

	agregarActor(actor?) {
		 actor? null : actor = new Actor(null, null, null, null, null, null);
        
        const dialogRef = this.dialog.open(AnadirActorComponent, {
            width: this.dimensionesMoviles.anchura,
            height: this.dimensionesMoviles.altura,
            data: actor
        });

        dialogRef.afterClosed().subscribe((result: Actor) => {
			result ? this.reparto.setActores(result) : null;
        });
	}

	eliminarActor(actor){
		const dialogRef = this.dialog.open(ConfirmDelDialogComponent, {
            width: '290px',
            height: '200px'
        });

        dialogRef.afterClosed().subscribe((result: Actor) => {
			result ? this.reparto.deleteActor(actor) : null;
        });
	}

	ngOnInit() {
	}

}
