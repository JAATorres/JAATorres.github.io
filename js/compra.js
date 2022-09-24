const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    carrito.addEventListener('click', (e)=>{compra.eliminarProductos(e)});

    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}

function procesarCompra(e) {
    // e.preventDefault();

    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos en el carrito. Selecciona alguno.',
            // footer: '<a href="">Why do I have this issue?</a>'
            timer:3000,
            showConfirmButton: false
        }).then(function(){
            window.location = "index.html";
        })
    } else if (cliente.value === '' || correo.value === ''){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos son requeridos.',
            // footer: '<a href="">Why do I have this issue?</a>'
            timer:5000,
            showConfirmButton: false,
        })
    }else {

        (function (){
            emailjs.init('MJyGwZFyPXUUXn-i6')
        })();


        var myform = $("form#procesar-pago");

        myform.submit( (event) => {
            event.preventDefault();

            // Change to your service ID, or keep using the default service
            var service_id = "default_service";
            var template_id = "template_wz46x5c";

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            emailjs.sendForm(service_id, template_id, myform[0])
                .then(() => {
                    cargandoGif.style.display = 'none';
                    document.querySelector('#loaders').appendChild(enviado);

                    setTimeout(() => {
                        compra.vaciarLocalStorage();
                        enviado.remove();
                        window.location = "index.html";
                    }, 2000);


                }, (err) => {
                    alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                    // myform.find("button").text("Send");
                });

            return false;

        });

        // const btn = document.getElementById('procesar-pago');

        // document.getElementById('form')
        // .addEventListener('submit', function(event) {
        // event.preventDefault();

        // btn.value = 'Sending...';

        // const serviceID = 'default_service';
        // const templateID = 'template_wz46x5c';

        // emailjs.sendForm(serviceID, templateID, this)
        //     .then(() => {
        //     btn.value = 'Send Email';
        //     alert('Sent!');
        //     }, (err) => {
        //     btn.value = 'Send Email';
        //     alert(JSON.stringify(err));
        //     });
        // });
    
        // const cargandoGif = document.querySelector('#cargando');
        // cargandoGif.style.display = 'block';

        // const enviado = document.createElement('img');
        // enviado.src = 'img/mail.gif';
        // enviado.style.display = 'block';
        // enviado.width = '150';

        // setTimeout(() => {
        //     cargandoGif.style.display = 'none';
        //     document.querySelector('#loaders').appendChild(enviado);
        //     setTimeout(() =>{
        //         enviado.remove();
        //         compra.vaciarLocalStorage();
        //         window.location = "index.html"
        //     }, 5000)
        // }, 5000);
    }
}