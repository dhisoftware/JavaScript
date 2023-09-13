
function calcularTotal(cantidad, precio) {
    if (isNaN(cantidad) || isNaN(precio)) {
        alert("Los parámetros cantidad y precio deben ser números válidos.");
        return NaN;
    } else {
        return cantidad * precio;
    }
}

let respuestaUsuario = prompt("¿Quieres realizar una Orden de Compra? Ingrese Si o No"); 
let numeroOrdenCompra = 1;
while (respuestaUsuario.trim().toUpperCase() === "SI") {
    const PROVEEDOR = prompt("Ingrese el proveedor");
    if (PROVEEDOR.trim() === "") {
        alert("Debe ingresar un proveedor válido.");
    } else {
        console.log("--> Nueva Orden de Compra N° (" + numeroOrdenCompra + ") para " + PROVEEDOR);
        let TotalOC = 0;
        const TIPO_OC = prompt("Indique el tipo de Orden de Compra, Ingrese Servicios (S) o Materiales (M)");
        switch (TIPO_OC.trim().toUpperCase()) {
            case "S":
                do {
                    const SERVICIO = prompt("Ingrese una descripción del Servicio");
                    if (SERVICIO.trim() === "") {
                        alert("Debe ingresar una descripción del Servicio.");
                    } else {
                        const IMPORTE = parseFloat(prompt("Ingrese importe del Servicio"));
                        if (isNaN(IMPORTE)) {
                            alert("El importe ingresado no es válido.");
                        } else {
                            console.log("- " + SERVICIO + " $" + IMPORTE);
                            TotalOC += IMPORTE;
                            let respuestaItem = prompt("¿Desea agregar más Servicios? Ingrese Si o No");
                            if (respuestaItem.trim().toUpperCase() !== "SI") {
                                break;
                            }
                        }
                    }
                } while (true);
                console.log("- Total Orden de Compra: $ " + TotalOC);
                break;
            case "M":
              
                do {
                    const MATERIAL = prompt("Ingrese una descripción del Material");
                    if (MATERIAL.trim() === "") {
                        alert("Debe ingresar una descripción del Material.");
                    } else {
                        const IMPORTE = parseFloat(prompt("Ingrese precio unitario"));
                        const CANTIDAD = parseFloat(prompt("Ingrese cantidad"));
                        if (isNaN(IMPORTE) || isNaN(CANTIDAD)) {
                            alert("Los valores ingresados para Precio y Cantidad no son validos.");
                        } else {
                            const TOTAL_ITEM = calcularTotal(CANTIDAD, IMPORTE);
                            console.log("- " + MATERIAL + " $" + IMPORTE + " x " + CANTIDAD + " - $" + TOTAL_ITEM);
                            TotalOC += TOTAL_ITEM;
                            let respuestaItem = prompt("¿Desea agregar más Materiales? Ingrese Si o No");
                            if (respuestaItem.trim().toUpperCase() !== "SI") {
                                break;
                            }
                        }
                    }
                } while (true);
                console.log("- Total Orden de Compra: $ " + TotalOC);
                break;
            default:
                alert("Debe ingresar un tipo válido de Orden de Compra (S=Servicios, M=Materiales)");
                break;
        }
        numeroOrdenCompra++; // Incrementa el número de orden de compra
    }
    respuestaUsuario = prompt("¿Quieres realizar otra Orden de Compra? Ingrese Si o No");
}