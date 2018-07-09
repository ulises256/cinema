
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class PortadaService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerPortada(idPortada) {
        return axios.default.get(this.apiUrl + '/data/portada/' + idPortada);
    }

    public static obtenerPortadas() {
        return axios.default.get(this.apiUrl + '/data/portada/');
    }

    public static crearPortada(portada) {
        return axios.default.post(this.apiUrl + '/data/portada/', portada);
    }

    public static actualizarPortada(portada) {
        return axios.default.put(this.apiUrl + '/data/portada/' + portada.id, portada);
    }

    public static eleiminarPortada(idPortada) {
        return axios.default.delete(this.apiUrl + '/data/portada/' + idPortada);
    }
}
    