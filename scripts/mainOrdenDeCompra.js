
// Obtener una referencia al botón "Guardar" en el modal de agregar
const saveProviderButton = document.getElementById('btnGuardarOC');

// Agregar un evento de clic al botón "Guardar"
saveProviderButton.addEventListener('click', function () {
    // Obtener los valores ingresados por el usuario desde los campos del modal
    const fecha = document.getElementById('ctrlfechaAdd').value;
    const proveedorNro = document.getElementById('cboxProveedorAdd').value;
    const tipo = document.getElementById('cboxTipoAdd').value;
    let ultimoNumeroOC = JSON.parse(localStorage.getItem('ultimoNumeroOC')) || 0;
    ultimoNumeroOC++;

    const proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    const proveedor = proveedores.find(proveedor => proveedor.numero === proveedorNro);

    agregarOrdenDeCompra(ultimoNumeroOC, proveedor, tipo, fecha);

    // Guardar el ultimo numero en el localStorage
    localStorage.setItem('ultimoNumeroOC', JSON.stringify(ultimoNumeroOC));

    actualizarTabla('ordenesDeCompra');
    LineasOrdenDeCompra = [];

    // Cerrar el modal después de agregar 
    $('#ModalAddOC').modal('hide');
});

// Función para agregar un nueva OC
function agregarOrdenDeCompra(numero, proveedor, tipo, fecha) {

    // Obtener la lista de OC existente desde el almacenamiento local (localStorage)
    let ordenesDeCompra = JSON.parse(localStorage.getItem('ordenesDeCompra')) || [];

    const nuevaOC = new OrdenDeCompra(numero, proveedor, tipo, fecha);

    for (const linea of LineasOrdenDeCompra) {
        nuevaOC.lineasDeOrden.push(linea);
        
    }

    ordenesDeCompra.push(nuevaOC);

    console.log(ordenesDeCompra);

    // Almacenar la lista actualizada en el almacenamiento local
    localStorage.setItem('ordenesDeCompra', JSON.stringify(ordenesDeCompra));
}

// Obtener una referencia al botón "Guardar" en el modal de agregar
const BotonAgregarLineaOC = document.getElementById('btnAgregarLineaOC');
let LineasOrdenDeCompra = [];

// Agregar un evento de clic al botón "Guardar"
BotonAgregarLineaOC.addEventListener('click', function () {
    // Obtener los valores ingresados por el usuario desde los campos del modal
    const descripcion = document.getElementById('txtDescripcionLin').value;
    const importe = parseFloat(document.getElementById('txtImporteLin').value);
    const cantidad = parseInt(document.getElementById('txtCantidadLin').value);

    const NuevaLinea = new OrdenDeCompraLinea(descripcion, importe, cantidad);

    LineasOrdenDeCompra.push(NuevaLinea);

    actualizarInterfazDeUsuario();
    
});

function actualizarInterfazDeUsuario() {
    // Obtén la tabla y el cuerpo de la tabla
    const tabla = document.getElementById('lineasOCTable');
    const tbody = tabla.querySelector('tbody');

    // Limpia el cuerpo de la tabla
    tbody.innerHTML = '';

    // Itera a través de las líneas de compra y agrégalas a la tabla
    for (const linea of LineasOrdenDeCompra) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${linea.descripcion}</td>
            <td>${linea.importe}</td>
            <td>${linea.cantidad}</td>
            <td>${linea.total}</td>
        `;
        tbody.appendChild(row);
    }
}

// Función para eliminar OC por su ID
function eliminarOrdenDeCompra(numero) {
    // Obtener la lista de OC existente desde el almacenamiento local
    let ordenesDeCompra = JSON.parse(localStorage.getItem('ordenesDeCompra')) || [];
    // Filtrar la lista para excluir la OC con el ID especificado
    numero = parseInt(numero);

    ordenesDeCompra = ordenesDeCompra.filter(oc => oc.numero !== numero);
    // Almacenar la lista actualizada en el almacenamiento local
    localStorage.setItem('ordenesDeCompra', JSON.stringify(ordenesDeCompra));
}

// Función para obtener todas las OC
function obtenerOrdenesDeCompra() {
    const ordenesDeCompra = JSON.parse(localStorage.getItem('ordenesDeCompra')) || [];
    return ordenesDeCompra.map(data => {
        const ordenDeCompra = new OrdenDeCompra(data.numero, data.proveedor, data.tipo, data.fecha);
        
        // Agregar las líneas de orden a la instancia
        data.lineasDeOrden.forEach(linea => {
            ordenDeCompra.lineasDeOrden.push(linea);
        });

        return ordenDeCompra;
    }); 
}

function actualizarTabla() {
    const ordenesDeCompra = obtenerOrdenesDeCompra();
    console.log(ordenesDeCompra);     
    const tbody = document.querySelector('table tbody');

    // Limpiar la tabla
    tbody.innerHTML = '';

    // Iterar sobre las OC y agregar filas a la tabla
    ordenesDeCompra.forEach(ordenDeCompra => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ordenDeCompra.numero}</td>
            <td>${ordenDeCompra.tipo}</td>
            <td>${ordenDeCompra.fecha}</td>
            <td>${ordenDeCompra.proveedor.nombre}</td>
            <td>${ordenDeCompra.calcularTotalOC()}</td>
            <td>
                <button class="btn btn-danger eliminarOC" data-id="${ordenDeCompra.numero}"><i class="fas fa-trash"></i></button>
            </td>
        `;

        // Agregar un evento de clic al botón "Eliminar"
        const eliminarButton = row.querySelector('.eliminarOC');
        eliminarButton.addEventListener('click', function () {
            const ocNro = this.getAttribute('data-id');
            eliminarOrdenDeCompra(ocNro);
            actualizarTabla(); // Actualizar la tabla después de eliminar 
        });

        tbody.appendChild(row);
    });


}


// Agregar un evento que se ejecute cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    actualizarTabla();
});

function cargarProveedoresEnSelect(selectId) {
    return new Promise((resolve, reject) => {
        const proveedorSelect = document.getElementById(selectId);
        proveedorSelect.innerHTML = '';
        const proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
        proveedores.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.numero;
            option.textContent = proveedor.nombre;
            proveedorSelect.appendChild(option);
        });
        resolve(); // Resolvemos la promesa una vez que se ha cargado el select
    });
}

// Función para cargar los datos de OC en el modal de edición
function cargarDatosEnModalDeEdicion(ocId) {
    const ordenDeCompra = obtenerOCPorId(ocId);
    if (ordenDeCompra) {
        // Asigna los valores del proveedor a los campos del modal de edición
        document.getElementById('editItemID').value = ordenDeCompra.numero;
        document.getElementById('cboxTipoEdit').value = ordenDeCompra.tipo;
        document.getElementById('ctrlfechaEdit').value = ordenDeCompra.fecha;
        let proveedorID = parseInt(ordenDeCompra.proveedor.numero);
        document.getElementById('cboxProveedorEdit').value = proveedorID;
        console.log(proveedorID);
    }
}

// Función para obtener OC por su ID
function obtenerOCPorId(ocId) {
    const ordenesDeCompra = obtenerOrdenesDeCompra();
    ocId = parseInt(ocId);
    return ordenesDeCompra.find(oc => oc.numero === ocId);
}


$("#ModalAddOC").on("show.bs.modal", function () {
    cargarProveedoresEnSelect('cboxProveedorAdd');

    const ctrlFechaAdd = document.getElementById('ctrlfechaAdd');
    const fechaActual = new Date().toISOString().split('T')[0];
    ctrlFechaAdd.value = fechaActual;
});



