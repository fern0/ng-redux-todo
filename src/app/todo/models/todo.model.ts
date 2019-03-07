export class Todo {
    id: number;
    texto: string;
    completado: boolean;

    constructor(texto: string) {
        this.texto = texto.charAt(0).toUpperCase() + texto.slice(1); //primera letra en mayuscula
        this.completado = false;
        this.id = Math.random(); //simulate id field from database for now
    }
}
