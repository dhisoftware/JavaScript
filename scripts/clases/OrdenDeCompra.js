class OrdenDeCompra {
    constructor(numero, proveedor, tipo, fecha) {
      this.numero = numero;
      this.proveedor = proveedor;
      this.tipo = tipo;
      this.fecha = fecha;
      this.fechaRegistro = new Date().toLocaleDateString();
      this.lineasDeOrden = [];
    }

    calcularTotalOC() {
        console.log(this.lineasDeOrden)

        let total = 0;
        for (const lineaDeOrden of this.lineasDeOrden) {
            total += lineaDeOrden.total;
            console.log('Totale ' + lineaDeOrden.total)
        }
        return total;
    }
  
    toString = () => {
        return `${this.fecha} - ${this.proveedor.nombre}, ${this.tipo} (${this.numero})`;
    };
}
