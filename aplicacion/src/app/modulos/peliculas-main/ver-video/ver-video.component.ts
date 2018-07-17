
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../../models';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';

@Component({
    selector: 'app-ver-video',
    templateUrl: './ver-video.component.pug',
    styleUrls: ['./ver-video.component.styl']
})
export class VerVideoComponent implements OnInit {
    @Input() pelicula: Pelicula;
    @Output() selected = new EventEmitter();

    pausa = false;
    repartoOrProduccion = true;
    constructor(private sanitizer: DomSanitizer) { }
    eventClick(item) {
        this.selected.emit(item)
    }

    URL() {
		return this.sanitizer.bypassSecurityTrustResourceUrl(this.pelicula.getVideo());
	}
    ngOnInit() {
    }
}
