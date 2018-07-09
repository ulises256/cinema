var fs = require("fs");

var modelos = [
    {   servicio : 'imagen', nombre : 'Imagen', singularM:'Imagen', singularn : 'imagen', pluralM : 'Imagenes' },
    {   servicio : 'actor', nombre : 'Actor', singularM:'Actor', singularn : 'actor', pluralM : 'Actores' },
    {   servicio : 'noticia', nombre : 'Noticia', singularM:'Noticia', singularn : 'noticia', pluralM : 'Noticias' },
    {   servicio : 'pelicula', nombre : 'Pelicula', singularM:'Pelicula', singularn : 'pelicula', pluralM : 'Peliculas' },
    {   servicio : 'portada', nombre : 'Portada', singularM:'Portada', singularn : 'portada', pluralM : 'Portadas' },
    {   servicio : 'produccion', nombre : 'Produccion', singularM:'Produccion', singularn : 'produccion', pluralM : 'Producciones' },
    {   servicio : 'reparto', nombre : 'Reparto', singularM:'Reparto', singularn : 'reparto', pluralM : 'Repartos' },
    {   servicio : 'reparto', nombre : 'Reparto', singularM:'Reparto', singularn : 'reparto', pluralM : 'Repartos' },
]

fs.mkdirSync('servicios')

modelos.forEach(modelo => {
    fs.createWriteStream("servicios/" + modelo.servicio  +".service"+ ".ts")
    .write
    (`
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class `+modelo.nombre+`Service {
    private static apiUrl: string = APILOCAL.url;

    public static obtener`+modelo.singularM+`(id`+modelo.singularM+`) {
        return axios.default.get(this.apiUrl + '/data/`+modelo.singularn+`/' + id`+modelo.singularM+`);
    }

    public static obtener`+modelo.pluralM+`() {
        return axios.default.get(this.apiUrl + '/data/`+modelo.singularn+`/');
    }

    public static crear`+modelo.singularM+`(`+modelo.singularn+`) {
        return axios.default.post(this.apiUrl + '/data/`+modelo.singularn+`/', `+modelo.singularn+`);
    }

    public static actualizar`+modelo.singularM+`(`+modelo.singularn+`) {
        return axios.default.put(this.apiUrl + '/data/`+modelo.singularn+`/' + `+modelo.singularn+`.id, `+modelo.singularn+`);
    }

    public static eleiminar`+modelo.singularM+`(id`+modelo.singularM+`) {
        return axios.default.delete(this.apiUrl + '/data/`+modelo.singularn+`/' + id`+modelo.singularM+`);
    }
}
    `)
})