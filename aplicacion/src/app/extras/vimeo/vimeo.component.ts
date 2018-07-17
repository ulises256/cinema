import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';

@Component({
	selector: 'vimeo',
	templateUrl: './vimeo.component.pug',
	styleUrls: ['./vimeo.component.styl']
})
export class VimeoComponent implements OnInit {

	@Input() uri: string;
	constructor(private sanitizer: DomSanitizer) {
	}

	URL() {
		return this.sanitizer.bypassSecurityTrustResourceUrl(this.uri);
	}
	
	ngOnInit() {
	}

}
