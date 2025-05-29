/* ===================================
   1. VARIABLES Y TIPOS DE DATOS
=================================== */
console.log("==== 1. VARIABLES Y TIPOS DE DATOS ====");

// Declaración de variables
var variableVar = "Soy var (obsoleto)";
let variableLet = "Soy let (recomendado)";
const variableConst = "Soy const (constante)";

// Tipos primitivos
const texto = "Hola Mundo"; // String
const numeroEntero = 42; // Number
const numeroDecimal = 3.14; // Number
const booleano = true; // Boolean
const nulo = null; // Null
const indefinido = undefined; // Undefined
const simbolo = Symbol('id'); // Symbol

console.log(variableLet, texto, numeroEntero, booleano);

/* ===================================
   2. OPERADORES Y EXPRESIONES
=================================== */
console.log("\n==== 2. OPERADORES Y EXPRESIONES ====");

// Operadores aritméticos
let suma = 5 + 3;       // 8
let resta = 10 - 2;     // 8
let multiplicacion = 4 * 2; // 8
let division = 16 / 2;  // 8
let modulo = 10 % 2;    // 0

// Operadores de comparación
const igualdad = 5 == '5';   // true (solo valor)
const igualdadEstricta = 5 === '5'; // false (valor y tipo)
const desigualdad = 5 != '5'; // false
const mayorQue = 10 > 5;     // true

// Operadores lógicos
const andLogico = (5 > 3) && (2 < 4); // true
const orLogico = (5 < 3) || (2 < 4);  // true
const notLogico = !(5 > 3);           // false

// Precedencia
const resultado = 5 + 3 * 2; // 11 (multiplicación primero)
const conParentesis = (5 + 3) * 2; // 16

console.log("Igualdad Estricta (5 === '5'):", igualdadEstricta);
console.log("And Lógico (true && true):", andLogico);
console.log("Resultado (5 + 3 * 2):", resultado);

/* ===================================
   3. ESTRUCTURAS DE CONTROL DE FLUJO
=================================== */
console.log("\n==== 3. ESTRUCTURAS DE CONTROL DE FLUJO ====");

// If-else
const edad = 18;
if (edad >= 18) {
    console.log("Mayor de edad");
} else {
    console.log("Menor de edad");
}

// Switch
const dia = "Lunes";
switch (dia) {
    case "Lunes":
        console.log("Inicio de semana");
        break;
    case "Viernes":
        console.log("¡Fin de semana!");
        break;
    default:
        console.log("Día normal");
}

// For
for (let i = 0; i < 5; i++) {
    console.log(`Iteración ${i}`);
}

// While
let contador = 0;
while (contador < 3) {
    console.log("Contador:", contador);
    contador++;
}

// Do-While
let j = 0;
do {
    console.log("Do-While:", j);
    j++;
} while (j < 3);

/* ===================================
   4. FUNCIONES
=================================== */
console.log("\n==== 4. FUNCIONES ====");

// Declaración de función
function sumar(a, b) {
    return a + b;
}

// Expresión de función
const multiplicar = function(a, b) {
    return a * b;
};

// Arrow function (ES6)
const dividir = (a, b) => a / b;

// Parámetros y retorno
const resultadoSuma = sumar(5, 3);
const resultadoMulti = multiplicar(4, 2);
const resultadoDivision = dividir(10, 2);

console.log("Suma (5+3):", resultadoSuma);
console.log("Multiplicación (4*2):", resultadoMulti);
console.log("División (10/2):", resultadoDivision);

/* ===================================
   5. ARRAYS Y MÉTODOS DE ARRAY
=================================== */
console.log("\n==== 5. ARRAYS Y MÉTODOS DE ARRAY ====");

// Creación de arrays
const frutas = ["Manzana", "Banana"];
const numeros = [1, 2, 3, 4, 5];

// Manipulación
frutas.push("Naranja"); // Añadir al final
frutas.pop();           // Eliminar último elemento (quita "Naranja")
frutas[0] = "Pera";     // Modificar elemento

// Métodos principales
const longitud = frutas.length;
const mapeado = numeros.map(num => num * 2);
const filtrado = numeros.filter(num => num > 3);
const reducido = numeros.reduce((acc, num) => acc + num, 0);

console.log("Array frutas:", frutas);
console.log("Array mapeado (x2):", mapeado);  // [2, 4, 6, 8, 10]
console.log("Array filtrado (>3):", filtrado); // [4, 5]
console.log("Array reducido (suma):", reducido); // 15

/* ===================================
   6. OBJETOS Y JSON
=================================== */
console.log("\n==== 6. OBJETOS Y JSON ====");

// Creación de objeto
const persona = {
    nombre: "Ana",
    edad: 30,
    direccion: {
        calle: "Calle Principal",
        numero: 123
    },
    saludar: function() {
        return `Hola, soy ${this.nombre}`;
    }
};

// Acceso a propiedades
console.log("Nombre persona:", persona.nombre);        // Ana
console.log("Edad persona:", persona["edad"]);         // 30
console.log("Saludo persona:", persona.saludar());     // Hola, soy Ana

// JSON
const jsonPersona = JSON.stringify(persona);
console.log("JSON stringify:", jsonPersona);

const objetoDesdeJson = JSON.parse('{"nombre":"Carlos","edad":25}');
console.log("Objeto parseado:", objetoDesdeJson);
console.log("Nombre parseado:", objetoDesdeJson.nombre); // Carlos

/* ===================================
   7. DOM Y EVENTOS
=================================== */
console.log("\n==== 7. DOM Y EVENTOS ====");

// Selección de elementos
const boton = document.getElementById('miBoton');
const contenedor = document.getElementById('miContenedor');

// Manipulación (si existen los elementos)
if (boton && contenedor) {
    contenedor.textContent = "Texto cambiado desde JS";
    contenedor.style.color = "blue";

    // Eventos
    boton.addEventListener('click', () => {
        contenedor.innerHTML = "<strong>¡Botón clickeado!</strong>";
        contenedor.style.backgroundColor = "#f0f0f0";
    });
}

/* ===================================
   8. ASINCRONÍA BÁSICA
=================================== */
console.log("\n==== 8. ASINCRONÍA BÁSICA ====");

// Callbacks
function operacionAsincrona(callback) {
    setTimeout(() => {
        callback("Datos completados (callback)");
    }, 1000);
}

operacionAsincrona((mensaje) => {
    console.log(mensaje);
});

// Promesas
const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = true;
        if (exito) {
            resolve("¡Promesa resuelta!");
        } else {
            reject("Error en promesa");
        }
    }, 1500);
});

miPromesa
    .then(resultado => console.log(resultado))
    .catch(error => console.error(error));