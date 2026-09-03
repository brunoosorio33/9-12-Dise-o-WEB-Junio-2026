/*

- Objetos (Console, window, document)
-- Metodos - console.log() 
-- Propiedades - title.text = "Hola"

*/

/*

- Keywords
-- let: crear variables
-- const: declarar constantes
-- if, else, else if: crear condicionales
-- function: declarar funciones

*/

/*

- Datos
-- String / Template String
-- Boolean
-- Number

*/

/*

- Operadores
-- +, -, *, /, %
-- ++, --, **
-- =, +=, -=, *=, /=
-- ==, ===, !=, !==, >, <, >=, <=
-- &&, ||, !

/*

Ternarios 

*/

/*

let tieneTicket = false


if (!tieneTicket) {
    console.log('No puedes entrar')
}
/*

Funcion nombrada

*/

/*
function saludar() {
    console.log('Hola')
}
saludar () 

/*

Funcion anonima

*/

/*

let miFuncion = function() {

}

miFuncion()

/*

Funcion arrow 

*/

/*

let despedir = () => { console.log('Chau') }
despedir()


/*

Funcion IIFE

*/


/* function saludar() {
    console.log('Buenos dias')
}

saludar() */

/* let miTicket = function() {

}

miTicket() */


/* let despedido = () => { console.log('Adios') }
despedido () */

/* Scope */

/*

let saberEdad = function() {
    let anoInicial = prompt('Año de nacimiento')
    let edad = 2026 - anoInicial

    if (edad < 18) {
        alert(`Tiene ${edad} años, es mayor de edad.`)
    } else {
        alert(`tiene ${edad} años. Aún es menor de edad.`)
    }

    return edad
}

console.log(edad)

*/

function dialogo(personaje, dialogo) {
    console.log(`${personaje} : cuack -- ${dialogo}`)
}

dialogo('Pato', '¿Cómo estás?')
dialogo('Pedro', 'Muy bien ¿Y tu?')

/* Document Object Model */

const miTitulo = document.getElementById('mi-titulo')

miTitulo. innerText = 'Pepe'
miTitulo.style = 'color: red;'

miTitulo.classList.remove('small')
miTitulo.classList.add('Pepito')
miTitulo.classList.toggle('texto')
miTitulo.classList.contains('texto')
console.log(miTitulo.classList)



