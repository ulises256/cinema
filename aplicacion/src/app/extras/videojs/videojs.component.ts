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

	ngOnInit() { }

	ngOnDestroy() {
		this.player.dispose();
	}

	// use ngAfterViewInit to make sure we initialize the videojs element
	// after the component template itself has been rendered
	ngAfterViewInit() {


		// // setup the player via the unique element ID
		// this.player = videojs(document.getElementById('pelicula'), {}, function () {

		// 	// Store the video object 
		// 	var myPlayer = this, id = myPlayer.id();

		// 	// Make up an aspect ratio
		// 	var aspectRatio = 264 / 640;

		// 	// internal method to handle a window resize event to adjust the video player
		// 	function resizeVideoJS() {
		// 		var width = document.getElementById(id).parentElement.offsetWidth;
		// 		myPlayer.width(width);
		// 		myPlayer.height(width * aspectRatio);
		// 	}

		// 	// Initialize resizeVideoJS()
		// 	resizeVideoJS();

		// 	// Then on resize call resizeVideoJS()
		// 	window.onresize = resizeVideoJS;
		// });

		// this.autoplay ? this.player.play() : null;
		// this.player.volume(0.2)

		videojs('pelicula').ready(function() {
			// You can use the video.js events even though we use the vimeo controls
			// As you can see here, we change the background to red when the video is paused and set it back when unpaused
			this.on('pause', function() {
			  document.body.style.backgroundColor = 'red';
			});
			
			this.on('play', function() {
			  document.body.style.backgroundColor = '';
			});
			
			// You can also change the video when you want
			// Here we cue a second video once the first is done
			// this.one('ended', function() {
			//   this.src('http://vimeo.com/79380715');
			//   this.play();
			// });
		  });		
	}

}