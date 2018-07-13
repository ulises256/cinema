
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../../models';
import { TimelineLite, TweenMax } from 'gsap';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-home-pelicula',
    templateUrl: './home-pelicula.component.pug',
    styleUrls: ['./home-pelicula.component.styl']
})
export class HomePeliculaComponent implements OnInit {
    
    @Input() pelicula: Pelicula;
    @Output() selected = new EventEmitter();
    constructor(private domSanitizer: DomSanitizer) { 
    }

    ngOnInit() {

        let tl = new TimelineLite({delay:0.5})
		TweenMax.set('#lineLeft', {marginTop:50, marginLeft:3});
        TweenMax.set('#lineRight', {marginTop:25, marginLeft:404});
        TweenMax.set('#line1', {marginTop:50, marginLeft:3});
        TweenMax.set('#line2', {marginTop:50, marginLeft:3});

		tl.addLabel("start", "");
		tl.from("#lineLeft", 1, {scaleX:0, transformOrigin:"left"})
        tl.from("#lineRight", 1, {scaleX:0, transformOrigin:"right"}, "start")
        tl.from("#line1", 1, {scaleX:0, transformOrigin:"left"})
        tl.from("#line2", 1, {scaleX:0, transformOrigin:"right"}, "start")
        tl.from("#line", 1, {scaleX:0, transformOrigin:"right"}, "start")

		$(".titulo").on("click", function() {
			tl.restart();
		})
    }

    makeTrustedImage(item) {
		const imageString =  JSON.stringify(item).replace(/\\n/g, '');
		const style = 'url(' + imageString + ')';
		return this.domSanitizer.bypassSecurityTrustStyle(style);
    }
    
    eventClick(item) {
        this.selected.emit(item)
    }
}
