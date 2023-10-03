class OrdenDeCompraLinea {
  constructor(descripcion, importe, cantidad) {
    this.descripcion = descripcion;
    this.importe = importe;
    this.cantidad = cantidad;
    this.total = this.calcularTotalLinea(this.calcularTotalPorDefecto);
  }

  calcularTotalLinea = (calculo) => {
    return calculo(this.importe, this.cantidad);
  }

  calcularTotalPorDefecto = (importe, cantidad) => {
    return importe * cantidad;
  };

  toString = () => {
    return `${this.descripcion}, ${this.importe} x ${this.cantidad} Total: ${this.total}`;
  };
}

