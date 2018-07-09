
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class RepartoService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerReparto(idReparto) {
        return axios.default.get(this.apiUrl + '/data/reparto/' + idReparto);
    }

    public static obtenerRepartos() {
        return axios.default.get(this.apiUrl + '/data/reparto/');
    }

    public static crearReparto(reparto) {
        return axios.default.post(this.apiUrl + '/data/reparto/', reparto);
    }

    public static actualizarReparto(reparto) {
        return axios.default.put(this.apiUrl + '/data/reparto/' + reparto.id, reparto);
    }

    public static eleiminarReparto(idReparto) {
        return axios.default.delete(this.apiUrl + '/data/reparto/' + idReparto);
    }

    public static obtenerActores(idReparto) {
        return axios.default.get(this.apiUrl + '/data/reparto/actores/' + idReparto);
    }

    public static agregarActor(idReparto, actor) {
        return axios.default.post(this.apiUrl + '/data/reparto/actores/' + idReparto, actor);
    }
}
    