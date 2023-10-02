class OrdenDeCompraLinea {
  constructor(descripcion, importe, cantidad) {
    this.descripcion = descripcion;
    this.importe = importe;
    this.cantidad = cantidad;
    this.total = this.importe * this.cantidad;
  }

  toString = () => {
    return `${this.descripcion}, ${this.importe} x ${this.cantidad} Total: ${this.total}`;
  };
}

