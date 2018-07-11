
export class Noticia {
    private id: number;
    private titulo: string;
    private descripcion: string;
	private status: string;
	private fecha: Date

    constructor($id: number, $titulo: string, $descripcion: string, $status: string, $fecha?: Date) {
        this.id = $id;
        this.titulo= $titulo;
        this.descripcion = $descripcion;
		this.status = $status;
		this.fecha = $fecha;
    }

	public getId(): number {
		return this.id;
	}

	public getTitulo(): string {
		return this.titulo;
	}


	public getDescripcion(): string {
		return this.descripcion;
	}

	public getStatus(): string {
		return this.status;
	}

	public getFecha(): Date {
		return this.fecha;
	}

	public setId(value: number) {
		this.id = value;
	}

	public setTitulo(value: string) {
		this.titulo = value;
	}

	public setDescripcion(value: string) {
		this.descripcion = value;
	}

	public setStatus(value: string) {
		this.status = value;
	}

	public setFecha(value: Date) {
		this.fecha = value;
	}

}