import { Imagen } from "./imagen.model";
import { ImagenService } from "../services/imagen.service";

export class Actor {
    private id: number;
    private nombre: string;
    private apellidos: string;
    private biblio: string;
    private id_reparto: number;
    private id_imagen: number;
    private imagen: Imagen


	constructor($id: number, $nombre: string, $apellidos: string, $biblio: string, $id_reparto: number, $id_imagen: number) {
		this.id = $id;
		this.nombre = $nombre;
		this.apellidos = $apellidos;
		this.biblio = $biblio;
		this.id_reparto = $id_reparto;
        this.id_imagen = $id_imagen;
        ImagenService.obtenerImagen(this.id_imagen)
        .then(response => (response && response.data)? this.imagen = new Imagen(response.data.id, response.data.imagen): this.imagen = new Imagen(null, null))
	}

    public getFoto() {
        return this.imagen;
    }

    public setFoto(imagen: Imagen){
		this.imagen = imagen;
		imagen.getId() ?
			ImagenService.actualizarImagen(imagen)
			: null
    }

	public getId(): number {
		return this.id;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public getApellidos(): string {
		return this.apellidos;
	}

	public getBiblio(): string {
		return this.biblio;
	}

	public getId_reparto(): number {
		return this.id_reparto;
	}

	public getId_imagen(): number {
		return this.id_imagen;
	}

	public setId(value: number) {
		this.id = value;
	}

	public setNombre(value: string) {
		this.nombre = value;
	}

	public setApellidos(value: string) {
		this.apellidos = value;
	}

	public setBiblio(value: string) {
		this.biblio = value;
	}

	public setId_reparto(value: number) {
		this.id_reparto = value;
	}

	public setId_imagen(value: number) {
		this.id_imagen = value;
	}

}