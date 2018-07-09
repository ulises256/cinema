import { UsuarioService } from "../services/usuario.service";

export class Usuario {
    private id: number;
    private nombre: string;
    private apellidos: string;
    private correo: string
    private edad: number;
    private tipo: string;
    private sexo: string;
    private foto;

    constructor($id: number, $nombre: string, $apellidos: string, $correo: string, $edad: number, $tipo: string, $sexo?: string, $foto?){
        this.id = $id;
        this.nombre = $nombre;
        this.apellidos = $apellidos;
        this.correo = $correo;
        this.edad = $edad;
        this.tipo = $tipo;
        this.sexo = $sexo;
        $foto ? this.foto = $foto : UsuarioService.obtenerFoto(this.id).then(responde =>{
            responde.data? this.foto = responde.data.fb_avatar : this.foto = 'assets/images/perfil.png';
        }) ;
    }

    public actualizarDatos() {
        UsuarioService.actualizarUsuario(this);
    }

    public getId(): number {
        return this.id;
    }

    public setId(value: number) {
        this.id = value;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(value: string) {
        this.nombre = value;
    }
    public getApellidos(): string {
        return this.apellidos;
    }

    public setApellidos(value: string) {
        this.apellidos = value;
    }
    public getCorreo(): string {
        return this.correo;
    }

    public setCorreo(value: string) {
        this.correo = value;
    }
    public getEdad(): number {
        return this.edad;
    }

    public setEdad(value: number) {
        this.edad = value;
    }
    public getTipo(): string {
        return this.tipo;
    }

    public setTipo(value: string) {
        this.tipo = value;
    }

    public getSexo() {
        return this.sexo;
    }

    public setSexo(value) {
        this.sexo = value;
    }

    public getFoto() {
        return this.foto;
    }

    public setFoto(value) {
        this.foto = value;
    }

}
