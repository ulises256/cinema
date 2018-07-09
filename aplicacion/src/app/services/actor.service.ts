
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class ActorService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerActor(idActor) {
        return axios.default.get(this.apiUrl + '/data/actor/' + idActor);
    }

    public static obtenerActores() {
        return axios.default.get(this.apiUrl + '/data/actor/');
    }

    public static crearActor(actor) {
        return axios.default.post(this.apiUrl + '/data/actor/', actor);
    }

    public static actualizarActor(actor) {
        return axios.default.put(this.apiUrl + '/data/actor/' + actor.id, actor);
    }

    public static eleiminarActor(idActor) {
        return axios.default.delete(this.apiUrl + '/data/actor/' + idActor);
    }
}
    