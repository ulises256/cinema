
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../models';

@Component({
    selector: 'app-ver-video',
    templateUrl: './ver-video.component.pug',
    styleUrls: ['./ver-video.component.styl']
})
export class VerVideoComponent implements OnInit {
    @Input() pelicula: Pelicula;
    @Output() selected = new EventEmitter();
    constructor() { }
    eventClick(item) {
        this.selected.emit(item)
    }
    ngOnInit() {
    }
}
