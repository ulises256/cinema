import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	Input,
	AfterViewInit,
	ViewEncapsulation,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { Reparto } from '../../models';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';


@Component({
	selector: 'videojs',
	templateUrl: './videojs.component.pug',
	styleUrls: ['./videojs.component.styl'],
	encapsulation: ViewEncapsulation.None
})

export class VideoJSComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges{

	// reference to the element itself, we use this to access events and methods
	private _elementRef: ElementRef
	private player: any;
	@Input() mostrarReparto = false;

	@Input() mostrarProduccion = false;
	//video play
	@Input() autoplay = false;
	// video asset url
	@Input() url: any;

	@Input() reparto: Reparto[];

	@Input() parar: boolean = false


	// constructor initializes our declared vars
	constructor(elementRef: ElementRef, private domSanitizer: DomSanitizer) {
		this.url = false;
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.player.dispose();
	}

	// use ngAfterViewInit to make sure we initialize the videojs element
	// after the component template itself has been rendered
	ngAfterViewInit() {
		this.contruirPlayer();
		this.autoplay ? this.player.play() : null;
	}
	ngOnChanges(changes: SimpleChanges) {
		if(this.player != undefined && changes['parar'] && this.reparto){
			changes['parar'].currentValue ==true ? this.player.pause() : this.player.play();
		}
	}
	contruirPlayer() {
		var options = {
			"techOrder": ["youtube"],
			"sources": [{ "type": "video/youtube", "src": this.url.changingThisBreaksApplicationSecurity, "youtube": { "ytControls": false, "customVars": { "wmode": "transparent" } } }]
		};
		this.player = videojs('vid1', options, function () {
			var myPlayer = this, id = myPlayer.id();
		});
		var contenido = document.getElementById('reparto')
		this.player.overlay({
			overlays: [{
				start: 'pause',
				content: contenido,
				end: 'playing',
				attachToControlBar: true
			}]
		});
	}

	fullscreen() {
		this.player.fulScreen()
	}

	makeTrustedImage(item) {
		const imageString = JSON.stringify(item).replace(/\\n/g, '');
		const style = 'url(' + imageString + ')';
		return this.domSanitizer.bypassSecurityTrustStyle(style);
	}

}