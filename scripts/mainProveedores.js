 
// Obtener una referencia al botón "Guardar" en el modal de agregar proveedor
const saveProviderButton = document.getElementById('btnGuardarProveedor');

// Agregar un evento de clic al botón "Guardar"
saveProviderButton.addEventListener('click', function () {
    // Obtener los valores ingresados por el usuario desde los campos del modal
    const numero = document.getElementById('txtNumeroAdd').value;
    const nombre = document.getElementById('txtNombreAdd').value;
    const rut = document.getElementById('txtRutAdd').value;
    const direccion = document.getElementById('txtDireccionAdd').value;



    // Llamar a la función agregarProveedor con los valores
    agregarProveedor(numero, nombre, rut, direccion);

    // Restablecer o limpiar los campos de entrada
    document.getElementById('txtNumeroAdd').value = '';
    document.getElementById('txtNombreAdd').value = '';
    document.getElementById('txtRutAdd').value = '';
    document.getElementById('txtDireccionAdd').value = '';

     // Actualizar la tabla después de agregar el proveedor
     actualizarTabla();

    // Cerrar el modal después de agregar el proveedor
    $('#addModal').modal('hide');
});

// Función para agregar un nuevo proveedor
function agregarProveedor(numero, nombre, rut, direccion) {
    // Obtener la lista de proveedores existente desde el almacenamiento local (localStorage)
    let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];

    // Crear una instancia de la clase Proveedor
    const nuevoProveedor = new Proveedor(numero, nombre, rut, direccion);

    // Agregar el nuevo proveedor a la lista
    proveedores.push(nuevoProveedor);

    // Almacenar la lista actualizada en el almacenamiento local
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
}

// Obtén una referencia al botón "Actualizar" en el modal de edición
const updateProviderButton = document.getElementById('btnActualizar');

// Agregar un evento de clic al botón "Actualizar"
updateProviderButton.addEventListener('click', function () {
    // Obtener los valores ingresados por el usuario desde los campos del modal de edición
    const nombre = document.getElementById('txtNombreEdit').value;
    const rut = document.getElementById('txtRutEdit').value;
    const direccion = document.getElementById('txtDireccionEdit').value;

    // Obtener el ID del proveedor que se está editando
    const proveedorId = document.getElementById('editItemID').value;

    // Llamar a la función actualizarProveedor con los valores
    actualizarProveedor(proveedorId, nombre, rut, direccion);

    // Actualizar la tabla después de editar el proveedor
    actualizarTabla();

    // Cerrar el modal después de actualizar el proveedor
    $('#ModalEditProveedor').modal('hide');
});

// Función para actualizar un proveedor existente
function actualizarProveedor(numero, nombre, rut, direccion) {
    // Obtener la lista de proveedores existente desde el almacenamiento local
    let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];

    // Buscar el proveedor por ID y actualizar sus datos
    for (let i = 0; i < proveedores.length; i++) {
        if (proveedores[i].numero === numero) {
            proveedores[i].nombre = nombre;
            proveedores[i].rut = rut;
            proveedores[i].direccion = direccion;
            break;
        }
    }

    // Almacenar la lista actualizada en el almacenamiento local
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
}

// Función para eliminar un proveedor por su ID
function eliminarProveedor(numero) {
    
    // Obtener la lista de proveedores existente desde el almacenamiento local
    let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
       // Filtrar la lista para excluir el proveedor con el ID especificado
    proveedores = proveedores.filter(proveedor => proveedor.numero !== numero);
    // Almacenar la lista actualizada en el almacenamiento local
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
}

// Función para obtener todos los proveedores
function obtenerProveedores() {
    // Obtener la lista de proveedores desde el almacenamiento local
    const proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
    return proveedores.map(data => new Proveedor(data.numero, data.nombre, data.rut, data.direccion));
}

function actualizarTabla() {
    const proveedores = obtenerProveedores();
    const tbody = document.querySelector('table tbody');

    // Limpiar la tabla
    tbody.innerHTML = '';

    // Iterar sobre los proveedores y agregar filas a la tabla
    proveedores.forEach(proveedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${proveedor.numero}</td>
            <td>${proveedor.nombre}</td>
            <td>${proveedor.rut}</td>
            <td>${proveedor.direccion}</td>
            <td>
                <button class="btn btn-info editarProveedor" data-toggle="modal" data-target="#ModalEditProveedor" data-id="${proveedor.numero}"><i class="fas fa-edit text-primary"></i></button>
                <button class="btn btn-danger eliminarProveedor" data-id="${proveedor.numero}"><i class="fas fa-trash"></i></button>
            </td>
        `;

        // Agregar un evento de clic al botón "Eliminar"
        const eliminarButton = row.querySelector('.eliminarProveedor');
        eliminarButton.addEventListener('click', function () {
            const proveedorNro = this.getAttribute('data-id');
            eliminarProveedor(proveedorNro);
            actualizarTabla(); // Actualizar la tabla después de eliminar el proveedor
        });

        // Agregar un evento de clic al botón "Editar"
        const editarButton = row.querySelector('.editarProveedor');
        editarButton.addEventListener('click', function () {
            const proveedorId = this.getAttribute('data-id');
            // Aquí puedes programar la lógica para cargar los datos del proveedor en el modal de edición
            cargarDatosEnModalDeEdicion(proveedorId);
        });


        tbody.appendChild(row);
    });

    
}
 

// Agregar un evento que se ejecute cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    // Llamar a la función actualizarTabla para cargar los datos de proveedores
    actualizarTabla();
});

// Función para cargar los datos del proveedor en el modal de edición
function cargarDatosEnModalDeEdicion(proveedorId) {
    // Obtén el proveedor por su ID y carga sus datos en el modal de edición

    const proveedor = obtenerProveedorPorId(proveedorId);
    if (proveedor) {
        // Asigna los valores del proveedor a los campos del modal de edición
        document.getElementById('editItemID').value = proveedor.numero;
        document.getElementById('txtNombreEdit').value = proveedor.nombre;
        document.getElementById('txtRutEdit').value = proveedor.rut;
        document.getElementById('txtDireccionEdit').value = proveedor.direccion;

        // Además, debes programar la lógica para guardar los cambios en el modal de edición
        // cuando el usuario haga clic en el botón "Actualizar" del modal de edición.
    }
}

// Función para obtener un proveedor por su ID
function obtenerProveedorPorId(proveedorId) {
    const proveedores = obtenerProveedores();
    return proveedores.find(proveedor => proveedor.numero === proveedorId);
}