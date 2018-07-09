import { Actor } from "./actor.model";
import { RepartoService } from "../services/reparto.service";
import { ActorService } from "../services/actor.service";

export class Reparto {
    private id: number;
    private id_pelicula: number;
    private nombre: string;
    private actores: Actor [];

	constructor($id: number, $nombre: string, $id_pelicula) {
		this.id = $id;
        this.nombre = $nombre;
        this.id_pelicula = $id_pelicula;
        RepartoService.obtenerActores(this.id)
        .then(response => response ? this.actores = response.data.map(n => new Actor(n.id, n.nombre, n.apellidos, n.biblio, n.id_reparto, n.id_imagen)): [])
    }
    
    public getActores() {
        return this.actores;
    }

    public setActores(actor: Actor) {
        actor.getId() ?
            ActorService.actualizarActor(actor)
            :
            RepartoService.agregarActor(this.id, actor)
            .then(response => this.actores.push(new Actor(response.data.id, response.data.nombre, response.data.apellidos, response.data.biblio, response.data.id_reparto, response.data.id_imagen)))
    }

    public deleteActor(actor: Actor) {
        ActorService.eleiminarActor(actor.getId())
        .then(response => this.actores.splice(this.actores.indexOf(actor), 1));
    }

	public getId(): number {
		return this.id;
	}

	public getId_pelicula(): number {
		return this.id_pelicula;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public setId(value: number) {
		this.id = value;
	}

	public setId_pelicula(value: number) {
		this.id_pelicula = value;
	}

	public setNombre(value: string) {
		this.nombre = value;
    }
}