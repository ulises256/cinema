import { Reparto } from "./reparto.model";
import { Imagen } from "./imagen.model"
import { Produccion } from "./produccion.model";
import { PeliculaService, ProduccionService, PortadaService } from '../services'

export class Pelicula {
    private id: number;
    private nombre: string;
    private historia: string;
    private videoId: string;
    private reparto: Reparto;
    private pruduccion: Produccion;
    private portadas: Imagen[];
    constructor(id: number, nombre: string, historia: string, video: string, bandera?) {
        this.id = id;
        this.nombre = nombre;
        this.historia = historia;
        this.videoId = video;

        bandera == undefined ?
            (
                PeliculaService.obtenerReparto(this.id)
                .then(response => response && response.data? this.reparto = new Reparto(response.data.id, response.data.nombre, response.data.id_pelicula) : null),

                ProduccionService.obtenerProduccion(this.id)
                .then(response => response && response.data? this.pruduccion = new Produccion(response.data.id, response.data.nombre, response.data.id_pelicula) : null)
            ):null;

        PeliculaService.obtenerPortadas(this.id)
        .then(response => response && response.data? this.portadas = response.data.map(n => new Imagen(n.id, n.imagen)): [])
    }

    public getPortadas(): Imagen[] {
        return this.portadas;
    }

    public setPortadas(imagen: Imagen) {
        imagen.getId()?
            PortadaService.actualizarPortada(imagen)
            :
            PeliculaService.agregarPortada(this.id, imagen)
            .then(response => response? this.portadas.push(new Imagen(response.data.id, response.data.imagen)): null);
    }

    public deletePortada(imagen: Imagen) {
        PortadaService.eleiminarPortada(imagen.getId())
        .then(response=> response? this.portadas.splice(this.portadas.indexOf(imagen), 1) : null);
    }

    public getReparto(): Reparto {
        return this.reparto;
    }

    public getProduccion(): Produccion {
        return this.pruduccion;
    }

    public actualizar(): void {
        PeliculaService.actualizarPelicula(this);
    }

	public getId(): number {
		return this.id;
	}
 
	public getNombre(): string {
		return this.nombre;
	}

	public getHistoria(): string {
		return this.historia;
	}


	public getVideo(): string {
		return this.videoId;
    }
    

	public setId(value: number) {
		this.id = value;
	}


	public setNombre(value: string) {
		this.nombre = value;
	}


	public setHistoria(value: string) {
		this.historia = value;
	}

 
	public setVideo(value: string) {
		this.videoId = value;
	}
}