class OrdenDeCompra {
    constructor(proveedor, numero, tipo, fecha) {
      this.proveedor = proveedor;
      this.numero = numero;
      this.tipo = tipo;
      this.fecha = fecha;
      this.fechaRegistro = new Date().toLocaleDateString();
      this.lineasDeOrden = [];
    }

    // Método para agregar una línea de orden a la orden de compra
    agregarLineaOC(descripcion, importe, cantidad) {
        const nuevaLineaDeOrden = new OrdenDeCompraLinea(descripcion, importe, cantidad);
        this.lineasDeOrden.push(nuevaLineaDeOrden);
    }

    calcularTotalOC() {
        let total = 0;
        for (const lineaDeOrden of this.lineasDeOrden) {
            total += lineaDeOrden.total;
        }
        return total;
    }
  
    toString = () => {
        return `${this.fecha} - ${this.proveedor.nombre}, ${this.tipo} (${this.numero})`;
    };
}
