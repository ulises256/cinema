
export class Imagen {
    private id: number;
    public imagen: any;

	constructor($id: number, $imagen: any) {
		this.id = $id;
		this.imagen = $imagen;
	}

	public getId(): number {
		return this.id;
	}

	public getImagen(): any {
		return this.imagen;
	}

	public setId(value: number) {
		this.id = value;
	}

	public setImagen(value: any) {
		this.imagen = value;
	}

}