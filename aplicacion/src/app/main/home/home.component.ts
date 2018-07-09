import { Component, OnInit } from '@angular/core';
import {TweenLite} from "gsap";
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  
  anecdotas = [
    {
    contenido: 'Este es un contenido',
    usuario: {nombre: 'malaga', foto: 'https://www.dondeir.com/wp-content/uploads/2018/04/expo-vive-gatito-2018-en-cdmx-1024x767.jpg'},
    Proyecto: {id:2, nombre: 'Cada niño una sonrisa'}},
    {
      contenido: 'Este es un contenidoooooooooooooooooooooo',
      usuario: {nombre: 'malaga', foto: 'https://www.dondeir.com/wp-content/uploads/2018/04/expo-vive-gatito-2018-en-cdmx-1024x767.jpg'},
      Proyecto: {id:2, nombre: 'Cada niño una sonrisa'}
    },
  ]
  constructor(private router: Router) { }

  ngOnInit() {
    // let photo = document.getElementsByClassName("nosotros");
    // TweenLite.to(photo, 2, {width:"200px", height:"550px"});
  }

  verProyecto(idProyecto) {
		this.router.navigate(['proyectos/' + idProyecto]);
	}
}
