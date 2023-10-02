class Proveedor {
    constructor(numero, nombre, rut, direccion) {
      this.numero = numero;
      this.nombre = nombre;
      this.rut = rut;
      this.direccion = direccion;
    }
  
    toString = () => {
      return this.Proveedor.nombre + " (" + this.numero + ")";
    };
  }
  