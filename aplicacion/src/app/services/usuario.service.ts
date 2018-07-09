import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import * as axios from 'axios'

@Injectable()

export class UsuarioService {
    private static apiUrl: string = APILOCAL.url;

    public static obtenerUsuario(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/usuario/' + idUsuario);
    }

    public static actualizarUsuario(usuario) {
        return axios.default.put(this.apiUrl + '/data/usuario/' + usuario.getId(), usuario);
    }

    public static materiales(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/materialXusuario/' + idUsuario);
    }

    public static eventos(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/eventosXusuario/' + idUsuario);
    }

    public static obtenerFoto(idUsuario) {
        return axios.default.get(this.apiUrl + '/data/usuario/avatar/' + idUsuario);
    }
}
