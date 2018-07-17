import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	Input,
	AfterViewInit
} from '@angular/core';

//declare function videojs(id: any, options: any, ready:any): any;


@Component({
	selector: 'videojs',
	templateUrl: './videojs.component.pug',
})

export class VideoJSComponent implements OnInit, OnDestroy, AfterViewInit {

	// reference to the element itself, we use this to access events and methods
	private _elementRef: ElementRef

	//video play
	@Input() autoplay = false;

	// video asset url
	@Input() url: any;

	// declare player var
	private player: any;

	// constructor initializes our declared vars
	constructor(elementRef: ElementRef) {
		this.url = false;
		this.player = false;
	}

	ngOnInit() {
	 }

	ngOnDestroy() {
		this.player.dispose();
	}

	// use ngAfterViewInit to make sure we initialize the videojs element
	// after the component template itself has been rendered
	async ngAfterViewInit() {
		var options = {
			"techOrder": ["youtube"],
			"sources": [{"type": "video/youtube", "src": this.url.changingThisBreaksApplicationSecurity, "youtube": { "ytControls": false, "customVars": { "wmode": "transparent" } }}]
		};
		this.player = await videojs('vid1', options).ready(function() {
			console.log(this.options()); //log all of the default videojs options
      
			// Store the video object
		   var myPlayer = this, id = myPlayer.id();
		   // Make up an aspect ratio
		   myPlayer.play();
			// this.on('pause', function() {
			//   document.body.style.backgroundColor = 'red';
			// });
			
			// this.on('play', function() {
			//   document.body.style.backgroundColor = '';
			// });		
		  }); 
	}

	play() {
		this.player.play();
	}

	pause() {
		this.player.pause();
	}

	fullscreen() {
		this.player.fulScreen()
	}

}