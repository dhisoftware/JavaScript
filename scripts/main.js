const ordenesDeCompra = [];
let numeroOrdenCompra = 1;

function seleccionarProveedor(proveedores) {
    console.log("Proveedores disponibles:");
    for (let i = 0; i < proveedores.length; i++) {
        console.log(`${i + 1}. ${proveedores[i].nombre}`);
    }

    const seleccion = prompt("Por favor, elija un proveedor ingresando su número:");
    const idSeleccionado = parseInt(seleccion);

    const proveedorElegido = proveedores.find((proveedor) => proveedor.numero === idSeleccionado);

    if (!proveedorElegido) {
        alert("Proveedor no encontrado. Por favor, ingrese un número válido.");
        return null;
    }

    return proveedorElegido;
}

const crearOrdenes = () => {

    let respuestaUsuario = prompt("¿Quieres realizar una Orden de Compra? Ingrese Si o No");
    while (respuestaUsuario.trim().toUpperCase() === "SI") {

        const PROVEEDOR = seleccionarProveedor(proveedoresMock);

        if (!PROVEEDOR) {
            console.log("No se ha seleccionado ningún proveedor.");
        } else {
            const TIPO_OC = prompt("Indique el tipo de Orden de Compra, Ingrese Servicios (S) o Materiales (M)");

            const nuevaOrdenDeCompra = new OrdenDeCompra(PROVEEDOR, numeroOrdenCompra, TIPO_OC, new Date());
            console.log("--> Nueva Orden de Compra N° (" + nuevaOrdenDeCompra.numero + ") para " + nuevaOrdenDeCompra.proveedor.nombre);

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
                                nuevaOrdenDeCompra.agregarLineaOC(SERVICIO, IMPORTE, 1);

                                let respuestaItem = prompt("¿Desea agregar más Servicios? Ingrese Si o No");
                                if (respuestaItem.trim().toUpperCase() !== "SI") {
                                    break;
                                }
                            }
                        }
                    } while (true);

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
                                alert("Los valores ingresados para Precio y Cantidad no son válidos.");
                            } else {
                                nuevaOrdenDeCompra.agregarLineaOC(MATERIAL, IMPORTE, CANTIDAD);

                                let respuestaItem = prompt("¿Desea agregar más Materiales? Ingrese Si o No");
                                if (respuestaItem.trim().toUpperCase() !== "SI") {
                                    break;
                                }
                            }
                        }
                    } while (true);

                    break;
                default:
                    alert("Debe ingresar un tipo válido de Orden de Compra (S=Servicios, M=Materiales)");
                    break;
            }

            const totalOrdenCompra = nuevaOrdenDeCompra.calcularTotalOC();
            console.log("- Total Orden de Compra: $ " + totalOrdenCompra);

            let total = 0;
            for (const lineaDeOrden of nuevaOrdenDeCompra.lineasDeOrden) {
                console.log(lineaDeOrden.toString());
                total += lineaDeOrden.total;
            }
            console.log("$ Total OC " + total);

            ordenesDeCompra.push(nuevaOrdenDeCompra); // Agregar la orden de compra al array
            numeroOrdenCompra++; // Incrementa el número de orden de compra
        }
        respuestaUsuario = prompt("¿Quieres realizar otra Orden de Compra? Ingrese Si o No");
    }
}

function listarTodasLasOrdenes() {
    console.log("Órdenes de Compra realizadas:");
    for (const orden of ordenesDeCompra) {
        console.log(orden.toString());
    }
}
function listarOrdenesPorTipo() {
    const tipo = prompt("Ingrese el tipo de orden (S para Servicios, M para Materiales):");
    const ordenesFiltradas = ordenesDeCompra.filter((orden) => orden.tipo.toUpperCase() === tipo.toUpperCase());
    console.log(`Órdenes de Compra de tipo ${tipo}:`);
    for (const orden of ordenesFiltradas) {
        console.log(orden.toString());
    }
}
function listarOrdenesPorProveedor() {
    const PROVEEDOR = seleccionarProveedor(proveedoresMock);
    const ordenesFiltradas = ordenesDeCompra.filter((orden) => orden.proveedor.numero === PROVEEDOR.numero);
    console.log(`Órdenes de Compra del proveedor ${PROVEEDOR.nombre}:`);
    for (const orden of ordenesFiltradas) {
        console.log(orden.toString());
    }
}

// Función principal para gestionar la aplicación
function gestionarOrdenesDeCompra() {
    console.log("SISTEMA DE ORDENES DE COMPRAS");

    while (true) {
        console.log("A continuación, elija una opción:");
        console.log("1- Ingresar Ordenes de Compra");
        console.log("2- Listar Todas las Órdenes");
        console.log("3- Listar por Tipo de Orden");
        console.log("4- Listar por Proveedor");
        console.log("5- Salir");

        const opcion = parseInt(prompt("Ingrese su opción:"));

        switch (opcion) {
            case 1:
                crearOrdenes();
                break;
            case 2:
                listarTodasLasOrdenes();
                break;
            case 3:
                listarOrdenesPorTipo();
                break;
            case 4:
                listarOrdenesPorProveedor();
                break;
            case 5:
                return; // Salir del programa
            default:
                console.log("Opción no válida.");
                break;
        }
    }
}

gestionarOrdenesDeCompra();
 

