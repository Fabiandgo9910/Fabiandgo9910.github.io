const contenedor = document.getElementById('render');
function eliminar(id) {
    var myModal = new bootstrap.Modal(document.getElementById('confirmModal'));

    // Abrir el modal
    myModal.show();
    document.querySelector('#confirmModal .btn-secondary').addEventListener('click', function () {  // Aquí puedes realizar acciones relacionadas con la opción "Cancelar"
    });

    // Capturar el clic en el botón "Confirmar"
    document.querySelector('#confirmModal .btn-primary').addEventListener('click', function () {
        fetch('http://localhost:3001/api/imagen', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            })
            .catch(error => {
                console.error('Error:', error); // Manejar errores
            });
    });
}

fetch('http://localhost:3001/api/imagenes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(response => response.json())
    .then(data => {
        data.Imagen.forEach((elemento) => {
            const div = document.createElement('div');
            div.className = `col-lg-3 col-md-6 portfolio-item filter-${elemento.tipo}`;
            div.innerHTML = `
    <div class="portfolio-wrap">
    <div class="image-container" style="width: 100%; height: 200px;">
        <img src="data:image/png;base64,${elemento.file}" class="img-fluid" style="width: 100%; height: 100%;" alt="">
    </div>
    <div class="portfolio-links style="background: #e02c0cc4">
        <a  onclick="eliminar('${elemento._id}')" data-gallery="portfolioGallery" style="background: #e02c0cc4" class="portfolio-lightbox w-100"><i class="bx bx-trash"></i></a>
    </div>
    </div>
`;
            contenedor.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Error:', error); // Manejar errores
    });
