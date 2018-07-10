var fs = require("fs");

var componentes = [
    {   nombre : 'Noticias',    minuscula : 'noticias'},
    {   nombre : 'Nosotros',    minuscula : 'nosotros'},
    {   nombre : 'PeliculasMain',    minuscula : 'peliculas-main'},
    {   nombre : 'HomePelicula',    minuscula : 'home-pelicula'},
    {   nombre : 'VerVideo',    minuscula : 'ver-video'},
    {   nombre : 'Historia',    minuscula : 'historia'},
    {   nombre : 'Galeria',    minuscula : 'galeria'},
    {   nombre : 'Reparto',    minuscula : 'reparto'},
]

fs.mkdirSync('componentes')

componentes.forEach(componente => {
fs.mkdirSync('componentes/'+ componente.minuscula)
fs.createWriteStream("componentes/" + componente.minuscula + "/" + componente.minuscula + '.component.ts')
.write(`
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-`+componente.minuscula+`',
    templateUrl: './`+componente.minuscula+`.component.pug',
    styleUrls: ['./`+componente.minuscula+`.component.styl']
})
export class `+componente.nombre+`Component implements OnInit {
    
    constructor() { }

    ngOnInit() {
    }
}
`)

fs.createWriteStream("componentes/" + componente.minuscula + "/" + componente.minuscula + '.component.pug')
.write(`
.`+componente.minuscula+`
    .`+componente.minuscula+`-content
        mat-card.titulo
            h1 `+componente.nombre+` Component Works
`)

fs.createWriteStream("componentes/" + componente.minuscula + "/" + componente.minuscula + '.component.styl')
.write(`
.`+componente.minuscula+`
    display flex
    flex-direction columns 
    width 100%
    height 100%
    .`+componente.minuscula+`-content
        width 100%
        height 100%
        margin 5px 5px 5px 5px
        .titulo
            margin 10px 50px 10px 50px
`)

})

