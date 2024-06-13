const descripcionInput = document.getElementById('descripcion');
const tipoSelect = document.getElementById('tipo');
const fileInput = document.getElementById('exampleInputFile');
const botonSubir = document.querySelector('button');

// Función para verificar si todos los campos están llenos
function verificarCamposLlenos() {
    return descripcionInput.value && tipoSelect.value && fileInput.files.length > 0;
}

// Función para habilitar o deshabilitar el botón en función del estado de los campos
function actualizarEstadoBoton() {
    botonSubir.disabled = !verificarCamposLlenos();
}

// Agregar event listeners para los cambios en los campos
descripcionInput.addEventListener('input', actualizarEstadoBoton);
tipoSelect.addEventListener('change', actualizarEstadoBoton);
fileInput.addEventListener('change', actualizarEstadoBoton);


function mostrarVistaPrevia(event) {
    var input = event.target;
    var vistaPrevia = document.getElementById('imagenVistaPrevia');
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function () {
        vistaPrevia.src = reader.result;
    }

    reader.readAsDataURL(file);
}
function add() {
    var input = document.getElementById('exampleInputFile');
    var file = input.files[0];
    var reader = new FileReader();
    var descripcion = document.getElementById('descripcion').value
    var tipo = document.getElementById('tipo').value
    reader.readAsDataURL(file);
    reader.onload = function () {
        var base64String = reader.result.split(',')[1]; // Obtener la parte de base 64 de la cadena resultante
        fetch('http://localhost:3001/api/imagen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ file: base64String, tipo, descripcion })
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 1) {
                    window.location.href = 'admin.html';
                }
            })
            .catch(error => {
                console.error('Error:', error); // Manejar errores
            });
    }
}

