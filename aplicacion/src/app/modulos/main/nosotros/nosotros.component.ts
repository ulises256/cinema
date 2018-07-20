
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nosotros',
    templateUrl: './nosotros.component.pug',
    styleUrls: ['./nosotros.component.styl']
})
export class NosotrosComponent implements OnInit {
    img1 = "/assets/images/imagen1"
    img2 = "/assets/images/imagen2"
    constructor() { }

    ngOnInit() {
    }
}
