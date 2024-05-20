// main.js
import { CryptoBase } from './CryptoBase.js';
import { Crypto } from './Crypto.js';

document.addEventListener('DOMContentLoaded', () => 
{
    const form = document.getElementById('miFormulario');
    const tablaCryptos = document.querySelector('#tabla-cryptos tbody');
    const spinner = document.getElementById('spinner');
    let editando = false;
    let criptoEditando = null;

    form.addEventListener('submit', (event) => 
    {
        event.preventDefault();
        mostrarSpinner();

        setTimeout(() => 
        {
            const nombre = form.nombre.value;
            const simbolo = form.simbolo.value;
            const fechaCreacion = form.fechaCreacion.value;
            const precioActual = form.precioActual.value;
            const tipoConsenso = form.tipoConsenso.value;
            const algoritmo = form.algoritmo.value;

            const id = editando ? criptoEditando.id : Date.now().toString();
            const crypto = new Crypto(id, nombre, simbolo, fechaCreacion, precioActual, tipoConsenso, algoritmo);

            if (editando) 
            {
                actualizarCripto(crypto);
            } else {
                agregarCripto(crypto);
            }

            form.reset();
            editando = false;
            criptoEditando = null;
            ocultarSpinner();
        }, 2500);
    });

    document.getElementById('cancelar').addEventListener('click', () => 
    {
        form.reset();
        editando = false;
        criptoEditando = null;
    });

    function agregarCripto(crypto) 
    {
        const fila = document.createElement('tr');
        fila.dataset.id = crypto.id;
        fila.innerHTML = `
            <td>${crypto.nombre}</td>
            <td>${crypto.simbolo}</td>
            <td>${crypto.fechaCreacion}</td>
            <td>${crypto.precioActual}</td>
            <td>${crypto.tipoConsenso}</td>
            <td>${crypto.algoritmo}</td>
            <td>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </td>
        `;

        tablaCryptos.appendChild(fila);
        guardarCriptoLocalStorage(crypto);
    }

    function actualizarCripto(crypto) 
    {
        const fila = document.querySelector(`tr[data-id="${crypto.id}"]`);
        fila.cells[0].innerText = crypto.nombre;
        fila.cells[1].innerText = crypto.simbolo;
        fila.cells[2].innerText = crypto.fechaCreacion;
        fila.cells[3].innerText = crypto.precioActual;
        fila.cells[4].innerText = crypto.tipoConsenso;
        fila.cells[5].innerText = crypto.algoritmo;
        actualizarCriptoLocalStorage(crypto);
    }

    tablaCryptos.addEventListener('click', (event) => 
    {
        if (event.target.classList.contains('eliminar')) 
        {
            const fila = event.target.closest('tr');
            eliminarCriptoLocalStorage(fila.dataset.id);
            tablaCryptos.removeChild(fila);
        } else if (event.target.classList.contains('editar')) {
            const fila = event.target.closest('tr');
            form.nombre.value = fila.cells[0].innerText;
            form.simbolo.value = fila.cells[1].innerText;
            form.fechaCreacion.value = fila.cells[2].innerText;
            form.precioActual.value = fila.cells[3].innerText;
            form.tipoConsenso.value = fila.cells[4].innerText;
            form.algoritmo.value = fila.cells[5].innerText;

            editando = true;
            criptoEditando = { ...JSON.parse(localStorage.getItem(fila.dataset.id)) };
        }
    });

    function mostrarSpinner() 
    {
        spinner.style.display = 'block';
    }

    function ocultarSpinner() 
    {
        spinner.style.display = 'none';
    }

    function guardarCriptoLocalStorage(crypto) 
    {
        localStorage.setItem(crypto.id, JSON.stringify(crypto));
    }

    function actualizarCriptoLocalStorage(crypto) 
    {
        localStorage.setItem(crypto.id, JSON.stringify(crypto));
    }

    function eliminarCriptoLocalStorage(id) 
    {
        localStorage.removeItem(id);
    }

    function cargarCryptosDesdeLocalStorage() 
    {
        for (let i = 0; i < localStorage.length; i++) 
        {
            
            const key = localStorage.key(i);            
            const crypto = JSON.parse(localStorage.getItem(key));
            
            agregarCripto(crypto);
        }
    }

    cargarCryptosDesdeLocalStorage();
});
