
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class PeliculaService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerPelicula(idPelicula) {
        return axios.default.get(this.apiUrl + '/data/pelicula/' + idPelicula);
    }

    public static obtenerPeliculas() {
        return axios.default.get(this.apiUrl + '/data/pelicula/');
    }

    public static crearPelicula(pelicula) {
        return axios.default.post(this.apiUrl + '/data/pelicula', pelicula);
    }

    public static actualizarPelicula(pelicula) {
        return axios.default.put(this.apiUrl + '/data/pelicula/' + pelicula.id, pelicula);
    }

    public static eleiminarPelicula(idPelicula) {
        return axios.default.delete(this.apiUrl + '/data/pelicula/' + idPelicula);
    }

    public static agregarPortada(idPelicula, portada) {
        return axios.default.post(this.apiUrl + '/data/pelicula/portada/' + idPelicula, portada)
    }
    
    public static obtenerPortadas(idPelicula) {
        return axios.default.get(this.apiUrl + '/data/pelicula/portada/' + idPelicula);
    }

    public static obtenerReparto(idPelicula) {
        return axios.default.get(this.apiUrl + '/data/pelicula/reparto/' + idPelicula);
    }

    public static obtenerProduccion(idPelicula) {
        return axios.default.get(this.apiUrl + '/data/pelicula/produccion/' + idPelicula);
    }

    public static paginacion(items, pagina) {
        return axios.default.get(this.apiUrl + '/data/pelicula/paginacion/' + items +'/'+ pagina);
    }
}
    