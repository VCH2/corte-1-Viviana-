let votos = {};
let aspirantes = [];
let votantesRegistrados = new Set();
let votacionActiva = true;

document.addEventListener('DOMContentLoaded', () => {
    const aspiranteForm = document.getElementById('aspiranteForm');
    const iniciarVotacionBtn = document.getElementById('iniciarVotacion');
    const votanteForm = document.getElementById('votanteForm');

    // Registro de aspirantes
    aspiranteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreAspirante').value;
        const propuesta = document.getElementById('propuestaAspirante').value;
        const fotoInput = document.getElementById('fotoAspirante');
        const foto = fotoInput.files[0];

        if (nombre && propuesta && foto) {
            const reader = new FileReader();
            reader.onload = (e) => {
                aspirantes.push({
                    nombre,
                    propuesta,
                    foto: e.target.result
                });
                agregarCandidatoAVotacion(aspirantes[aspirantes.length - 1]);
                aspiranteForm.reset();
            };
            reader.readAsDataURL(foto);
        }
    });

    // Iniciar votación
    iniciarVotacionBtn.addEventListener('click', () => {
        document.getElementById('registro-aspirantes').style.display = 'none';
        document.getElementById('votacion').style.display = 'block';
        document.getElementById('finalizarVotacion').style.display = 'block';
    });

    // Finalizar votación
    document.getElementById('finalizarVotacion').addEventListener('click', () => {
        votacionActiva = false;
        mostrarGanadorFinal();
        document.getElementById('votacion').style.display = 'none';
        document.getElementById('resultadoFinal').style.display = 'block';
    });

    // Procesar votos
    votanteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!votacionActiva) {
            alert('La votación ha finalizado');
            return;
        }

        const codigo = document.getElementById('codigoEstudiantil').value;
        if (!/^\d{6}$/.test(codigo)) {
            alert('Código estudiantil inválido');
            return;
        }
        
        if (votantesRegistrados.has(codigo)) {
            alert('Ya has votado');
            return;
        }

        const seleccionado = document.querySelector('input[name="candidato"]:checked');
        if (!seleccionado) {
            alert('Selecciona un candidato');
            return;
        }

        votantesRegistrados.add(codigo);
        const candidato = seleccionado.value;
        votos[candidato] = (votos[candidato] || 0) + 1;
        actualizarResultados();
        votanteForm.reset();
    });
});

function agregarCandidatoAVotacion(aspirante) {
    const container = document.getElementById('candidatosContainer');
    const div = document.createElement('div');
    div.className = 'candidato';
    div.innerHTML = `
        <label>
            <input type="radio" name="candidato" value="${aspirante.nombre}" required>
            <img src="${aspirante.foto}" alt="${aspirante.nombre}">
            <div>
                <h4>${aspirante.nombre}</h4>
                <p>${aspirante.propuesta}</p>
            </div>
        </label>
    `;
    container.appendChild(div);
}

function actualizarResultados() {
    const listaResultados = document.getElementById('listaResultados');
    const ganadorTexto = document.getElementById('probableGanador');
    
    listaResultados.innerHTML = '';
    const resultados = Object.entries(votos).sort((a, b) => b[1] - a[1]);

    resultados.forEach(([nombre, cantidad]) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${nombre}</span>
            <span>${cantidad}</span>
        `;
        listaResultados.appendChild(li);
    });

    if (resultados.length > 0 && resultados[0][1] > 0) {
        ganadorTexto.textContent = `Hasta ahora, ${resultados[0][0]} tiene más probabilidades de ganar con ${resultados[0][1]} voto(s).`;
    } else {
        ganadorTexto.textContent = "Aún no hay votos registrados.";
    }
}

function mostrarGanadorFinal() {
    const resultados = Object.entries(votos).sort((a, b) => b[1] - a[1]);
    const ganador = resultados.length > 0 ? resultados[0] : null;
    const container = document.getElementById('ganadorContainer');
    
    if (ganador) {
        const aspiranteGanador = aspirantes.find(a => a.nombre === ganador[0]);
        container.innerHTML = `
            <img src="${aspiranteGanador.foto}" alt="${aspiranteGanador.nombre}">
            <h3 class="ganador-titulo">¡${aspiranteGanador.nombre} es el ganador!</h3>
            <p class="ganador-votos">Con ${ganador[1]} votos</p>
            <p><strong>Propuesta:</strong> ${aspiranteGanador.propuesta}</p>
        `;
    } else {
        container.innerHTML = `<h3 class="ganador-titulo">No se registraron votos</h3>`;
    }
}
