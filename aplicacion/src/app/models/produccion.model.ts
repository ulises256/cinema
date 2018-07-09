import { Imagen } from "./imagen.model";
import { ImagenService } from "../services/imagen.service";
import { ProduccionService } from "../services/produccion.service";

export class Produccion {
    private id: number;
    private nombre: string;
    private id_pelicula: number;
    private imagenes: Imagen[];


	constructor($id: number, $nombre: string, $id_pelicula: number) {
		this.id = $id;
		this.nombre = $nombre;
        this.id_pelicula = $id_pelicula;
        ProduccionService.obtenerImagenes(this.id)
        .then(response => response ? this.imagenes = response.data.map(n => new Imagen(n.id, n.imagen)): [])
        
	}

	public getId(): number {
		return this.id;
	}

	public getNombre(): string {
		return this.nombre;
	}


	public getId_pelicula(): number {
		return this.id_pelicula;
	}


	public getImagenes(): Imagen[] {
		return this.imagenes;
	}


	public serId(value: number) {
		this.id = value;
	}


	public serNombre(value: string) {
		this.nombre = value;
	}

	public setId_pelicula(value: number) {
		this.id_pelicula = value;
	}


	public setImagenes(imagen: Imagen) {
        imagen.getId() ?
            ImagenService.eleiminarImagen(imagen.getId())
            .then(response => this.imagenes.splice(this.imagenes.indexOf(imagen), 1))
            :
			ProduccionService.agregarImagenes(this.id, imagen)
            .then(response => this.imagenes.push(new Imagen(response.data.id, response.data.imagen)))
	}

    

}