
import { CryptoBase } from './CryptoBase.js';

export class Crypto extends CryptoBase {
    constructor(id, nombre, simbolo, fechaCreacion, precioActual, tipoConsenso, algoritmo) {
        super(id, nombre, simbolo, fechaCreacion, precioActual);
        this.tipoConsenso = tipoConsenso;
        this.algoritmo = algoritmo;
    }
}
