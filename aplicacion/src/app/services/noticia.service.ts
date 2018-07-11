
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class NoticiaService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerNoticia(idNoticia) {
        return axios.default.get(this.apiUrl + '/data/noticia/' + idNoticia);
    }

    public static obtenerNoticias() {
        return axios.default.get(this.apiUrl + '/data/noticia/');
    }

    public static crearNoticia(noticia) {
        return axios.default.post(this.apiUrl + '/data/noticia/', noticia);
    }

    public static actualizarNoticia(noticia) {
        return axios.default.put(this.apiUrl + '/data/noticia/' + noticia.id, noticia);
    }

    public static eleiminarNoticia(idNoticia) {
        return axios.default.delete(this.apiUrl + '/data/noticia/' + idNoticia);
    }

    public static noticiasPublicas() {
        return axios.default.get(this.apiUrl + '/data/noticia/front')
    }

    public static ultimaNoticia() {
        let date = {fechaActual :new Date()}
        return axios.default.post(this.apiUrl + '/data/noticia/front', date)
    }
}
    