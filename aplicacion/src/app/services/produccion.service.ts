
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class ProduccionService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerProduccion(idProduccion) {
        return axios.default.get(this.apiUrl + '/data/produccion/' + idProduccion);
    }

    public static obtenerProducciones() {
        return axios.default.get(this.apiUrl + '/data/produccion/');
    }

    public static crearProduccion(produccion) {
        return axios.default.post(this.apiUrl + '/data/produccion/', produccion);
    }

    public static actualizarProduccion(produccion) {
        return axios.default.put(this.apiUrl + '/data/produccion/' + produccion.id, produccion);
    }

    public static eleiminarProduccion(idProduccion) {
        return axios.default.delete(this.apiUrl + '/data/produccion/' + idProduccion);
    }

    public static obtenerImagenes(idProduccion) {
        return axios.default.get(this.apiUrl + '/data/produccion/imagenes/' + idProduccion)
    }

    public static agregarImagenes(idProduccion, imagen) {
        return axios.default.post(this.apiUrl + '/data/produccion/imagenes/' + idProduccion, imagen)
    }

}
    