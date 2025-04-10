document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcular-btn');
    calcularBtn.addEventListener('click', calcular);
});

function calcular() {
    // Obtener valores de los inputs
    const nota1 = parseFloat(document.getElementById('primer-corte').value);
    const nota2 = parseFloat(document.getElementById('segundo-corte').value);
    
    // Validar entradas
    if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5) {
        mostrarResultado('Por favor ingresa notas válidas (entre 0.0 y 5.0)', 'error');
        return;
    }

    // Calcular nota necesaria
    const porcentajeActual = (nota1 * 0.3) + (nota2 * 0.3);
    const porcentajeFaltante = 3.0 - porcentajeActual;
    const notaNecesaria = porcentajeFaltante / 0.4;

    // Determinar si es posible
    if (notaNecesaria > 5.0) {
        mostrarResultado('¡No es posible alcanzar 3.0! 😢<br>Nota máxima posible: ' + ((porcentajeActual + (5 * 0.4)).toFixed(2)), 'error');
    } else if (notaNecesaria < 0) {
        mostrarResultado('¡Ya tienes el 3.0 asegurado! 🎉', 'exito');
    } else {
        mostrarResultado(`Necesitas sacar mínimo: <strong>${notaNecesaria.toFixed(2)}</strong><br>en el examen final (40%)`, 'exito');
    }
}

function mostrarResultado(mensaje, tipo) {
    const resultado = document.getElementById('resultado');
    resultado.className = `resultado ${tipo}`;
    resultado.innerHTML = mensaje;
}